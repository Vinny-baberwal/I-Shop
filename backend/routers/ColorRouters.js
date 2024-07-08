const express = require('express');
const ColorController = require('../controllers/ColorController');




const ColorRouters = express.Router();


ColorRouters.post(
    "/create",
    (req,res)=>{
        const result = new ColorController().create(req.body);
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


ColorRouters.get(
    "/:id?",
    (req,res)=>{
        const result = new ColorController().read(req.params.id);
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

ColorRouters.delete(
    "/delete/:color_id",
    (req,res)=>{
        const result = new ColorController().delete(req.params.color_id);
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


ColorRouters.put(
    "/update/:id",
    (req,res)=>{

    }
)





module.exports = ColorRouters;