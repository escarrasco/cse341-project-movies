const express = require('express');
const router = express.Router();

const genresController = require('../controllers/genres');
//validator
const validation = require('../middleware/validate');

//auth0 lesson 7
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), genresController.getAll);

router.get('/:id', requiresAuth(), genresController.getSingle);

router.post('/', requiresAuth(), validation.saveGenre, genresController.createGenre);

router.put('/:id', requiresAuth(), validation.saveGenre, genresController.updateGenre);

router.delete('/:id', requiresAuth(), genresController.deleteGenre);

module.exports = router;