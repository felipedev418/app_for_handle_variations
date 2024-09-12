const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const indexRouter = require('./routes/index');

const app = express();

// Connect to MongoDB
connectDB();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
