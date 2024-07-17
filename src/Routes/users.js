const express = require("express");
const router = new express.Router();

const Auth = require('../Middlewares/Auth')

const {Signup, Login, Logout} = require("../Controller/Usercntrlr")

router.post('/signup', Signup)
router.post('/login',Login )

router.post('/logout',Auth, Logout )

module.exports = router