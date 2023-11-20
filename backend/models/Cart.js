const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId : {type:String, required:true},
    cart : {type:Object ,default: []},
    date : {type: Date, default: Date.now}
})

mongoose.models = {}
module.exports = mongoose.model("Cart",CartSchema);