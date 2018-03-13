'use strict';

// Module dependencies
 const path = require('path');
 const config = require("./src/config/config");
 const express = require('express');


 const app = express();

 app.disable('x-powered-by');

 app.listen(config.web.port, () => {
   console.log("Server running on port: ", config.web.port);
 });

 process.on("uncaughtException", err => {
   console.error(err.stack);
 });

 module.exports = app;