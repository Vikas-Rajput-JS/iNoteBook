const JWT = require("jsonwebtoken");
const SCRET_KEY = "ILoveMyBacha@875";

const FetchUser = (req,res,next)=>{

    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Please authanticate using Valid Credentials"})
    }
    try {
    const data = JWT.verify(token,SCRET_KEY)
    req.user = data.user;
    next()
    } catch (error) {
        res.status(401).send({error:"Please authanticate using Valid Credentials"})
    }
}

module.exports= FetchUser;