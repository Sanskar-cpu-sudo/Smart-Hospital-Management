const express = require("express");
const UserController=require("../Controller/UserController.js")
const auth=require("../middleware/authMiddleware.js")

const router=express.Router();

router.post("/signup",UserController.Signup);
router.post("/login",UserController.Login);
module.exports = router;