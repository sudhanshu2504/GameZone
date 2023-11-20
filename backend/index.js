const connnectToMongoDB = require("./database");
const express = require('express')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = express()
const port = 5000
let cors = require("cors");

connnectToMongoDB();
app.use(cors());
app.use(express.json());
app.use('/api/auth',require('./routes/auth'))
app.use('/api/user',require('./routes/user'))
app.use('/api/order',require('./routes/order'))
app.use('/api/cart',require('./routes/cart'))
app.use('/api/product',require('./routes/product'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
