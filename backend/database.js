const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/gamezone";
// const mongoURI = "mongodb+srv://sudhanshu250403:mongoDBatlas@cluster0.zajcgga.mongodb.net/gamezone";

const functionn = ()=>{
    console.log("Connect to mongoDB Successfully");
}

const connnectToMongoDB = ()=>{
    mongoose.connect(process.env.MONGO_URI,functionn())
}
module.exports = connnectToMongoDB;