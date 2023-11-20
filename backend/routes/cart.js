const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const fetchUser = require('../middleware/fetchuser');


// Route 1 : Adding item in cart using POST '/api/cart/add'
router.post('/add',fetchUser,async (req,res)=>{
    try{
        // console.log(req.user.id)
        let c = await Cart.find({userId : req.user.id});
        if(c){
            await Cart.findOneAndDelete({userId : req.user.id})
        }
        c = await Cart.create({
            userId : req.user.id,
            cart : req.body.cart,
        })
        res.json(c.cart)
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error cannot fetch, Bad Request 500")
    }
})
// Route 2 : fetching existing cart using POST '/api/cart/fetch'
router.get('/fetch',fetchUser,async(req,res)=>{
    try{
        console.log(req.user.id);
        let cart = await Cart.find({userId : req.user.id}); 
        res.json({cart})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error, Bad Request 500")
    }
})
// Route 3 : updating existing cart using PUT '/api/cart/update'
router.put('/update', fetchUser, async (req, res) => {
    const { cart } = req.body;
    try {
        // Create a newCart object
        const newCart = {};
        if (cart) { newCart.cart = cart };

        // Find the note to be updated and update it
        let fetchedcart = await Cart.find({userId : req.user.id});
        if (!fetchedcart) { return res.status(404).send("Not Found") }

        // if (fetchedcart.user.toString() !== req.user.id) {
        //     return res.status(401).send("Not Allowed");
        // }
        fetchedcart = await Cart.findByIdAndUpdate(req.user.id, { $set: newCart })
        res.json({ fetchedcart });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;