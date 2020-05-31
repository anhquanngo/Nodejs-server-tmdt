// module.exports.product = async function (req, res) {
//     res.render("admin/product")
// }
const mongoose = require('mongoose')
const User = mongoose.model("User")

async function getList(req, res) {
    const allUser = await User.find();
    res.render("admin/user", { users: allUser })
}
function getAdd(req, res) {
    res.render("admin/add_user")
}
function getEdit(req, res) {
    res.render("admin/edit_user")
}
function getDel(req, res) {
    res.send("User Del")
}

module.exports = {
    getList: getList,
    getAdd: getAdd,
    getEdit: getEdit,
    getDel: getDel,
}