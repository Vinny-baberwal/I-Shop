const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 

// Define the Transaction schema
const TransactionSchema = new Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: 'User'   },
  order_id: { type:mongoose.Schema.ObjectId, ref: 'Order' },
  razorpay_order_id: { type: String, required: true },
  razorpay_payment_id: { type: String, required: true },
  payment_status: { type: Boolean,  required: true },
  amount: { type: Number, required: true }
},
{
    timestamps: true
});

 
const Transaction = mongoose.model('Transaction', TransactionSchema);

// Export the models
module.exports =  Transaction 
