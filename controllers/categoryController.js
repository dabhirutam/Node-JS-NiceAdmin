const categoryModel = require("../models/categoryModal");


const AddCategory = (req, res) => {
    res.render('addCategory');
}

const SaveCategory = async (req, res) => {

    const category = new categoryModel({
        category: req.body.category
    });

    await category.save();

    res.redirect('/addcategory')
}

module.exports = { AddCategory, SaveCategory }