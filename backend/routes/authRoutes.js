const express = require("express");
const router = express.Router();

const {login ,signup} = require("../controllers/authController")

console.log("login" ,login)
console.log("signIn" , signup)
router.post("/login" , login)
router.post("/signup" , signup)


module.exports = router;
