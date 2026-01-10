const express = require('express');
const hacksController = require('./hacks.controller');
const middleware = require('../users/verifyToken'); 

let router = express.Router();

// Remove the manual CORS middleware - you already have it in server.js

router.post('/create', middleware.verifyToken, hacksController.createNew);
router.get('/all', hacksController.fetchAll);
router.get('/one/:id', hacksController.fetchSelectedHack);
router.get('/fetchAllByUser/:id', middleware.verifyToken, hacksController.fetchAllByUser);
router.delete('/delete/:id', hacksController.deleteSelectedHack);

module.exports = router;