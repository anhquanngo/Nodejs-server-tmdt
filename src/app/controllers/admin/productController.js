const mongoose = require("mongoose")
const Category = mongoose.model("Category")
const Product = mongoose.model("Product");
const joi = require("@hapi/joi")

const path = require('path')
const fs = require("fs")

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
                console.log("getList -> range", rangerForDot)
            } else if (i - temp !== 1) {
                rangerForDot.push("...");
            }
        }
        temp = i;
        rangerForDot.push(i);
    })

    const allProduct = await Product.find()
        .populate("cat_id")
        .sort("-_id")
        .limit(limit)
        .skip(skip);


    res.render("admin/product", {
        allProduct,
        range: rangerForDot,
        page,
        totalPages,
    })
}

async function getAdd(req, res) {
    const categories = await Category.find()
    res.render("admin/add_product", { categories })
}

async function getEdit(req, res) {
    const { id } = req.params
    const product = await Product.findById(id)
    const categories = await Category.find()

    res.render("admin/edit_product", { categories, product })
}

async function PostUpdate(req, res) {

    const { id } = req.params
    const file = req.file
    if (file) {
        const pathUpLoad = path.resolve("src", "public", "admin", "img")
        const contentFile = fs.readFileSync(file.path)
        fs.unlinkSync(file.path)
        fs.writeFileSync(path.join(pathUpLoad, file.originalname), contentFile)

    }
    const bodySchema = joi.object({
        prd_name: joi.string().required(),
        prd_price: joi.number()
    }).unknown();

    const value = await bodySchema.validateAsync(req.body).catch((err) => err)
    if (value instanceof Error) {
        return res.redirect("/admin/product")
    }

    const productUpdate = {
        prd_name: value.prd_name,
        cat_id: value.cat_id,
        prd_price: value.prd_price,
        prd_warranty: value.prd_warranty,
        prd_accessories: value.prd_accessories,
        prd_new: value.prd_new,
        prd_promotion: value.prd_promotion,
        prd_status: value.prd_status,
        prd_featured: value.prd_featured,
        prd_details: value.prd_details
    }

    if (file) {
        productUpdate("prd_image") = file.originalname;
    }

    await Product.updateOne({ _id: id }, productUpdate)


    return res.redirect("/admin/product")

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

async function store(req, res) {
    const file = req.file
    const pathUpLoad = path.resolve("src", "public", "admin", "img")

    const contentFile = fs.readFileSync(file.path)
    fs.unlinkSync(file.path)
    fs.writeFileSync(path.join(pathUpLoad, file.originalname), contentFile)

    const bodySchema = joi.object({
        prd_name: joi.string().required(),
        prd_price: joi.number()
    }).unknown();

    const value = await bodySchema.validateAsync(req.body).catch((err) => err)
    if (value instanceof Error) {
        return res.redirect("/admin/add-product")
    }

    const product = new Product({
        prd_name: value.prd_name,
        cat_id: value.cat_id,
        prd_image: file.originalname,
        prd_price: value.prd_price,
        prd_warranty: value.prd_warranty,
        prd_accessories: value.prd_accessories,
        prd_new: value.prd_new,
        prd_promotion: value.prd_promotion,
        prd_status: value.prd_status,
        prd_featured: value.prd_featured,
        prd_details: value.prd_details
    })

    await product.save()
    return res.redirect("product")

}

async function destroy(req, res) {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.redirect("product")
    }

    const product = await Product.findByIdAndDelete(id);
    if (product) {
        const pathUpLoadProduct = path.resolve("src", "public", "admin", "img")
        if (fs.existsSync(path.join(pathUpLoad, product.prd_name))) {
            fs.unlinkSync(path.join(pathUpLoad, product.prd_name))
        }
    }

    return res.redirect("/admin/product")
}

module.exports = {
    getList: getList,
    getAdd: getAdd,
    getEdit: getEdit,
    getDel: getDel,

    PostUpdate: PostUpdate,
    getTest: getTest,
    postTest: postTest,

    store: store,
    destroy: destroy

}