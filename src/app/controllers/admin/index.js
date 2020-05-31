// const mongoose = require("mongoose")

// const Category = mongoose.model("Category")
// const Product = mongoose.model("Product")

const Dashbroad = require("./dashbroadController")
const Category = require("./categoryController")
const Product = require("./productController")
const User = require("./userController")

module.exports = {
    Dashbroad,
    Category,
    Product,
    User,
}