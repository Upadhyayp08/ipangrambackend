const express = require("express");
const userController = require("../controller/registerController");

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/", userController.loginUser);
router.get("/employee", userController.getEmployee);
router.put("/employees/:id", userController.updateEmployee);
router.delete("/employees/:id", userController.deleteEmployee);

module.exports = router;
