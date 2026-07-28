import userModel from "../model/userModel.js"; // ✅ Fixed
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import validator from 'validator'
import { response } from "express";
import { json } from "body-parser";

const loginUser = async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(!user){
           return  res.json({success:false,message:"user not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }

}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//registerUser

const RegisterUser = async (req,res)=>{
    const{name,password,email} = req.body;
    try {
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false,message:"user already exist"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter a Valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"please enter a strong password"})
        }

        //hasing user password 
        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(password,salt)

        const nuwUser = new userModel({
            name:name,
            email:email,
            password:hasedPassword
        })
        const user = await nuwUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }

}
export {loginUser,RegisterUser}