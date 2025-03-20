const express = require('express');
const categoryRoutes = express.Router();
const categoryController = require('../controllers/categoryController');

categoryRoutes.get('/category', categoryController.AddCategory);
categoryRoutes.post('/addCategory', categoryController.SaveCategory);

module.exports = categoryRoutes;