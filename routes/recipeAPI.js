'use strict'

const http = require('http');
const food2fork_KEY = '1023f60a1e825a60b14cde2ca71bca2b';
const searchPath = '';
const options = {
  host: 'api.pearson.com:',
  port: 80,
  path: searchPath,
  method: 'GET'
};

var createIngredientSearchPath = function(ingredients) {
  for (var i=0; i < ingredients.length; i++) {
    searchPath += ingredients[i].toString();
    if (i !== ingredients.length -1)
      searchPath+= '%2C%20';
  }
}

var filterRecipes = function(recipes) {
  var jsonString;
  var count = recipes.count;
  if (count < 1) return 0;
  //Constructor
  var newObj = {
    dishes : 0,
    dishList : []
  };

  newObj.dishes = count;

  for (var i = 0; i < count; i++) {
    var jsonData = {
      dishName : recipes.results[i].name,
      dishImage : recipes.results[i].image
    };
    newObj.dishList.push(jsonData);
  }

  return newObj;
}

exports.searchAllIngredients = function(ingredients, callback) {
  searchPath = '/kitchen-manager/v1/recipes?ingredients-all=';
  createIngredientSearchPath(ingredients);
  options.path = searchPath;
  var data = '';

  var req = http.request(options, function(res) {
    if (res.statusCode == 200) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        data += chunk;
        // return callback(data);
      });
      res.on('end', function() {
        callback(filterRecipes(JSON.parse(data)));
      });
    } else {
      console.log("Error: " + res.statusCode + JSON.stringify(res.headers));
    }
  });

  req.end();
};

exports.searchAnyIngredients = function(ingredients, callback) {
  searchPath = '/kitchen-manager/v1/recipes?ingredients-any=';
  createIngredientSearchPath(ingredients);
  options.path = searchPath;

  var req = http.request(options, function(res) {
    if (res.statusCode == 200) {
      var data = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function() {
        callback(filterRecipes(JSON.parse(data)));
      });
    } else {
      console.log("Error: " + res.statusCode + JSON.stringify(res.headers));
    }
  });

  req.end();
};


