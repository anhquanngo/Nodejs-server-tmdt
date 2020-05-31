// module.exports.product = async function (req, res) {
//     res.render("admin/product")
// }
function getList(req, res) {
    res.render("admin/product")
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