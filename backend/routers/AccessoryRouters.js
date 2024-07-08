const express = require('express');
const AccessoryController =require('../controllers/AccessoryController');
const fileUpload =require('express-fileupload')




const AccessoryRouters = express.Router();



AccessoryRouters.post(
    "/create",
    fileUpload(
      {
        createParentPath:true
      }
    ), // middelware work package for uppload image
          (req,res)=>{
            const result = new AccessoryController().create(req.body,req.files.image);
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


AccessoryRouters.get(
    "/:id?",
    (req,res)=>{
        const result = new AccessoryController().read(req.params.id);
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

AccessoryRouters.delete(
    "/delete/:accessory_id",
    (req,res)=>{
        const result = new AccessoryController().delete(req.params.accessory_id);
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


AccessoryRouters.put(
    "/update/:accessory_id",
    fileUpload(
      {
        createParentPath:true
      }
    ),
    (req,res)=>{
      const result = new AccessoryController().update(req.params.accessory_id,req.body,req.files?.image ??null );
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





module.exports = AccessoryRouters;