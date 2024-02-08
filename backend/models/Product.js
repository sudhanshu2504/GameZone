const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title : {type: String, required:true},
    slug : {type: String, required:true, unique:true},
    desc : {type: String, required:true},
    category : {type: String, required:true},
    img : {type: String, required:true},
    price : {type:Number, required:true},
    availableQty : {type:Number, required:true},
    discount : {type: Number, default:0},
}, {timestamps : true} )

mongoose.models = {}
module.exports = mongoose.model("Product",ProductSchema);