const express = require('express');
const router = express.Router();

const directorsController = require('../controllers/directors');
//validator
const validation = require('../middleware/validate');
//auth0 lesson 7
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), directorsController.getAll);

router.get('/:id', requiresAuth(), directorsController.getSingle);

router.post('/', requiresAuth(), validation.saveDirector, directorsController.createDirector);

router.put('/:id', requiresAuth(), validation.saveDirector,  directorsController.updateDirector);

router.delete('/:id', requiresAuth(), directorsController.deleteDirector);

module.exports = router;