const express = require("express")
const router = express.Router()
const User = require('../models/user')
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")



router.post("/login", async function (req,res,next){
    try {
        const user = await User.login(req.body)
        const token = jwt.sign(
            { userId: user.id, userName: user.username },//is this the actual name or username?
            SECRET_KEY,
            {
              expiresIn: "1h",
            }
          );

        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
              id: user.id,
              name: user.username, //follows structure of schema
              email: user.email,}})//user holds the 
    }catch (err){
        next(err)
    }

})

router.post("/register", async function (req,res,next) {
    try {
        const user = await User.register(req.body)
        console.log(user)
        const token = jwt.sign({UserID:user.id , Username:user.username},//
            SECRET_KEY,{
                expiresIn:"1h",
            })//have to place in .env file

        console.log("IM HERE", token); 
        console.log("user", user);
        res.status(201).json({
            message: "User registered successfully",
            token: token,
            user: user,
        })
    } catch (err){
        console.log("In error!!!")
        next(err)
    }

    console.log("IM HERE");
})
module.exports = router

////im not getting the correct status codes why???
//how can i create the other tables????
///the .test files.....