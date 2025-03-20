const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    subCategory: { type: String, required: true },
    categoryID: { type: mongoose.Schema.ObjectId, ref: 'categorys', required: true },
});

const subCategoryModel = mongoose.model('subCategorys', subCategorySchema);

module.exports = subCategoryModel;