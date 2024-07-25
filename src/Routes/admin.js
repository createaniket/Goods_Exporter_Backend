const express = require("express")
const router = new express.Router()
const Admin = require("../Models/Admin")

router.post("/signup", async (req, res) => {
    const admin = new Admin(req.body)
    console.log(req.body)
        try{
            await admin.save();
            console.log("this is the admin" , admin)
            const token = await admin.generateAuthToken()
            res.status(201).json({
                admin:admin,
                token:token
            })
        }catch (error){
            console.log(error)
            res.status(400).json({
                message:"something went wrong",
                error:error.message
            })
        }    
})

router.post('/login', async(req, res) => {

    try {

        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        const token = await admin.generateAuthToken()

        res.status(201).json({
            message:"Logged in Successfully",
            admin:admin,
            token:token
        })
        
    } catch (error) {

        res.status(400).json({
            message:"Something went Wrong",
            error:error.message
        })
        
    }
})

module.exports = router;