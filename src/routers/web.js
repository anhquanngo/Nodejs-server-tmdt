const { Router } = require("express");
const userController = require("../apps/controllers/admin/user.controller");

const router = Router();

router.get("/", userController.login);

module.exports = router;
