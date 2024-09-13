const mongoose=require("mongoose");

const contactSchema=mongoose.Schema({
    name:{type:String,required:[true,"please add the contact name"]},
    email:{type:String,required:[true,"please add the contact email address"]},
    phone:{type:String,required:[true,"please add the contact number"]},
},{timestamps:true});

 module.exports=mongoose.model("Contact",contactSchema);