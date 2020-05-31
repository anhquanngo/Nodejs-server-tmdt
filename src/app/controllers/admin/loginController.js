const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports.login = function (req, res) {
    res.render("admin/login", { error: "" })
}

module.exports.postLogin = async function (req, res) {
    const email = req.body.mail;
    const pass = req.body.pass
    let error = ""

    const user = await User.findOne({ user_mail: email });

    if (!user) {
        res.render("admin/login", {
            error: "Tài Khoản Không Đúng"
        })
    }
    if (user) {
        if (user.user_pass === pass) {
            return res.redirect("/admin/dashbroad")
        }
        res.render("admin/login", {
            error: "Mật Khâu không khớp"
        })
    }

}