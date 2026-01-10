const express = require('express');
const middleware = require('./verifyToken');
const usersController = require('./users.controller');
const authController = require('./auth.controller');

let router = express.Router()

// router.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/all', usersController.fetchAll);
router.get('/one/:id', usersController.fetchSelectedUser);
router.delete('/delete/:id', usersController.deleteSelectedUser);

 
module.exports = router;






