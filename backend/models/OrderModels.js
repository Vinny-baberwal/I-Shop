const mongoose  = require("mongoose")
const Schema = mongoose.Schema;
// Define the product details schema
const productDetailsSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
    // Add other product details if needed
},{_id:false});

// Define the shipping details schema
const shippingDetailsSchema = new Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    contact: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    // Add other shipping details if needed
},{_id:false});

// Define the order schema
const OrderSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product_details: { type: [productDetailsSchema], required: true },
    order_total: { type: Number, required: true },
    processing_fee: { type: Number, required: true },
    payment_mode: { type: Number, enum: [0, 1], required: true }, // 0 for online, 1 for COD
    razorpay_order_id: { type: String, default: null },
    razorpay_payment_id: { type: String, default: null },
    order_status: { 
        type: Number, 
        enum: [0, 1, 2, 3, 4, 5, 6], 
        default: 0, 
        required: true 
    }, // Enum for order status
    shipping_details: { type: shippingDetailsSchema, required: true },
}, { timestamps: true });

  

const Order = mongoose.model("Order",OrderSchema);

module.exports=Order;