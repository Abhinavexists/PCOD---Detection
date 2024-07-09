// Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// app.use(cors()); 
// const corsOptions = {
//     origin: 'http://localhost:5173',
//     // other options
// };
  
// app.use(cors(corsOptions));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define Routes
app.use('/api/v1', authRoutes);

// Use the PORT environment variable or default to 3000
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
