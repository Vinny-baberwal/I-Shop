const token = new Map();
const secretKet= "baberwal"
const jwt=require('jsonwebtoken');

const getToken= (user_data)=>{
    // token.set(token,user_data);
    const token = jwt.sign(user_data,secretKet,{expiresIn:"1h"});
    return token
}

const verifyToken=(token)=>{
    // return user_tokens.get(token);
    try {
        return jwt.verify(token,secretKet);
        
    } catch (error) {
        return false
    }
}



module.exports={getToken,verifyToken}