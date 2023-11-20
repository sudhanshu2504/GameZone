const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET;
const fetchUser = require('../middleware/fetchuser')

// Route 1 : Creating user using POST : /api/auth/createuser . No Login
router.post('/createuser',[
        body('name').isString(),
        body('email','Enter a valid email').isEmail(),
        body('password','Password should  be atleast of 6 characters').isLength({min:6})
    ],async (req,res)=>{
    let success = false;
    const errors = validationResult(req);

    // if errors - bad request else this
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success, error:"A user with this email already exists"})
        }
        const salt = await bcrypt.genSalt(7);
        const secPass = await bcrypt.hash(req.body.password,salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user:{
                id:user.id
            }
        }
        
        success = true;
        const auth_token = jwt.sign(data, secret);
        res.json({success,auth_token});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error, Bad Request 500")
    }
})

// Route 2 : Authenticating the user using  GET "/api/auth/login"
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cant be blank').exists()
],async (req,res)=>{
    
    let success = false;
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Try to login with correct credentials"});
        }
        const data = {
            user:{
                id:user.id
            }
        }
        success = true;
        const auth_token = jwt.sign(data, secret);
        res.json({success,auth_token});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error, Bad Request 500")
    }

})

// Route 3 : Getting user data using POST "/api/auth/getuser"
router.post('/getuser',fetchUser,async (req,res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error, Bad Request 500")
    }
})
    
module.exports = router