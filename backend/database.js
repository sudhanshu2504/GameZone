const mongoose = require('mongoose');
require('dotenv').config();

const functionn = ()=>{
    console.log("Connect to mongoDB Successfully");
}

const connnectToMongoDB = ()=>{
    mongoose.connect(process.env.MONGO_URL,functionn())
}
module.exports = connnectToMongoDB;