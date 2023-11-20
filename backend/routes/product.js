const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Route 1 : Adding product using POST : /api/product/add . No Login
router.post('/addProduct', async (req,res)=>{
try{
    let product = await Product.findOne({slug:req.body.slug});
    if(product){
        return res.status(400).json({error:"Product is already added"})
    }
    product = await Product.create({
        title : req.body.title,
        slug : req.body.slug,
        desc : req.body.desc,
        category : req.body.category,
        img : req.body.img,
        price : req.body.price,
        availableQty : req.body.availableQty,
    })
    res.send({product})
}
catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error, Bad Request 500")
}
})

// Route 2 : Fetching products category wise using GET : /api/product/fetch . NoLogin
router.post('/category',async(req,res)=>{
    try{
        let product = await Product.find({category : req.body.category});    
        // let product = await Product.find({category:req.body.category});    
        res.send({product})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error, Bad Request 500")
    }
})
// Route 3 : Fetching product as per slug using GET : /api/product/fetch . NoLogin
router.post('/slug',async(req,res)=>{
    try{
        let product = await Product.find({slug : req.body.slug}); 
        res.send({product})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error, Bad Request 500")
    }
})
module.exports = router;