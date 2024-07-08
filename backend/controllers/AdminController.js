const Admin = require('../models/AdminModels'); 
const Cryptr = require('cryptr');
const cryptr = new Cryptr('WScubetech@vinit');


class AdminController {
    signup(data){
        return new Promise(
         async (resolve, reject) => {
                try {
                    const adminMatch = await Admin.findOne({email:data.email})
                    if(adminMatch){
                       reject(
                        {
                            msg:"Email already exists",
                            status:0
                        }
                       ) 
                    }else{
                        if(data.password ==data.confirm_password){ 
                            if(data.secret_key=='vinit1010'){
                                const admin = new Admin({
                                    name:data.name,
                                    email:data.email,
                                    password:data.password, 
                                    is_super:true
                                })
                                admin.save()
                                .then(
                                    (succes) => {
                                        // console.log(succes);
                                        resolve({
                                            admin,
                                            msg: "account created",
                                            status: 1
                                            
                                        })
                                    }
                                )
                                .catch(
                                    (error) => {
                                        // console.log(error);
                                        reject({
                                            msg: "unbale to created account",
                                            status: 0
                                        })
                                    }
                                )
                            }
                     
                        }else{
                            reject(
                                {
                                    msg:"password not match",
                                    status:0
                                }
                            )
                        }
                    }
                    
                } catch (error) {
                    // console.log(error)
                    reject(
                        {
                            msg:"internal server kyuuu error",
                            status:0
                        }
                    )
                    
                }
            
        })
     }
     login(data){
        return new Promise(
           async (resolve, reject) => {
                try {
                   const admin = await Admin.findOne({email:data.email});
                   if(admin){ 
                    if(admin.password === data.password){
                         resolve({
                            admin:{...admin.toJSON(), password:null},
                            msg:"login success",
                            status:1 
                         })
                    }else{
                        reject({
                            msg:"password not match",
                            status:0
                            })
                    }
                   }else{
                    reject({
                        msg:"admin not found",
                        status:0
                        })
                   } 
                } catch (error) {
                    // console.log(error,"pppopopop") 
                    reject(
                        {
                            msg:"internal server error",
                            status:0
                        }
                    )
                    
                }
            
        })
     }   
}

module.exports = AdminController;
