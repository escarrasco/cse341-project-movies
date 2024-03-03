const routes = require('express').Router();

//lesson 1
/*
const myController = require('../controllers');
routes.get('/', myController.nameFunction);
routes.get('/moreNames', myController.moreNames);
*/

//swagger route
routes.use('/', require('./swagger'));

//movies route
routes.use('/movies', require('./movies'));
//genre route
routes.use('/genres', require('./genres'));
//directors route
routes.use('/directors', require('./directors'));
//awards route
routes.use('/awards', require('./awards'));


module.exports = routes;