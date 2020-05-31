const mongoose = require("mongoose")

const Product = mongoose.model("Product");
async function getList(req, res) {
    const allProduct = await Product.find().populate("cat_id")
    console.log("getList -> allProduct", allProduct)
    res.render("admin/product", { allProduct })
}
function getAdd(req, res) {
    res.render("admin/add_product")
}
function getEdit(req, res) {
    res.render("admin/edit_product")
}
function getDel(req, res) {
    res.send("Product Del")
}
function getTest(req, res) {

    let form = `
        <form method="post">
            <input type="text" name="mail" />
            <input type="submit" value="Send" />
        </form>
    `
    res.send(form)
}
function postTest(req, res) {

    res.send(req.body.mail)
}

module.exports = {
    getList: getList,
    getAdd: getAdd,
    getEdit: getEdit,
    getDel: getDel,

    getTest: getTest,
    postTest: postTest
}