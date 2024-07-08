const mongoose = require('mongoose');
 

const UserSchema = new mongoose.Schema(
    {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }, 
  contact_number: {
    type: String,
    default: null
  },
  address: {
    type: [
      {
        address: String,
        city: String,
        state: String,
        pincode: String,
        name:String,
        email:String,
        contact:String,
      },
      {_id:false}
    ],
    default: null 
  },
  status:{
    type:Boolean,
    default:true
}
});

const User = mongoose.model('User', UserSchema);
module.exports = User;