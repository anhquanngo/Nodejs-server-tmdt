function getList(req, res) {
    res.render("admin/category")
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