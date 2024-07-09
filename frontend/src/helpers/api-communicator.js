import React from 'react';
import axios from 'axios';

export const loginUser = async (email, password) => {
    const res = await axios.post('/user/login', { email, password });
    if (res.status !== 200) {
        throw new Error('Unable to login');
    }
    const data = await res.data;
    return data;
};

export const signupUser = async (name, email, password) => {
    const res = await axios.post('/user/signup', { firstname, lastname, email, password });
    if (res.status !== 201) {
        throw new Error('Unable to Signup');
    }
    const data = await res.data;
    return data;
};

export const checkAuthStatus = async () => {
    const res = await axios.get('/user/auth-status');
    if (res.status !== 200) {
        throw new Error('Unable to authenticate');
    }
    const data = await res.data;
    return data;
};

export const logoutUser = async () => {
    const res = await axios.get('/user/logout');
    if (res.status !== 200) {
        throw new Error('Unable to logout');
    }
    const data = await res.data;
    return data;
};