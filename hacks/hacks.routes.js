const express = require('express');
const hacksController = require('./hacks.controller');
const middleware = require('../users/verifyToken'); 


let router = express.Router()

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

router.post('/create/:token', middleware.verifyToken, hacksController.createNew);
router.get('/all', hacksController.fetchAll);
router.get('/one/:id', hacksController.fetchSelectedHack);
router.get('/fetchAllByUser/:id/:token', middleware.verifyToken, hacksController.fetchAllByUser);
router.delete('/delete/:id', hacksController.deleteSelectedHack);

module.exports = router;