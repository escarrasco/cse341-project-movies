const express = require('express');
const router = express.Router();

const directorsController = require('../controllers/directors');
//validator
const validation = require('../middleware/validate');
//auth0 lesson 7
const { requiresAuth } = require('express-openid-connect');

router.get('/', directorsController.getAll);

router.get('/:id', directorsController.getSingle);

router.post('/', validation.saveDirector, directorsController.createDirector);

router.put('/:id', validation.saveDirector,  directorsController.updateDirector);

router.delete('/:id', directorsController.deleteDirector);

module.exports = router;