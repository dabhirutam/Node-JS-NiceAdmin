const express = require('express');
const categoryRoutes = express.Router();
const categoryController = require('../controllers/categoryController');

categoryRoutes.get('/category', categoryController.Category);
categoryRoutes.get('/subCategory', categoryController.SubCategory)

categoryRoutes.post('/addCategory', categoryController.AddCategory);
categoryRoutes.post('/addSubCategory', categoryController.AddSubCategory);

module.exports = categoryRoutes;