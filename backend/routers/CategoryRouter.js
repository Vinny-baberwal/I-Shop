const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const fileUpload= require('express-fileupload');


const CategoryRouters = express.Router();


CategoryRouters.post(
    "/create",
    fileUpload(
      {
        createParentPath:true
      }
    ), // middelware work package for uppload image
    (req,res)=>{
      const result = new CategoryController().create(req.body,req.files.image);
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


CategoryRouters.get(
    "/:id?",
    (req,res)=>{
        const result = new CategoryController().read(req.params.id);
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

CategoryRouters.delete(
    "/delete/:category_id",
    (req,res)=>{
      const result = new CategoryController().delete(req.params.category_id);
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


CategoryRouters.put(
    "/update/:category_id",
    fileUpload(
      {
        createParentPath:true
      }
    ),
    (req,res)=>{
      const result = new CategoryController().update(req.params.category_id,req.body,req.files?.image ??null );
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

CategoryRouters.put(
  "/change-status/:category_id/:new_status",
  (req,res)=>{
    const result = new CategoryController().changeStatus(req.params.category_id , req.params.new_status)
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
CategoryRouters.put(
  "/best-seller/:category_id/:new_status",
  (req,res)=>{
    const result = new CategoryController().changeSeller(req.params.category_id , req.params.new_status)
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




module.exports = CategoryRouters;