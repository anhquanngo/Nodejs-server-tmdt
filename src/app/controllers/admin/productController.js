const mongoose = require("mongoose")

const Product = mongoose.model("Product");
async function getList(req, res) {

    let page

    if (!req.query.page) {
        page = 1
    } else {
        page = parseInt(req.query.page)
    }

    const limit = 2;

    const skip = (page - 1) * limit

    const toltalDoc = await Product.find().countDocuments();

    const totalPages = Math.ceil(toltalDoc / limit)

    const range = [];

    const rangerForDot = []

    const delta = 2

    const left = page - delta;
    const right = page + delta

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= left && i <= right)) {
            range.push(i);
        }
    }

    let temp
    range.map((i) => {
        if (temp) {
            if (i - temp === 2) {
                rangerForDot.push(i - 1);
            } else if (i - temp !== 1) {
                rangerForDot.push("...");
            }
        }
        temp = i;
        rangerForDot.push(i);
    })
    console.log("getList -> range", rangerForDot)

    const allProduct = await Product.find()
        .populate("cat_id")
        .limit(limit)
        .skip(skip);


    res.render("admin/product", {
        allProduct,
        range: rangerForDot,
        page,
        totalPages,
    })
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