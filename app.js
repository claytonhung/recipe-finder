"use strict";

const app = module.exports = require('koa')(),
      router = require('koa-router')(),
      mount = require('koa-mount'),
      body = require('koa-body-parser'),
      send = require('koa-send'),
      serve = require('koa-static'),
      logger = require('koa-logger'),
      ssl = require('koa-ssl'); // HTTPS
const handler = require('./routes/handler.js');

// Logger
app.use(logger());

// Enforcing SSL
app.use(ssl());

app.use(body());
app.use(router.routes());
app.use(router.allowedMethods());

// Routes
router.post('/user', handler.updateUser);
router.post('/searchRecipes', handler.searchRecipe);

// Additional path stripped from routes
app.use(mount('/api/v1', router.middleware()));

// Static Files
app.use(serve(__dirname + '/public'));
app.use(function *index(){
  yield send(this, __dirname + '/index.html');
});

app.use(function *(next){
  try{
    yield next; //pass on the execution to downstream middlewares
  } catch (err) { //executed only when an error occurs & no other middleware responds to the request
    this.type = 'application/vnd.api+json'; //optional here
    this.status = err.status || 500;
    this.body = { 'error' : 'The application recieved an error;) '};
    //delegate the error back to application
    this.app.emit('error', err, this);
  }
});

if (!module.parent) {
  app.listen(process.env.PORT || 3000);
  console.log('Server running on http://localhost:3000/!');
}