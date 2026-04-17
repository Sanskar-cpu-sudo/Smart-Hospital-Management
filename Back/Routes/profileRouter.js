const express = require("express");
const UserController=require("../Controller/UserController.js")
const auth=require("../middleware/authMiddleware.js")
const router=express.Router();

router.put("/update", auth, UserController.updateUser);
router.get("/:id/:role",auth,UserController.getUserById)

module.exports = router;