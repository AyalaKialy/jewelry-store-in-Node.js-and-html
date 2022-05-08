const express = require('express');
const router = express.Router();
const controller = require('../Controller/order')


router.get('/',controller.GetExpenciveOrders);
router.get('/:id',controller.GetOrderById);
router.post('/',controller.CreateOrder);
router.patch('/:id',controller.updateOrder);
router.delete('/:id',controller.deleteOrder)


module.exports = router;




