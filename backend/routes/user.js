const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req,res)=>{
    console.log(req.body);
    const user = User(req.body);
    await user.save();
    res.json(req.body);
    // res.send("Hello")
})

module.exports = router;