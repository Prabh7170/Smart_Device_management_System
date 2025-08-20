const mongoose=require("mongoose");

const userSchema=  new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        trim:true,
    },
    password:{
        type:String,
        require:true,
        
    },
    role:{
        type:String,
        enum:["admin","student","user"]
    }

});

module.exports=mongoose.model("user",userSchema);