const mongoose = require('mongoose')
const Product = mongoose.model("Product")
const User = mongoose.model("User");

module.exports.dashbroad = async function (req, res) {
    const numProduct = await Product.find().count()
    const numUser = await User.find().count()
    res.render("admin/dashboard", { numProduct, numUser })
}