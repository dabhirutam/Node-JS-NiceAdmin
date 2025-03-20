const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category: { type: String, required: true }
});

const categoryModel = mongoose.model('categorys', categorySchema);

module.exports = categoryModel;