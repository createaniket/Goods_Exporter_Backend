const express = require("express");
const router = new express.Router();

const Auth = require('../Middlewares/Auth')

const {upload_User_Avatar} = require('../Middlewares/Multer')

const {Signup, Login, GetAll, AddAvatar,  Logout, CreateUniqueMemberId} = require("../Controller/Usercntrlr")

router.post('/signup', Signup)
router.post('/login',Login )


router.post('/avatar',Auth, upload_User_Avatar.single('dp'),  AddAvatar)
router.get('/getall', GetAll)

router.post('/logout',Auth,  Logout )


router.post('/verify/:id', CreateUniqueMemberId)


module.exports = router