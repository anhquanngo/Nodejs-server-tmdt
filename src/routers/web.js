const { Router } = require("express")
const { AdminController } = require("../app/controllers/index")
const loginController = require('../app/controllers/admin/loginController')

const router = Router();

router.get("/admin/dashboard", AdminController.Dashbroad.dashbroad)
router.get("/admin/category", AdminController.Category.getList)
router.get("/admin/product", AdminController.Product.getList)
router.get("/admin/user", AdminController.User.getList)
//
router.get("/admin/add-category", AdminController.Category.getAdd)
router.get("/admin/add-product", AdminController.Product.getAdd)
router.get("/admin/add-user", AdminController.User.getAdd)
//
router.get("/admin/edit-category", AdminController.Category.getEdit)
router.get("/admin/edit-product", AdminController.Product.getEdit)
router.get("/admin/edit-user", AdminController.User.getEdit)
//
router.get("/admin/login", loginController.login)

router
    .route("/admin/login")
    .get(loginController.login)
    .post(loginController.postLogin)

module.exports = router;    