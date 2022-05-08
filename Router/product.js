const express = require('express');
const router = express.Router();
const controller = require('../Controller/product')


router.get('/:categoryId',controller.GetProductsByCategory);
router.get('/',controller.GetAllProducts);
router.get('/:id',controller.GetProductById);
router.post('/',controller.CreateProduct);
router.patch('/:id',controller.updateProduct);
router.delete('/:id',controller.deleteProduct)

module.exports = router;




