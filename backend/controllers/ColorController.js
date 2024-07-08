const Color = require("../models/ColorModels"); 




class ColorController{
    create(data){
        return new Promise(
            (resolve,reject)=>{
                try {
                    const color =new Color({name:data.name , code:data.color});
                    color.save()
                    .then(
                        (success)=>{
                          resolve({
                            msg:"color created",
                            status:1
                          })
                        }
                    ).catch(
                        (error)=>{
                            reject({
                                msg:"unable to create color",
                                status:0
                              })
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
                        data = await Color.findById(id);
                    } else {
                        data = await Color.find();
                    }
                    resolve(
                        {
                            msg: "Data found",
                            colors: data,
                            status: 1,
                            // imageBaseUrl: "/images/category/"
                        }
                    )
                    // const colors = await Color.find();
                    // resolve({
                    //     msg:colors.length+"data found",
                    //     status:1,
                    //     colors
                    //   })
                } catch (error) {
                    reject({
                        msg:"internal serevr error",
                        status:0
                      })
                }
            }
        )
        
    }
    delete(color_id){
        return new Promise(
            async (resolve,reject)=>{
                try {
                    const dltcolor =await Color.findById(color_id);
                    
                    if(dltcolor){
                        Color.deleteOne({_id:color_id})
                        .then(
                            (success)=>{
                                resolve({
                                    msg:" Color item deleted successfull",
                                    status:1
                                })
                            }
                        ).catch(
                            (error)=>{
                                reject({
                                    msg:"Color already deleted",
                                    status:0
                                  })
                            }
                        )
                      
                    }else{
                        reject({
                            msg:"Color not foundddddd",
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
    update(){

    }
}

module.exports= ColorController;