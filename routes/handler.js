'use strict';

const recipeAPI = require('./recipeAPI');

const handler = module.exports = {};

handler.searchRecipe = function *searchRecipe(next) {
  if ('POST' != this.method) return yield next;

  const that = this.request.body;
  console.log('that', that);
  let recipe = {};
  recipe.ingredients = that.ingredients;

  recipeAPI.searchAllIngredients(recipe.ingredients, function(recipes) {
		this.body = JSON.stringify(recipes);
	});

  // const res = 1;
  // const res = yield venue.getById(id);

  this.type = 'application/vnd.api+json';
  // this.body = JSON.stringify(res);

  // return value to frontend
  this.res.end(this.body);

  yield next;
};


handler.updateUser = function *updateUser(next) {
	if ('POST' != this.method) return yield next;

  const that = this.request.body;
  let user = {};

  user._id = that.id;
  // user.firstname = that.body.firstname;
  // user.lastname = that.body.lastname;

  const res = 1;
	this.type = 'application/vnd.api+json';
  this.body = JSON.stringify(res);

  // return value to frontend
  this.res.end(this.body);

  yield next;

  	// db.updateUser(user, function() {
	// 	// var dishes = {
	// 	// 	"dishes": 5,
	// 	// 	"dishList": [
	// 	// 	  { "id": 1,
	// 	// 		"dishName": "Buffalo Pulled Chicken Breast"
	// 	// 	}]
	// 	// };

	// 	// db.getDishesById(user._id, function() {
	// 	// 	res.send("Dishes recieved!");
	// 	// });
	// 	// res.send(dishes);
	// 	// db.getDishes()
	// });
};


// exports.searchRecipe = function(req, res) {
// 	console.log("welcome to search recipes");
// 	var recipe = {};
// 	recipe.ingredients = req.body.ingredients;

// 	recipeAPI.searchAllIngredients(recipe.ingredients, function(recipes) {
// 		res.json(recipes);
// 	});
// };

//Adds a dish to the DB
exports.addDish = function(req, res) {
	var dish = req.body.Dish;
	console.log(dish);
	// db.createDish(dish, function() {
	// 	res.send("Dish added!");
	// });
};

//Removes the dish from DB
exports.removeDish = function(req, res) {
	var dish = req.body.Dish;
	console.log(dish);
	// db.removeDish(dish, function() {
	// 	res.send("Dish removed")
	// });
};

