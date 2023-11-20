const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/',async (req,res)=>{
    console.log(req.body);
    const order = Order(req.body);
    await order.save();
    // res.json({});
    // res.send("Hello")
})

module.exports = router;