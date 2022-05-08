const express = require('express');
const router = express.Router();
const controller = require('../Controller/category')


router.get('/',controller.GetAllCategoryies);
router.get('/:id',controller.GetCategoryById);
router.post('/',controller.CreateCategory);
router.patch('/:id',controller.updateCategory);
router.delete('/:id',controller.deleteCategory)

module.exports = router;




