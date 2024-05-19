 import mongoose from "mongoose";
 import { Schema } from "mongoose";
const refreshToken= new Schema({
    token : {type:String, required:true}
});

export default mongoose.model('refreshToken',refreshToken)