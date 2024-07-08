const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const CategoryRouters = require('./routers/CategoryRouter');
const ColorRouters = require('./routers/ColorRouters');
const ProductRouters = require('./routers/ProductRouters');
const AccessoryRouters =require('./routers/AccessoryRouters');
const UserRouters =require('./routers/UserRouters');
const OrderRouters = require('./routers/OrderRouters');
const AdminRouters = require('./routers/AdminRouter');
const { adminUth } = require('./middleware/adminAuth');


require('dotenv').config();



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"))
 




 
app.use("/category", CategoryRouters);
app.use("/product",   ProductRouters);
app.use("/color", ColorRouters);
app.use("/accessory", AccessoryRouters);
app.use("/user", UserRouters);
app.use("/order", OrderRouters);
app.use("/admin",AdminRouters)




mongoose.connect(
    process.env.MONGODB_URL,
    {
        dbname:process.env.DB_NAME
     
    }
).then(
    (success)=>{
        console.log("DB Cannected");
        app.listen(
            process.env.PORT,
            ()=>console.log("server chalu hau (-.-)")
        )
    }
).catch(
    (err)=>{
       console.log("server nahi rha (-.-)")
    }
)