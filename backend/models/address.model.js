import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
        user:{type:String , required:true }, 
        firstName:{ type: String , required :true},
        lastName :{ type:String , required: true},
        email : { type:String , required:true},
        street:{ type:String , required:true},
        city:{ type:String , required:true},
        state:{ type:String , required:true},
        zipCode:{ type:String , required:true},
        country:{ type:String , required:true},
        phone:{ type:String, required:true},
        
    },);


const Address = mongoose.model("Address" , addressSchema);
export default Address;