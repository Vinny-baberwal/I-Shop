const Cart = require("../models/CartModels");
const Order = require("../models/OrderModels"); 
const Razorpay =require('razorpay');
const crypto = require('crypto');
const Transaction = require("../models/TransactonsModels");

const instance = new Razorpay({
    // key_id: `${process.env.RAZORPAY_KEY_ID}`, 
    key_id: "rzp_test_oSePPAlQyWK8qd", 
    key_secret: "Dsp2U1cEVawTkvam3dM7ioDL",
  });



class OrderController{


     generateSignature(razorpay_order_id, razorpay_payment_id,razorpay_signature, secret=process.env.RAZORPAY_SECRET_KEY) {
  const data = `${razorpay_order_id}|${razorpay_payment_id}`;

  const generated_signature = crypto
               .createHmac('sha256', secret)
               .update(data)
               .digest('hex');

 

// Verify the signature
if (generated_signature === razorpay_signature) {
  console.log('Payment is successful');
  return true;
} else {
  console.log('Payment verification failed');
  return false;
}
     }
    // --------
    create(data){
        return new Promise(
         async (resolve,reject)=>{
                try {
                   const userCart= await Cart.find({user_id:data.user_id}).populate(['product_id']);
                   const product_details =[];
                   let order_total =0;
                   for( let uc of userCart)
                  { product_details.push(
                    {
                        product_id:uc.product_id._id,
                        qty:uc.qty,
                        price:uc.product_id.final_price,
                        total:uc.product_id.final_price*uc.qty
                    }
                   )
                //    order_total += product_details.total; //try krna h ye hota h ya nhi 
                   order_total +=uc.product_id.final_price*uc.qty ;
                   }
                // console.log(order_total,"><??<>")
                // console.log(product_details)
                // console.log(userCart)
                // return
                const order = new Order({
                    user_id:data.user_id,
                    payment_mode:data.payment_mode,
                    shipping_details:data.shipping_details,
                    product_details:product_details,
                    order_total:order_total,
                    processing_fee:data.payment_mode==1?50:0
                })
                order.save()
                .then(
                   async (success)=>{
                    if(order.payment_mode==1){
                        resolve(
                            {
                                msg:"Order created successfully",
                                status:1,
                                order_id:order._id
                            }
                        )
                    }else{
                   //    create order in razorpay server
                   const paymentOptions = {
                    amount: order.order_total*100, // amount in the smallest currency unit
                    currency: "INR",
                    receipt: order._id,
                    // payment_capture: 1
                    };
                    // console.log(paymentOptions)
                    instance.orders.create(paymentOptions,
                        (error,razorpay_order)=>{
                           if(error){
                            // console.log(error)
                            reject(
                                {
                                    msg:"Error in initate  payment",
                                    status:0,
                                    order_id:order._id

                                }
                            )
                           }else{
                            resolve(
                                {
                                    msg:"Order created successfully",
                                    status:1,
                                    order,
                                    razorpay_order 
                                    }
                            )
                           }
                        }
                    )                          
                    }
                     await Cart.deleteMany({user_id:data.user_id});
                      
                    }
                ).catch(
                    (error)=>{
                        console.log(error)
                        reject(
                            {
                                msg:"unable to create order",
                                status:0
                            }
                        )
                    }
                )
                   } catch (error) {
                    console.log(error)
                    reject({
                        msg:"internal serevr error",
                        status:0
                      })
                   }
            }
        )
    
    }
    paymentSuccess(data){
        return new Promise(
            async(resolve,reject)=>{
           try {
            if(this.generateSignature(data.razorpay_order_id,data.razorpay_payment_id,data.razorpay_signature)){
              Order.updateOne({_id:data.order_id},
                {
                    razorpay_order_id:data.razorpay_order_id,
                    razorpay_payment_id:data.razorpay_payment_id,
                    order_status:1
                }
              ).then(
                (success)=>{
              const transactions = new Transaction(
                {
                    user_id:data.user_id,
                    razorpay_order_id:data.razorpay_order_id,
                    razorpay_payment_id:data.razorpay_payment_id,
                    payment_status:1,
                    amount:data.amount

                }
              )
              transactions.save()
              .then(
                (success)=>{
                    resolve({
                        msg:"payment successfull",
                        status:1,
                        order_id:data.order_id,
                        transaction_id:transactions._id,
                        payment_status:1
                        })
                        }
              ).catch(
                (error)=>{
                    console.log(error)
                    reject({
                        msg:"internal server error",
                        status:0
                        })
                        }
              )
                }
              ).catch(
                (error)=>{

                }
              )
            }else{
                reject({
                    msg:"Invalid signature",
                    status:0
                    })
            }

           }catch(error){
            console.log(error)
            reject({
                msg:"internal server error",
                status:0
           })
           }
        })
    }
    paymentFailed(data){
        return new Promise(
            async(resolve,reject)=>{
           try {
            
              Order.updateOne({_id:data.order_id},
                {
                    razorpay_order_id:data.order_id,
                    razorpay_payment_id:data.payment_id,
                    order_status:0
                }
              ).then(
                (success)=>{
              const transactions = new Transaction(
                {
                    user_id:data.user_id,
                    razorpay_order_id:data.order_id,
                    razorpay_payment_id:data.payment_id,
                    payment_status:0,
                    amount:data.amount

                }
              )
              transactions.save()
              .then(
                (success)=>{
                    resolve({
                        msg:"payment failed",
                        status:1,
                        order_id:data.order_id,
                        transaction_id:transactions._id,
                        payment_status:0
                        })
                        }
              ).catch(
                (error)=>{
                    console.log(error)
                    reject({
                        msg:" chutiyapa server error",
                        status:0
                        })
                        }
              )
                }
              ).catch(
                (error)=>{
                console.log(error)
                reject({
                    msg:"internal ka maa ka boasdaa server error",
                    status:0
                    })
                    
                }
              )
           }catch(error){
            console.log(error)
            reject({
                msg:"internal server error",
                status:0
           })
           }
        })
    }
    read(id){
      return new Promise(
          async (resolve,reject)=>{
               try {
                  let data = "";
                  if (id) {
                      data = await Order.findById(id);
                  } else {
                      data = await Order.find();
                  }
                  resolve(
                      {
                          msg: "Data found",
                          order: data,
                          status: 1,
                          // imageBaseUrl: "/images/category/"
                      }
                  )
                  //  const accessories = await Order.find();
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
  // ------------------------
 

 getTotalOrdersThisMonth() {
    return new Promise(
        async (resolve,reject)=>{
            try {
                const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
            const order = await Order.find()
            if(order){
                const totalOrdersThisMonth = await Order.aggregate([
                    { $match: { createdAt: { $gte: startOfMonth, $lt: endOfMonth } } },
                    { $count: 'totalOrders' }
                ]);
            }
               
            
             resolve({
                msg: "Total orders this month",
                totalOrdersThisMonth: totalOrdersThisMonth[0].totalOrders,
                status: 1
                })
                
            } catch (error) {
                reject({
                    msg:"internal serevr error",
                    status:0
                    })
            }
         }
     )
}

static async getMaxSellingProductOrders(req, res) {
    try {
        const maxSellingProduct = await Order.aggregate([
            { $unwind: '$product_details' },
            { $group: { _id: '$product_details.product_id', totalOrders: { $sum: '$product_details.qty' } } },
            { $sort: { totalOrders: -1 } },
            { $limit: 1 }
        ]);

        if (!maxSellingProduct[0]) {
            return res.json({ maxSellingProductOrders: 0, maxSellingProductName: null });
        }

        const productDetails = await Product.findById(maxSellingProduct[0]._id);

        res.json({
            maxSellingProductOrders: maxSellingProduct[0].totalOrders,
            maxSellingProductName: productDetails.name
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

static async getOrdersData(req, res) {
    try {
        const totalOrdersThisMonth = await OrderController.getTotalOrdersThisMonth(req, res);
        const maxSellingProductOrders = await OrderController.getMaxSellingProductOrders(req, res);

        res.json({
            totalOrdersThisMonth,
            maxSellingProductOrders
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


  // ===========================
}

module.exports= OrderController;