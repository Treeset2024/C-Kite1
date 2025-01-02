const express = require('express');
const userController = require('../Controller/usercontroller');
const router = express.Router();

router.post('/users', userController.createUser);
router.get('/user', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController. deleteUserById);


module.exports = router;
