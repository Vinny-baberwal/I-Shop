const mongoose = require('mongoose');
 

const AdminSchema = new mongoose.Schema(
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
  is_super:{
   type:Boolean,
   default:false
  },
  status:{
    type:Boolean,
    default:true
}
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;