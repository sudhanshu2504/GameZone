const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {type: String, required:true},
    email : {type: String, required:true, unique:true},
    password : {type: String, required:true},
    address : {type: String, default:""},
    city : {type: String, default:""},
    pincode : {type: String, default:""},
    contact : {type: String, default:""},
    cart : {type: String, default:""},
}, {timestamps : true} )
const User = mongoose.model('user',UserSchema)

module.exports =  User;
