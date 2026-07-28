import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://asheshhait_db_user:JM3kB2CibNlU9Q9p@cluster0.furycxa.mongodb.net/food-del').then(()=>console.log("db connected"))
}