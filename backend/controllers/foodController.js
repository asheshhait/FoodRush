import { response } from "express";
import footModel from "../model/foodModel.js";
import fs from 'fs'
const addFood = async(req,res)=>{


     console.log("Body:", req.body);
    console.log("File:", req.file);

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Image is required"
        });
    }

    let image_filename = `${req.file.filename}`
    const food = new footModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        catagory:req.body.catagory,
        images:image_filename,
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}
// all food list
const listFood = async(req,res)=>{
    
    try {
        const foods = await footModel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
        
    }

}
//remove food

const removeFood = async (req, res) => {
    try {
        const food = await footModel.findById(req.query.id);

        fs.unlink(`uploads/${food.images}`, () => {});

        await footModel.findByIdAndDelete(req.query.id);

        res.json({
            success: true,
            message: "Food Removed"
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        });
    }
}


export {addFood,listFood,removeFood}