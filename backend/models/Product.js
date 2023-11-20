const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title : {type: String, required:true},
    slug : {type: String, required:true, unique:true},
    desc : {type: String, required:true},
    category : {type: String, required:true},
    img : {type: String, required:true},
    price : {type:Number, required:true},
    availableQty : {type:Number, required:true},
    // status : {type: String, default:'pending', required:true},
}, {timestamps : true} )

mongoose.models = {}
module.exports = mongoose.model("Product",ProductSchema);