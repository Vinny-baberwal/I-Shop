const express = require('express');
const UserController = require('../controllers/UserController');

const UserRouters = express.Router();



UserRouters.post(
  "/signup",
  (req,res)=>{
      const result = new UserController().signup(req.body);
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




UserRouters.post(
    "/login",
    (req,res)=>{
        const result = new UserController().login(req.body);
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


UserRouters.post(
  "/move-to-cart",
  (req,res)=>{
      const result = new UserController().moveToDBCart(req.body);
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
UserRouters.post(
  "/add-to-cart",
  (req,res)=>{
      const result = new UserController().addToDBCart(req.body);
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
UserRouters.post(
  "/add-address/:user_id",
  (req,res)=>{
    const result = new UserController().addAddress(req.params.user_id,req.body);
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

UserRouters.get(
  "/get-address/:user_id",
  (req, res) => {
    const result = new UserController().getAddress(req.params.user_id);
    result.then(
      (success) => {
        res.send(success);
      }
    ).catch(
      (error) => {
        res.send(error);
      }
    )
  }
)
 UserRouters.post(
  "/remove-from-cart",
  (req, res) => {
    const result = new UserController().removeFromCart(req.body);
    result.then(
      (success) => {
        res.send(success);
        }
        ).catch(
          (error) => {
            res.send(error);
            }
            )
            }
 )
 UserRouters.post(
  "/change-qty-increase",
  (req, res) => {
    const result = new UserController().changeQtyINC(req.body);
    result.then(
      (success) => {
        res.send(success);
        }
        ).catch(
          (error) => {
            res.send(error);
            }
            )
            }
 )
 UserRouters.post(
  "/change-qty-decrease",
  (req, res) => {
    const result = new UserController().changeQtyDESC(req.body);
    result.then(
      (success) => {
        res.send(success);
        }
        ).catch(
          (error) => {
            res.send(error);
            }
            )
            }
 )
module.exports =UserRouters;