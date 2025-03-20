const categoryModel = require("../models/categoryModal");
const subCategoryModel = require("../models/subcategoryModal");


const Category = (req, res) => {
    res.render('addCategory');
}

const AddCategory = async (req, res) => {

    const category = new categoryModel({
        category: req.body.category
    });

    await category.save();

    res.redirect('/category');
}

const SubCategory = async (req, res) => {
    const categorys = await categoryModel.find(); 

    res.render('addSubCategory', {categorys});
}

const AddSubCategory = async (req, res) => {
    const SubCategory = new subCategoryModel({
        subCategory: req.body.subCategory,
        categoryID: req.body.categoryID
    });

    await SubCategory.save();

    res.redirect('/subCategory');
}

module.exports = { AddCategory, Category, SubCategory, AddSubCategory }