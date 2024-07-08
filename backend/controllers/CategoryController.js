const Category = require("../models/CategoryModels");
const Product = require("../models/ProductModels"); 
const {unlinkSync}= require('fs') ;



class CategoryController{
    create(data,image){
        return new Promise(
            (resolve,reject)=>{
                try {
                    const imageName =new Date().getTime()+ Math.floor(Math.random()*1000)+ image.name; 
                    const destination = "./public/image/category/"+imageName;
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
                                const category =new Category({name:data.name , slug:data.slug, image_name:imageName});
                                category.save()
                                .then(
                                    (success)=>{
                                      resolve({
                                        msg:"category created",
                                        status:1
                                      })
                                    }
                                ).catch(
                                    (error)=>{
                                        reject({
                                            msg:"unable to create category",
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
                        data = await Category.findById(id);
                    } else {
                        data = await Category.find();
                     }
                     const catData = await Promise.all(
                        data.map(
                            async  (cat)=>{
                              const prodCount = await Product.find({category_id:cat._id}).countDocuments();
                              return{
                                  ...cat.toJSON(),
                                  prodCount
                              }
                              }
                          ) 
                    ) 
                    resolve(
                        {
                            msg: "Data found",
                            categories:catData,
                            status: 1,
                            // imageBaseUrl: "/images/category/"
                        }
                    )
                    // const categories = await Category.find();
                    // resolve({
                    //     msg:categories.length+"data found",
                    //     status:1,
                    //     categories
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
    delete(category_id){
        return new Promise(
            async (resolve,reject)=>{
                try {
                    const dltCategory =await Category.findById(category_id);
                    
                    if(dltCategory){
                        // console.log(dltCategory.image_name,".......000.000..000");
                        // res.send("")
                        // return
                        unlinkSync("./public/image/category/"+ dltCategory.image_name);
                        Category.deleteOne({_id:category_id})
                        .then(
                            (success)=>{
                                resolve({
                                    msg:" Category item deleted successfull",
                                    status:1
                                })
                            }
                        ).catch(
                            (error)=>{
                                reject({
                                    msg:"Category already deleted",
                                    status:0
                                  })
                            }
                        )
                      
                    }else{
                        reject({
                            msg:"Category not foundddddd",
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
    update(category_id,data,image){
        return new Promise(
            (resolve,reject)=>{
                try {
                    if(image==null){
                     Category.updateOne({_id:category_id},{name:data.name,slug:data.slug})
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
                        const destination = "./public/image/category/"+imageName;
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
                                 Category.updateOne(
                                    {_id:category_id},
                                    {name:data.name ,slug:data.slug,image_name:imageName}
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
    changeStatus(category_id,new_status){
        return new Promise(
            (resolve,reject)=>{
                try {
                     Category.updateOne({_id:category_id},{status:new_status})
                        .then(
                            (success)=>{
                                resolve({
                                    msg:" Category status changed",
                                    status:1
                                })
                            }
                        ).catch(
                            (error)=>{
                                reject({
                                    msg:"Category status not change",
                                    status:0
                                  })
                            }
                        )
                  
                }catch (error) {
                    reject({
                        msg:"internal serevr error",
                        status:0
                      })
                }
            }
        )
    }
    changeSeller(category_id,new_status){
        return new Promise(
            (resolve,reject)=>{
                try {
                     Category.updateOne({_id:category_id},{best_seller:new_status})
                        .then(
                            (success)=>{
                                resolve({
                                    msg:" seller status changed",
                                    status:1
                                })
                            }
                        ).catch(
                            (error)=>{
                                reject({
                                    msg:"seller status not change",
                                    status:0
                                  })
                            }
                        )
                  
                }catch (error) {
                    reject({
                        msg:"internal serevr error",
                        status:0
                      })
                }
            }
        )
    }
}

module.exports= CategoryController;