const express = require('express');
const router = express.Router();

const awardsController = require('../controllers/awards');
//validator
const validation = require('../middleware/validate');
//auth0 lesson 7
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), awardsController.getAll);

router.get('/:id', requiresAuth(), awardsController.getSingle);

router.post('/', requiresAuth(), validation.saveAward, awardsController.createAward);

router.put('/:id', requiresAuth(), validation.saveAward,  awardsController.updateAward);

router.delete('/:id', requiresAuth(), awardsController.deleteAward);

module.exports = router;