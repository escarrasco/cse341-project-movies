const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
//validator
const validation = require('../middleware/validate');
//auth0 lesson 7
const { requiresAuth } = require('express-openid-connect');



router.get('/', requiresAuth(), moviesController.getAll);

router.get('/:id', requiresAuth(), moviesController.getSingle);

router.post('/', requiresAuth(), validation.saveMovie, moviesController.createMovie);

router.put('/:id', requiresAuth(), validation.saveMovie, moviesController.updateMovie);

router.delete('/:id', requiresAuth(), moviesController.deleteMovie);

module.exports = router;