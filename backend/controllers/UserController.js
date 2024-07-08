const User = require('../models/UserModels');
const Cart = require('../models/CartModels');
const Cryptr = require('cryptr');
const { getToken } = require('../helper');
const cryptr = new Cryptr('WScubetech@vinit');


class UserController {
 signup(data){
    return new Promise(
     async (resolve, reject) => {
            try {
                const userMatch = await User.findOne({email:data.email})
                if(userMatch){
                   reject(
                    {
                        msg:"Email already exists",
                        status:0
                    }
                   ) 
                }else{
                    if(data.password ==data.confirm_password){
                        const encryptedPassword = cryptr.encrypt(data.password);
                        const user = new User({
                            name:data.name,
                            email:data.email,
                            password:encryptedPassword, 
                        })
                        user.save()
                        .then(
                            (succes) => {
                                // console.log(succes);
                                resolve({
                                    user,
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
               const user = await User.findOne({email:data.email});
               if(user){
                const decryptedPassword = cryptr.decrypt(user.password);
                if(decryptedPassword === data.password){
                    const token= getToken(user.toObject())
                     resolve({
                        user:{...user.toJSON(), password:null},
                        token,
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
                    msg:"user not found",
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
 moveToDBCart({cartData,user_id}){
    return new Promise(
        async(resolve,reject)=>{
         try {
            const data=JSON.parse(cartData);
            const allPromise =data?.map(
                async(d)=>{
                    const cartExists =await Cart.findOne({user_id:user_id,product_id:d.pId});
                    if(cartExists){
                        await Cart.updateOne({_id:cartExists._id}, {qty:cartExists.qty+d.qty})
                    }else{
                        const cart = new Cart({product_id:d.pId,qty:d.qty,user_id});
                        await cart.save();
                    }
               
                }
            )
           await Promise.all(allPromise);
           const userCart =await Cart.find({user_id:user_id});
           resolve({
            msg:"cart data saved",
            status:1,
            userCart
            }) 
        } catch (error) {
            reject({
                msg:"internal server error",
                status:0
                })
                                        
 }
}
    )
}
addToDBCart({cartData,user_id}){
    return new Promise(
        async(resolve,reject)=>{
         try {
            
                    const cartExists =await Cart.findOne({user_id:user_id,product_id:cartData.pId});
                    if(cartExists){
                        await Cart.updateOne({_id:cartExists._id}, {qty:cartExists.qty+cartData.qty})
                    }else{
                        const cart = new Cart({product_id:cartData.pId,qty:cartData.qty,user_id});
                        await cart.save();
                    }
           const userCart =await Cart.find({user_id:user_id});
           resolve({
            msg:"cart data saved",
            status:1,
            userCart
            }) 
        } catch (error) {
            reject({
                msg:"internal server error",
                status:0
                })
                                        
 }
}
    )
}
addAddress(user_id,data){
    return new Promise(
      async  (resolve, reject) => {
            try {
                const user =await User.findById(user_id )
                if(user){
                    if(user.address==null){
                        User.updateOne({_id:user_id},{
                            address:{
                                name:data.name,
                                email:data.email,
                                contact:data.contact,
                                address:data.address,
                                city:data.city,
                                state:data.state,
                                pincode:data.pincode,
                            }
                        }).then(
                            (success)=>{
                                resolve({
                                    msg:"address added",
                                    status:1
                                })
                            }
                        ).catch(
                            (error)=>{
                                reject({
                                    msg:"unable to add address",
                                    status:0
                                    })
                            }
                        )
                    }else{ 
                        if (!user.address) {
                            user.address = [];
                        }
    
                        // Create a new address object
                        const newAddress = {
                            name: data.name,
                            email: data.email,
                            contact: data.contact,
                            address: data.address,
                            city: data.city,
                            state: data.state,
                            pincode: data.pincode,
                        };
    
                        // Add the new address to the addresses array
                        user.address.push(newAddress)
                        user.save()
                        .then(
                            (succes) => {
                                // console.log(succes);
                                resolve({
                                     address:user,
                                    msg: " one more address added",
                                    status: 1
                                    
                                })
                            }
                        )
                        .catch(
                            (error) => {
                                // console.log(error);
                                reject({
                                    msg: "unable to add more address ",
                                    status: 0
                                })
                            }
                        )
                    }
                   
                }else{
                    reject({
                        msg:"user not found",
                        status:0
                        }) 
                }
            } catch (error) {
                reject({
                    msg:"internal server error",
                    status:0
                    })
                         
            }
        
    })
}
 getAddress(user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        if (user_id) {
          const user = await User.findById(user_id);
          if (user) {
            if (user.address && user.address.length > 0) {
              resolve({
                msg: "Address found",
                address: user.address,
                status: 1
              });
            } else {
              resolve({
                msg: "No address found for the given user ID",
                status: 0
              });
            }
          } else {
            reject({
              msg: "User not found",
              status: 0
            });
          }
        } else {
          reject({
            msg: "User ID not provided",
            status: 0
          });
        }
      } catch (error) {
        reject({
          msg: "Internal server error",
          status: 0
        });
      }
    });
}
removeFromCart({cartData,user_id}){
    return new Promise(
        async(resolve,reject)=>{
            try{
                // console.log(user_id,product_id);
                const cartExists =await Cart.findOne({user_id:user_id,product_id:cartData.pId}).populate('product_id');
                if(cartExists){
                    await Cart.deleteOne({_id:cartExists._id}) 
                    .then(
                        (success)=>{
                            resolve({
                                msg:"deleteeeeeeeeeee",
                                status:1,
                                cartData 
                            })
                        }
                    ).catch(
                        (error)=>{
                            reject({
                                msg:"unable to deleted",
                                status:0
                                })
                        }
                    )
                }else{
                    reject({
                        msg:"ab bhi nhi  hora",
                        status:0
                        })
                }
            }catch(error){
                console.log(error)
                reject({
                    msg:"Internal server error",
                    status:0
                    })
            }
        }
    )
}
changeQtyINC({cartData,user_id}){
    return new Promise(
        async(resolve,reject)=>{
         try {
                    const cartExists =await Cart.findOne({user_id:user_id,product_id:cartData.pId});
                    if(cartExists){
                        await Cart.updateOne({_id:cartExists._id}, {qty:cartExists.qty+cartData.qty})
                    } 
           resolve({
            msg:"qty increse ",
            status:1,  
            }) 
        } catch (error) {
            reject({
                msg:"internal server error",
                status:0
                })
                                        
 }
}
    )
}
changeQtyDESC({cartData,user_id}){
    return new Promise(
        async(resolve,reject)=>{
         try {
            
                    const cartExists =await Cart.findOne({user_id:user_id,product_id:cartData.pId});
                    if(cartExists){
                        await Cart.updateOne({_id:cartExists._id}, {qty:cartExists.qty-cartData.qty})
                    } 
           resolve({
            msg:"qty decrease ",
            status:1, 
            }) 
        } catch (error) {
            reject({
                msg:"internal server error",
                status:0
                })
                                        
 }
}
    )
}
}

module.exports = UserController;
