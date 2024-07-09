const express = require("express");
const { body, validationResult } = require("express-validator");

const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};

const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required and must be a valid email address"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password should contain at least 6 characters"),
];

const signupValidator = [
    body("name").isEmpty().withMessage("Name is required"),
    ...loginValidator,
];

module.exports = {
    validate,
    loginValidator,
    signupValidator,
};
