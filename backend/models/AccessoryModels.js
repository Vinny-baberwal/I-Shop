const mongoose  = require("mongoose")

const AccessorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            maxlength:100,
        },
        slug:{
                type:String,
                maxlength:100, 
            },
        image:{
            type:String, 
        },
        price:{
          type:Number
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

const Accessory = mongoose.model("Accessory",AccessorySchema);

module.exports=Accessory;