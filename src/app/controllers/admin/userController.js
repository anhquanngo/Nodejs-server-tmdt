// module.exports.product = async function (req, res) {
//     res.render("admin/product")
// }
const mongoose = require('mongoose');
const joi = require('@hapi/joi');
const User = mongoose.model("User")

async function getList(req, res) {
    const allUser = await User.find();
    res.render("admin/user", { users: allUser })
}
function getAdd(req, res) {
    res.render("admin/add_user")
}
async function getEdit(req, res) {
    const { id } = req.params
    const user = await User.findById(id)
    res.render("admin/edit_user", { user })
}
function getDel(req, res) {
    res.send("User Del")
}

async function store(req, res) {
    const bodySchema = joi.object({
        user_mail: joi.string().required(),
        user_full: joi.string().required(),
        user_pass: joi.string().required(),
        user_level: joi.number()
    }).unknown()
    const value = await bodySchema.validateAsync(req.body).catch((err) => err)
    if (value instanceof Error) {
        return res.redirect("/admin/user")
    }
    const check = await User.findOne({ "user_fullname": value.user_full })
    if (check === null) {
        const user = new User({
            user_mail: value.user_mail,
            user_fullname: value.user_full,
            user_pass: value.user_pass,
            user_level: value.user_level
        })
        await user.save()
        return res.redirect("user")

    }
    return res.redirect("/admin/add-user")
}

async function destroy(req, res) {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.redirect("/admin/user")
    }
    const user = await User.findByIdAndDelete(id);

    return res.redirect("/admin/user")
}

async function PostUpdate(req, res) {
    const { id } = req.params
    const bodySchema = joi.object({
        user_mail: joi.string().required(),
        user_full: joi.string().required(),
        user_pass: joi.string().required(),
        user_level: joi.number()
    }).unknown()

    const value = await bodySchema.validateAsync(req.body).catch((err) => err)
    if (value instanceof Error) {
        return res.redirect("/admin/edit-user")
    }

    const userUpdate = {
        user_mail: value.user_mail,
        user_fullname: value.user_full,
        user_pass: value.user_pass,
        user_level: value.user_level
    }

    await User.updateOne({ _id: id }, userUpdate)

    return res.redirect("/admin/user")
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