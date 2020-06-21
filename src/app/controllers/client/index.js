// const AdminController = require("./admin");
// // const ProductController = require ("./admin/product")

// module.exports = {
//     AdminController
// }
const mongoose = require("mongoose")
const Product = mongoose.model("Product")

exports.home = async function (req, res) {
    const ProductFeatured = await Product.find({ prd_featured: 1 }).limit(6).sort("-_id")
    const ProductNew = await Product.find().limit(6).sort("-_id")
    res.render("site/home", { ProductFeatured, ProductNew })
}