'use strict'

const http = require('http');
// http://www.recipepuppy.com/about/api/
const recipePuppy = 'http://www.recipepuppy.com/api';
let searchPath = '';

// Concat string of ingredients by comma
var createIngredientSearchPath = function(ingredients) {
  for (let i=0; i < ingredients.length; i++) {
    searchPath += ingredients[i].toString();
    if (i !== ingredients.length -1)
      searchPath+= ',';
  }
}

// connect to API to search for json list of recipes
exports.searchAllIngredients = function(ingredients, callback) {
  searchPath = '/?i=';
  createIngredientSearchPath(ingredients);
  let data = '';
  const req = http.request(recipePuppy + searchPath, function(res) {
    if (res.statusCode == 200) {
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

var filterRecipes = function(recipes) {
  const length = recipes.results.length;
  if(length < 1) return 0;

  //Constructor
  let recipeObj = {
    dishes : 0,
    dishList : []
  };

  recipeObj.dishes = length;

  for (let i = 0; i < length; i++) {
    const jsonData = {
      dishName : recipes.results[i].title,
      dishImage : recipes.results[i].tumbnail,
      dishLink : recipes.results[i].href.replace('kraftfoods', 'kraftrecipes')
    };
    recipeObj.dishList.push(jsonData);
  }

  return recipeObj;
};



