'use strict';

// const db = require('./dbCRUD');
const uuid = require('./uuidGenerator');
// const Promise = require('promise');
// const mongoConnection = require('./mongoConnection');
const recipeAPI = require('./recipeAPI');

exports.updateUser = function(req, res) {
	var user = {};
	user._id = req.body.id; //Using fbID as the ID
	user.firstname = req.body.firstname;
	user.lastname = req.body.lastname;

	db.updateUser(user, function() {
		// var dishes = {
		// 	"dishes": 5,
		// 	"dishList": [
		// 	  { "id": 1,
		// 		"dishName": "Buffalo Pulled Chicken Breast"
		// 	}]
		// };

		// db.getDishesById(user._id, function() {
		// 	res.send("Dishes recieved!");
		// });
		// res.send(dishes);
		// db.getDishes()
	});
};

exports.searchRecipe = function(req, res) {
	console.log("welcome to search recipes");
	var recipe = {};
	recipe.ingredients = req.body.ingredients;

	recipeAPI.searchAllIngredients(recipe.ingredients, function(recipes) {
		res.json(recipes);
	});
};

//Adds a dish to the DB
exports.addDish = function(req, res) {
	var dish = req.body.Dish;
	console.log(dish);
	db.createDish(dish, function() {
		res.send("Dish added!");
	});
};

//Removes the dish from DB
exports.removeDish = function(req, res) {
	var dish = req.body.Dish;
	console.log(dish);
	db.removeDish(dish, function() {
		res.send("Dish removed")
	});
};

