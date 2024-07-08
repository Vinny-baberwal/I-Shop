const mongoose  = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            maxlength:100,
        },
        slug:{
                type:String,
                maxlength:100, 
            },
            discription:{
              type:String,
              maxlength:5000,
            },
        original_price:{
              type:Number,
              min:1 
        },
        discount_percent:{
            type:Number,
            min:0,
            max:99 
        },
        final_price:{
            type:Number,
            min:1 
        },
        category_id:{
            type:mongoose.Schema.ObjectId,
            ref:"Category",
            min:1 
        },
       color_id:[{
            type:mongoose.Schema.ObjectId,
            ref:"Color",
            
        }],
        accessory_id:[{
            type:mongoose.Schema.ObjectId,
            ref:"Accessory"
          }],
        image:{
            type:String, 
        },
        other_image:[
            {
            type:String
        }
        ],
        status:{
            type:Boolean,
            default:true
        },
        best_seller:{
            type:Boolean,
            default:false
        }
        
    },
    {
        timestamps:true
    }
)

const Product = mongoose.model("Product",ProductSchema);

module.exports=Product;