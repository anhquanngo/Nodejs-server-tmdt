const mongoose = require('mongoose')
const joi = require("@hapi/joi")
const Category = mongoose.model("Category");

async function getList(req, res) {
    const allCategories = await Category.find().sort("-_id").populate('product');
    // console.log("allCategories", allCategories)
    res.render("admin/category", { categories: allCategories })
}
function getAdd(req, res) {
    res.render("admin/add_category")
}
async function getEdit(req, res) {
    const { id } = req.params
    const category = await Category.findById(id)
    res.render("admin/edit_category", { category })
}
function getDel(req, res) {
    res.send("Category Del")
}

async function store(req, res) {

    const bodySchema = joi.object({
        cat_name: joi.string().required(),
    }).unknown();

    const value = await bodySchema.validateAsync(req.body).catch((err) => err)
    console.log("store -> value", value)
    if (value instanceof Error) {
        return res.redirect("/admin/add-category")
    }

    const check = await Category.findOne({ "cat_name": value.cat_name })

    if (check === null) {
        const category = new Category({
            cat_name: value.cat_name
        })

        await category.save()
        return res.redirect("category")
    }

    return res.redirect("/admin/add-category")
}

async function destroy(req, res) {
    const { id } = req.params
    console.log("destroy -> id", id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.redirect("/admin/category")
    }
    const catogory = await Category.findByIdAndDelete(id);

    return res.redirect("/admin/category")
}

async function PostUpdate(req, res) {
    const { id } = req.params

    const bodySchema = joi.object({
        cat_name: joi.string().required()
    }).unknown();

    const value = await bodySchema.validateAsync(req.body).catch((err) => err)
    if (value instanceof Error) {
        return res.redirect("/admin/category")
    }
    const categoryUpdate = {
        cat_name: value.cat_name
    }
    await Category.updateOne({ _id: id }, categoryUpdate)

    return res.redirect("/admin/category")
}

module.exports = {
    getList: getList,
    getAdd: getAdd,
    getEdit: getEdit,
    getDel: getDel,

    store: store,
    destroy: destroy,
    PostUpdate: PostUpdate
}