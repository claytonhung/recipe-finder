'use strict'

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const assert = require('assert');

//Connection URL
const url = 'mongodb://localhost:27017/recipeFinder';
const dbName = 'recipeFinder';

//collections (tables)
const usersColl = 'users';
const dishesColl = 'dishes';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected correctly to server');

  db = db.db(dbName);
});


exports.updateUser = function (callback) {
  connectMongo(usersColl, callback);
};

exports.updateDish = function (callback) {
  connectMongo(dishesColl, callback);
};

exports.getDishesById = function (callback) {
  connectMongo(dishesColl, callback);
};

var connectMongo = function(collName, callback){
    mongo.connect(url, function(err, conn){
        conn.collection(collName, function(err, collection){
            callback(collection);
        });
    });
}
