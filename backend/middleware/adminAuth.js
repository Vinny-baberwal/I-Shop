const { verifyToken } = require("../helper");

const adminUth =(req, res, next)=>{
    const apiKey=req.headers.authorization;
    if(verifyToken(apiKey)){
        next();
    }else{
        res.send({
            status:0,
            message:'You are not authorized'
        })
    }
}




module.exports={adminUth}