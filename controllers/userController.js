const asyncHandler = require("express-async-handler");
const User=require("../models/userModels");
const bcrypt=require("bcryptjs");

// @desc Register a user 
// @routes POST /api/users/register
// @access public
const registerUser = asyncHandler(async(req,res)=>{
    let {username,email,password}=req.body;
     if(!username || !email || !password){
        res.status(400);
        throw new Error("All field are mandatory");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }

    // Hash Password // 10-salt round
    const hashedPassword=await bcrypt.hash(password,10);
    console.log("Hashed Password: ",hashedPassword);
    const user=await User.create({
        username,
        email,
        password:hashedPassword,
    })

    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id:user.id,email:user.email})
    }
    else{
        res.status(400);
        throw new Error("User is not valid");
    }
    res.json({message:"Register the user!"});
});

// @desc Login a user 
// @routes POST /api/users/login
// @access public
const loginUser = asyncHandler(async(req,res)=>{
    res.json({message:"login user!"});
});

// @desc current user info
// @routes POST /api/users/current
// @access Private
const currentUser = asyncHandler(async(req,res)=>{
    res.json({message:"Current user information!"});
});

module.exports={registerUser,loginUser,currentUser};