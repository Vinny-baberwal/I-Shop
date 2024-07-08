const mongoose  = require("mongoose")

const ColorSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            maxlength:100,
        },
        
       code:{
           type:String,
       },
        status:{
            type:Boolean,
            default:true
        },
        
    },
    {
        timestamps:true
    }
)

const Color = mongoose.model("Color",ColorSchema);

module.exports=Color;