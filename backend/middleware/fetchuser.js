var jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const fetchUser = async (req,res,next)=>{
    // get user from jwt token
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error: "User is not authorized"})
    }
    try{
        const data = jwt.verify(token,secret);
        req.user = await data.user;
        next();
    }
    catch(error){
        res.status(401).send({error: "Please validate using valid token 2"})
    }
}

module.exports = fetchUser;
