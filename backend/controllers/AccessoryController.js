const Accessory =require("../models/AccessoryModels");
const {unlinkSync} =require('fs');



class AccessoryController{
    create(data,image){
        return new Promise(
            (resolve,reject)=>{
                try {
                    const imageName =new Date().getTime()+ Math.floor(Math.random()*1000)+ image.name; 
                    const destination= "./public/image/accessory/"+imageName;
                    image.mv(
                        destination,
                        (error)=>{
                         if(error){
                            reject(
                                {
                                    msg:"unable to upload image",
                                    status:0
                                }
                             )
                         }else{
                            const accessory =new Accessory({name:data.name , slug:data.slug, image:imageName ,price:data.price});
                            accessory.save()
                            .then(
                                (success)=>{
                                  resolve({
                                    msg:"accessory added",
                                    status:1
                                  })
                                }
                            ).catch(
                                (error)=>{
                                    reject({
                                        msg:"unable to add accessory",
                                        status:0
                                      })
                                }
                            )
                         }
                        }
                    )
                } catch (error) {
                    reject({
                        msg:"internal serevr error",
                        status:0
                      })
                }
            }
        )

    }
    read(id){
        return new Promise(
            async (resolve,reject)=>{
                 try {
                    let data = "";
                    if (id) {
                        data = await Accessory.findById(id);
                    } else {
                        data = await Accessory.find();
                    }
                    resolve(
                        {
                            msg: "Data found",
                            accessories: data,
                            status: 1,
                            // imageBaseUrl: "/images/category/"
                        }
                    )
                    //  const accessories = await Accessory.find();
                    //  resolve({
                    //      msg: "data found",
                    //      status:1,
                    //      accessories
                    //    })
                 } catch (error) {
                     reject({
                         msg:"internal serevr error",
                         status:0
                       })
                 }
             }
         )
    }
    delete(accessory_id){
        return new Promise(
            async (resolve,reject)=>{
                try {
                    const dltAccessory =await Accessory.findById(accessory_id);
                    
                    if(dltAccessory){
                        Accessory.deleteOne({_id:accessory_id})
                        .then(
                            (success)=>{
                                resolve({
                                    msg:" Accessory item deleted successfull",
                                    status:1
                                })
                            }
                        ).catch(
                            (error)=>{
                                reject({
                                    msg:"Accessory already deleted",
                                    status:0
                                  })
                            }
                        )
                      
                    }else{
                        reject({
                            msg:"Accessory not foundddddd",
                            status:0
                          })
                    }
                  
                } catch (error) {
                    reject({
                        msg:"internal serevr error",
                        status:0
                      })
                }
            }
        )
    }
    update(accessory_id,data,image){
        return new Promise(
            (resolve,reject)=>{
                try {
                    if(image==null){
                     Accessory.updateOne({_id:accessory_id},{name:data.name,slug:data.slug,price:data.price})
                     .then(
                        ()=>{
                         resolve({
                            msg:"Data Updated",
                            status:1
                         })
                        }
                     ).catch(
                        ()=>{
                         reject({
                            msg:"data did not update",
                            status:0
                         })
                        }
                     )
                    }else{
                        const imageName =new Date().getTime()+ Math.floor(Math.random()*1000)+ image.name; 
                        const destination = "./public/image/accessory/"+imageName;
                        image.mv(
                            destination,
                            (error)=>{
                                if(error){
                                     reject(
                                        {
                                            msg:"unable to upload image",
                                            status:0
                                        }
                                     )
                                }else{
                                    unlinkSync("./public/image/accessory/"+ data.old_image);
                                 Accessory.updateOne(
                                    {_id:accessory_id},
                                    {name:data.name ,slug:data.slug,image:imageName}
                                 ).then(
                                        (success)=>{
                                          resolve({
                                            msg:"Data updated with image",
                                            status:1
                                          })
                                        }
                                    ).catch(
                                        (error)=>{
                                            reject({
                                                msg:"unable to update kyuu  data ",
                                                status:0
                                              })
                                        }
                                    )
                
                                }
                            }
                        )
                      
                    }
                } catch (error) {
                    // console.log(error)
                    reject({
                        msg:"internal server error ",
                        status:0
                      })
                }
            }
        )

    
    }
}

module.exports= AccessoryController;