const mongoose = require('mongoose')
const categories = mongoose.model("Category");

async function getList(req, res) {
    const allCategories = await categories.find().populate('product');
    console.log("allCategories", allCategories)
    res.render("admin/category", { categories: allCategories })
}
function getAdd(req, res) {
    res.render("admin/add_category")
}
function getEdit(req, res) {
    res.render("admin/edit_category")
}
function getDel(req, res) {
    res.send("Category Del")
}
module.exports = {
    getList: getList,
    getAdd: getAdd,
    getEdit: getEdit,
    getDel: getDel,
}