const express = require('express');
const User = require('../models/User');
const router = express.Router();
const fetchUser = require('../middleware/fetchuser');


// Route 1 : Adding item in cart using POST '/api/cart/add'
router.post('/add',fetchUser,async (req,res)=>{
    let success = false;
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        let dbuser = await User.findOneAndUpdate({email:user.email} , {cart:req.body.cart})
        success = true;
        res.status(200).json({success})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error, Bad Request 500")
    }
})

module.exports = router;
