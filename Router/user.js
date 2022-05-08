const express = require('express');
const router = express.Router();
const controller = require('../Controller/user')


router.get('/:email/:password',controller.getUserByEmailAndPassword);
router.get('/:id',controller.getAllOrderByUserId);
router.get('/',controller.getAllUsers);
router.post('/',controller.createUser);
router.patch('/:id',controller.updateUser);
router.delete('/:id',controller.deleteUser)

module.exports = router;




