const express = require('express');
const AdminController = require('../controllers/AdminController');




const AdminRouters = express.Router();


AdminRouters.post(
"/signup",
  (req,res)=>{
      const result = new AdminController().signup(req.body);
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
 
AdminRouters.post(
    "/login",
    (req,res)=>{
        const result = new AdminController().login(req.body);
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



module.exports = AdminRouters;