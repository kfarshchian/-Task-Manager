const express = require('express');
const forwardHtmlRoutes = require('./htmlroutes/htmlroutes');
const app = express();

app.use('/notes', forwardHtmlRoutes);

module.exports = app;