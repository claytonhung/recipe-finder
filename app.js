'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const handler = require('./routes/handler');
const multer = require('multer');
const app = express();


const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};


// var server = app.listen(3000, function () {

// 	//configurations
//   app.use(express.static(path.join(__dirname, 'public')));
//   app.use(allowCrossDomain);
//    app.use(app.router);
//   // app.use(express.bodyParser());
//   app.use(bodyParser.json()); // for parsing application/json
//   app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//   app.use(multer()); // for parsing multipart/form-data

// 	console.log("Server is running!");
// });

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(allowCrossDomain);

    console.log("Server is running!");
});

app.get('/', function (req, res) {
  res.redirect('/index.html');
});

app.post('/api/v1/user', handler.updateUser);

app.post('/api/v1/searchRecipes', handler.searchRecipe);

app.listen(3000);