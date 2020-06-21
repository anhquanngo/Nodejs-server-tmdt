const { Router } = require("express")
const { AdminController } = require("../app/controllers/index")
const loginController = require('../app/controllers/admin/loginController')
const checkLogin = require("../app/middlewares/check-login")
const checkLoginOut = require("../app/middlewares/check-logout")

const multer = require("multer")
const { route } = require("./api")
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, res, cb) {
            cb(null, "/tmp")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now())
        }
    })
})

const router = Router();
router
    .route("/admin/login")
    .get(checkLogin, loginController.login)
    .post(checkLogin, loginController.postLogin)
router.use("/admin/login", checkLoginOut)

router.use("/admin", checkLoginOut)
router.get("/admin/logout", loginController.logout)
//Client

router.get("/admin/dashboard", AdminController.Dashbroad.dashbroad)
router.get("/admin/category", AdminController.Category.getList)
router.get("/admin/product", AdminController.Product.getList)
router.get("/admin/user", AdminController.User.getList)
/////////////
router
    .get("/admin/add-category", AdminController.Category.getAdd)
    .get("/admin/delete-category/:id", AdminController.Category.destroy)
    .post("/admin/add-category", AdminController.Category.store)

router
    .get("/admin/add-product", AdminController.Product.getAdd)
    .get("/admin/delete-product/:id", AdminController.Product.destroy)
    .post("/admin/add-product", upload.single('prd_image'), AdminController.Product.store)

router
    .get("/admin/add-user", AdminController.User.getAdd)
    .get("/admin/delete-user/:id", AdminController.User.destroy)
    .post("/admin/add-user", AdminController.User.store)
/////////////
router
    .get("/admin/edit-category/:id", AdminController.Category.getEdit)
    .post("/admin/edit-category/:id", AdminController.Category.PostUpdate)

router
    .get("/admin/edit-product/:id", AdminController.Product.getEdit)
    .post("/admin/edit-product/:id", upload.single('prd_image'), AdminController.Product.PostUpdate)

router
    .get("/admin/edit-user/:id", AdminController.User.getEdit)
    .post("/admin/edit-user/:id", AdminController.User.PostUpdate)
/////////////

module.exports = router;    