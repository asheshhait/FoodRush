import mongoose from "mongoose";
const foodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
     price:{type:Number,required:true},
     images:{type:String,required:true},
     catagory:{type:String,required:true},
})

const footModel =
    mongoose.models.food || mongoose.model("food", foodSchema);
export default footModel;