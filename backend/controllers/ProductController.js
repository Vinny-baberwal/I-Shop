const Product = require("../models/ProductModels");
const Category = require("../models/CategoryModels");
const Color = require("../models/ColorModels");
const { unlinkSync } = require('fs');
const { escape } = require("querystring");



class ProductController {
    create(data, image, other_image) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const imageName = new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
                    const destination = "./public/image/product/" + imageName;
                    const otherImagesName = [];//single image is not going on data base*
                    image.mv(
                        destination,
                        async (error) => {
                            if (error) {
                                reject(
                                    {
                                        msg: "unable to upload image",
                                        status: 0
                                    }
                                )
                            } else {
                                if (!Array.isArray(other_image)) {
                                    const otherimg_name = new Date().getTime() + (Math.random() * 1000) + other_image.name
                                    const otherimg_destination = "./public/image/product/" + otherimg_name;

                                    other_image.mv(
                                        otherimg_destination,
                                        (err) => {
                                            if (err) {
                                                reject({
                                                    msg: "unabale to upload image"
                                                })
                                            }
                                            else {
                                                otherImagesName.push(otherimg_name)

                                                const product = new Product({
                                                    name: data.name,
                                                    slug: data.slug,
                                                    image: imageName,
                                                    original_price: data.original_price,
                                                    discount_percent: data.discount_percent,
                                                    final_price: data.final_price,
                                                    discription:data.discription,
                                                    category_id: data.category_id,
                                                    color_id: JSON.parse(data.color_id),
                                                    accessory_id: JSON.parse(data.accessory_id),
                                                    other_image:otherImagesName
                                                })
                                                product.save()
                                                    .then(
                                                        (succes) => {
                                                            console.log(succes);
                                                            resolve({
                                                                msg: "product created",
                                                                status: 1
                                                            })
                                                        }
                                                    )
                                                    .catch(
                                                        (error) => {
                                                            console.log(error);
                                                            reject({
                                                                msg: "unbale to created product",
                                                                status: 0
                                                            })
                                                        }
                                                    )
                                            }
                                        }
                                    )
                                }
                                else {
                                    const movePromises = other_image?.map(async (otImag) => {
                                        const otherimg_name = new Date().getTime() + (Math.random() * 1000) + otImag.name
                                        const otherimg_destination = "./public/image/product/"+ otherimg_name;
                                        try {
                                            await otImag.mv(otherimg_destination)
                                            otherImagesName.push(otherimg_name)
                                        }
                                        catch (error) {
                                            reject({
                                                msg: "unable to uplod image"
                                            })
                                        }
                                    })

                                    await Promise.all(movePromises);

                                    const product = new Product(
                                        {
                                            name: data.name,
                                            slug: data.slug,
                                            image: imageName,
                                            original_price: data.original_price,
                                            discount_percent: data.discount_percent,
                                            final_price: data.final_price,
                                            discription:data.discription,
                                            category_id: data.category_id,
                                            color_id: JSON.parse(data.color_id),
                                            accessory_id: JSON.parse(data.accessory_id),
                                            other_image:otherImagesName
                                        }
                                    )
                                    product.save()
                                        .then(
                                            (succes) => {
                                                console.log(succes);
                                                resolve({
                                                    msg: "product created",
                                                    status: 1
                                                })
                                            }
                                        )
                                        .catch(
                                            (error) => {
                                                console.log(error);
                                                reject({
                                                    msg: "unbale to created product",
                                                    status: 0
                                                })
                                            }
                                        )
                                }



                            }

















                            //     if(Array.isArray(other_image)){
                            //         // const movePromise = Promise.all(
                            //         //     other_image.map(async (image) => {
                            //         //         const imgName = new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
                            //         //         const ImgDestination = "./public/image/product/" + imgName;
                            //         //         try {
                            //         //             await image.mv(ImgDestination);
                            //         //             otherImageName.push(imgName);
                            //         //         } catch (error) {
                            //         //             // Throw the error or return a rejected promise
                            //         //             reject( {
                            //         //                 msg: "Unable to upload multiple images",
                            //         //                 status: 0
                            //         //             });
                            //         //         }
                            //         //     })
                            //         // );

                            //         // Handle the promises
                            //         // movePromise
                            //         //     .then(() => {
                            //         //         // All images moved successfully
                            //         //         console.log("All images moved successfully");
                            //         //     })
                            //         //     .catch((error) => {
                            //         //         // Handle errors from any of the promises
                            //         //         console.error(error);
                            //         //     });









                            //         const movePromise=other_image?.map(
                            //           async (image)=>{

                            //                 const imgName =new Date().getTime()+ Math.floor(Math.random()*1000)+image.name; 
                            //                 const ImgDestination = "./public/image/product/"+imgName;
                            //                 try {
                            //                    await image.mv(ImgDestination)
                            //                     otherImageName.push(imgName)
                            //                 } catch (error) {
                            //                     reject(
                            //                         {
                            //                             msg:"unable to upload mutiple image",
                            //                             status:0
                            //                         }
                            //                      )
                            //                 }
                            //             }
                            //         )
                            //      await Promise.all(movePromise);
                            //         const product =new Product({
                            //              name:data.name ,
                            //               slug:data.slug,
                            //               image:imageName,
                            //               original_price:data.original_price,
                            //               discount_percent:data.discount_percent,
                            //               final_price:data.final_price,
                            //               product_id:data.product_id,
                            //               color_id:JSON.parse(data.color_id),
                            //               accessory_id:data.accessory_id,
                            //               other_image:otherImageName
                            //         });
                            //         product.save()
                            //         .then(
                            //             (success)=>{
                            //               resolve({
                            //                 msg:"product created",
                            //                 status:1
                            //               })
                            //             }
                            //         ).catch(
                            //             (error)=>{
                            //                 reject({
                            //                     msg:"unable to create product",
                            //                     status:0
                            //                   })
                            //             }
                            //         )
                            //     }
                            //    else{
                            //     const otherImage = new Date().getDate()+(Math.random()*1000)+other_image.name;
                            //     const otherDestination ="./public/image/product/"+otherImage;
                            //     other_image.mav(
                            //         otherDestination,
                            //         (error)=>{
                            //             if(error){
                            //                 reject({
                            //                     msg:"unable to upload image",
                            //                     status:0
                            //                 })
                            //             }else{
                            //                 otherImageName.push(otherImage);
                            //                 const product =new Product({
                            //                     name:data.name ,
                            //                      slug:data.slug,
                            //                      image:imageName,
                            //                      original_price:data.original_price,
                            //                      discount_percent:data.discount_percent,
                            //                      final_price:data.final_price,
                            //                      product_id:data.product_id,
                            //                      color_id:JSON.parse(data.color_id),
                            //                      accessory_id:data.accessory_id,
                            //                      other_image:otherImageName
                            //                });
                            //                product.save()
                            //                .then(
                            //                    (success)=>{
                            //                      resolve({
                            //                        msg:"product created",
                            //                        status:1
                            //                      })
                            //                    }
                            //                ).catch(
                            //                    (error)=>{
                            //                        reject({
                            //                            msg:"unable to create product",
                            //                            status:0
                            //                          })
                            //                    }
                            //                ) 
                            //             }
                            //         }
                            //     )
                            //    }



                        }
                    )

                } catch (error) {
                    reject({
                        msg: "internal serevr error",
                        status: 0
                    })
                }
            }
        )

    }
    read(id,query) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    // if (id) {
                    //   const  product = await Product.findById(id).populate(['product_id','color_id']);
                    //     resolve(
                    //         {
                    //             msg: "Data found",
                    //             status: 1,
                    //             product
                    //             // imageBaseUrl: "/images/category/"
                    //         }
                    //     )
                    // } else {
                    //    const products = await Product.find().populate(['product_id','color_id'])  ;
                    //     resolve(
                    //         {
                    //             msg: "Data found",
                    //             products,
                    //             status: 1,
                    //             // imageBaseUrl: "/images/category/"
                    //         }
                    //     )
                    // }


                    // let data = "";
                    if (id) {
                       const data = await Product.findById(id).populate(['category_id', 'color_id', 'accessory_id']);
                       resolve(
                        {
                            msg: "Data found",
                            product: data,
                            status: 1,
                            // imageBaseUrl: "/images/category/"
                        }
                    )
                    } else {
                        const  filter ={}
                        if(query.category_slug){
                            const cat = await Category.findOne({slug:query.category_slug});
                            if(cat!=null){
                                filter.category_id=cat._id
                            }
                        }
                        if(query.range_start && query.range_end){
                            filter.final_price={
                                "$gte":Number(query.range_start),
                                "$lte":Number(query.range_end)
                            }
                        }
                        if(query.color_name){
                            const col = await Color.findOne({name:query.color_name});
                            if(col!=null){
                                filter.color_id=col._id
                                // console.log(color_id,"5555555555")
                            }
                        }
                     const   data = await Product.find(filter).populate(['category_id', 'color_id', 'accessory_id']).limit(query.limit??0);
                     resolve(
                        {
                            msg: "Data found",
                            products: data,
                            status: 1,
                            // imageBaseUrl: "/images/category/"
                        }
                    )
                    }
                    
                    // const products = await Product.find();
                    // resolve({
                    //     msg:products.length+"data found",
                    //     status:1,
                    //     products
                    //   })
                } catch (error) {
                    reject({
                        msg: "internal serevr error",
                        status: 0
                    })
                }
            }
        )

    }
    delete(product_id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const dltProduct = await Product.findById(product_id);
                    const image = dltProduct.other_image?.map(
                        (oi) => oi
                    )

                    if (dltProduct) {
                        unlinkSync("./public/image/product/" + dltProduct.image);

                        // unlinkSync("./public/image/product/"+ image);

                        // console.log(dltProduct.other_image,"0000..0...000.00.0.0.0.");
                        // // req.send("")
                        // return

                        Product.deleteOne({ _id: product_id })
                            .then(
                                (success) => {
                                    resolve({
                                        msg: " Product item deleted successfull",
                                        status: 1,
                                    })
                                }
                            ).catch(
                                (error) => {
                                    reject({
                                        msg: "Product already deleted",
                                        status: 0
                                    })
                                }
                            )

                    } else {
                        reject({
                            msg: "Product not foundddddd",
                            status: 0
                        })
                    }

                } catch (error) {
                    console.log(error)
                    reject({
                        msg: "internal serevr error",
                        status: 0
                    })
                }
            }
        )


    }
    update(product_id, data, image) {
        return new Promise(
            (resolve, reject) => {
                try {
                    if (image == null) {
                        Product.updateOne({ _id: product_id }, {
                            name: data.name,
                            slug: data.slug,
                            discription:data.discription,
                            original_price: data.original_price,
                            discount_percent: data.discount_percent,
                            final_price: data.final_price,
                            category_id: data.category_id,
                            accessory_id: JSON.parse(data.accessory_id),
                            color_id: JSON.parse(data.color_id)
                        })
                            .then(
                                () => {
                                    resolve({
                                        msg: "Data Updated",
                                        status: 1
                                    })
                                }
                            ).catch(
                                () => {
                                    reject({
                                        msg: "data did not update",
                                        status: 0
                                    })
                                }
                            )
                    } else {
                        const imageName = new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
                        const destination = "./public/image/product/" + imageName;
                        image.mv(
                            destination,
                            (error) => {
                                if (error) {
                                    reject(
                                        {
                                            msg: "unable to upload image",
                                            status: 0
                                        }
                                    )
                                } else {
                                    unlinkSync("./public/image/product/" + data.old_image);
                                    Product.updateOne(
                                        { _id: product_id },
                                        {
                                            name: data.name,
                                            slug: data.slug,
                                            discription:data.discription,
                                            image: imageName,
                                            original_price: data.original_price,
                                            discount_percent: data.discount_percent,
                                            final_price: data.final_price,
                                            category_id: data.category_id,
                                            accessory_id: JSON.parse(data.accessory_id),
                                            color_id: JSON.parse(data.color_id)
                                        }
                                    ).then(
                                        (success) => {
                                            resolve({
                                                msg: "Data updated with image",
                                                status: 1
                                            })
                                        }
                                    ).catch(
                                        (error) => {
                                            reject({
                                                msg: "unable to update kyuu  data ",
                                                status: 0
                                            })
                                        }
                                    )

                                }
                            }
                        )

                    }
                } catch (error) {
                    // console.log(error,"{}")
                    reject({
                        msg: "internal server error ",
                        status: 0
                    })
                }
            }
        )

    }
    changeStatus(product_id,new_status){
        return new Promise(
            (resolve,reject)=>{
                try {
                     Product.updateOne({_id:product_id},{status:new_status})
                        .then(
                            (success)=>{
                                resolve({
                                    msg:" Product status changed",
                                    status:1
                                })
                            }
                        ).catch(
                            (error)=>{
                                reject({
                                    msg:"Product status not change",
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
    changeSeller(product_id,new_status){
        return new Promise(
            (resolve,reject)=>{
                try {
                     Product.updateOne({_id:product_id},{best_seller:new_status})
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
    best_seller(){
        return new Promise(
             async (resolve,reject)=>{
                try {
                  const bestSeller= await Product.find({best_seller:true}).populate(['category_id', 'color_id', 'accessory_id'])
                   if(bestSeller){
                    resolve({
                        msg: "best seller found",
                        status:1,
                        bestSeller
                    })
                   }else{
                    reject({
                        msg:"best seller not found",
                        status:0
                    })
                   }
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

module.exports = ProductController;