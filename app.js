const express = require('express');
const helmet = require('helmet');
const { xss } = require('express-xss-sanitizer');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '150mb' }));
// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());

require('./src/routes/mainRoutes')(app);

module.exports = app;
