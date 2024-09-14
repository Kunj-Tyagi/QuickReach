const asyncHandler = require("express-async-handler");
const User=require("../models/userModels");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

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
});

// @desc Login a user 
// @routes POST /api/users/login
// @access public
const loginUser = asyncHandler(async(req,res)=>{
    let {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All field are mandatory");
    }
    const user=await User.findOne({email});
    // Compare password with hashpassword
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            // Payload
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            }
        }, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

// @desc current user info
// @routes POST /api/users/current
// @access Private
const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user);
});

module.exports={registerUser,loginUser,currentUser};