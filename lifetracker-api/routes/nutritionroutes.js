const express = require("express")
const router = express.Router()
const Nutrition = require("../models/Nutrition")

router.get("/:userID", async (req,res, next) => {
    try{
        const nutrition = await Nutrition.getAllNutritionDataByID(req.params.userID)
        res.status(200).json({nutrition})
    } catch(err) {
        next(err)
    }
})

router.post("/create", async (req,res,next) => {
    try{
        const created_nutrition = Nutrition.createNutrition(req.body)
        res.status(201).json({created_nutrition})
    }catch(err){
        next(err)
    }
})

module.exports = router

