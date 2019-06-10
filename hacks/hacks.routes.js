const express = require('express');
const hacksController = require('./hacks.controller');
// const middleware = require('../users/verifyToken'); 6/10/2019
const middleware = require('../users/middleware'); //6/10/2019


let router = express.Router()

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

router.post('/create/:token', middleware.verifyToken, hacksController.createNew);
router.get('/all/:token', middleware.verifyToken, hacksController.fetchAll);
// router.get('/all', hacksController.fetchAll);
router.get('/one/:id', hacksController.fetchSelectedHack);
router.get('/fetchAllByUser/:id/:token', middleware.verifyToken, hacksController.fetchAllByUser);
router.delete('/delete/:id', hacksController.deleteSelectedHack);

router.get('/findByCategory/:searchQueryText', hacksController.findByCategory);
router.get('/findByItem/:searchQueryItem', hacksController.findByItem);
module.exports = router;