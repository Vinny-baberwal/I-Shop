const mongoose  = require("mongoose")

const CategorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            maxlength:100,
        },
        slug:{
                type:String,
                maxlength:100, 
            },
        image_name:{
            type:String, 
        },
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

const Category = mongoose.model("Category",CategorySchema);

module.exports=Category;