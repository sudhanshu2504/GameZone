const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId : {type: String, required:true},
    products : {type:Object},
    address : {type:String , required:true},
    amount : {type:Number, required:true},
    status : {type: String, default:'pending', required:true},
}, {timestamps : true} )

mongoose.models = {}
module.exports = mongoose.model("Order",OrderSchema);