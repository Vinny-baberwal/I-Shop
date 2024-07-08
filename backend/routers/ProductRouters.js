const express = require('express');
const ProductController = require('../controllers/ProductController');
const fileUpload= require('express-fileupload');


const ProductRouters = express.Router();


ProductRouters.post(
    "/create",
    fileUpload(
        {
            createParentPath:true
        }
    ),
    (req,res)=>{
        const result = new ProductController().create(req.body,req.files.image??null,req.files.other_image);
        result.then(
          (success)=>{
          res.send(success);
          }
        ).catch(
        (error)=>{
         res.send(error);
        }
        )
    }
)
ProductRouters.get(
  "/best-seller/",
  (req,res)=>{
      const result = new ProductController().best_seller();
      result.then(
          (success)=>{
          res.send(success);
          }
        ).catch(
        (error)=>{
         res.send(error);
        }
        )
  }
)

ProductRouters.get(
    "/:id?",
    (req,res)=>{
        const result = new ProductController().read(req.params.id,req.query);
        result.then(
            (success)=>{
            res.send(success);
            }
          ).catch(
          (error)=>{
           res.send(error);
          }
          )
    }
)


ProductRouters.delete(
    "/delete/:product_id",
    (req,res)=>{
        const result = new ProductController().delete(req.params.product_id);
        result.then(
          (success)=>{
          res.send(success);
          }
        ).catch(
        (error)=>{
         res.send(error);
        }
        )
    }
)


ProductRouters.put(
    "/update/:product_id",
    fileUpload(
        {
          createParentPath:true
        }
      ),
      (req,res)=>{
        const result = new ProductController().update(req.params.product_id,req.body,req.files?.image ??null );
        result.then(
            (success)=>{
            res.send(success);
            }
          ).catch(
          (error)=>{
           res.send(error);
          //  console.log(error)
          }
          )
      }
)

ProductRouters.put(
  "/change-status/:product_id/:new_status",
  (req,res)=>{
    const result = new ProductController().changeStatus(req.params.product_id , req.params.new_status)
    result.then(
        (success)=>{
        res.send(success);
        }
      ).catch(
      (error)=>{
       res.send(error);
      //  console.log(error)
      }
      )
  }
)
ProductRouters.put(
  "/best-seller/:product_id/:new_status",
  (req,res)=>{
    const result = new ProductController().changeSeller(req.params.product_id , req.params.new_status)
    result.then(
        (success)=>{
        res.send(success);
        }
      ).catch(
      (error)=>{
       res.send(error);
      //  console.log(error)
      }
      )
  }
)





module.exports = ProductRouters;