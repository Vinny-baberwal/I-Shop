const express = require('express');
const OrderController = require('../controllers/OrderController');




const OrderRouters = express.Router();


OrderRouters.post(
    "/create",
    (req,res)=>{
        const result = new OrderController().create(req.body);
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
OrderRouters.post(
  "/payment-success",
  (req,res)=>{
    const result = new OrderController().paymentSuccess(req.body);
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
OrderRouters.post(
  "/payment-failed",
  (req,res)=>{
    const result = new OrderController().paymentFailed(req.body);
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

OrderRouters.get(
  "/:id?",
  (req,res)=>{
      const result = new OrderController().read(req.params.id);
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
 
OrderRouters.get(
'/total-orders-this-month',
(req,res)=>{
  const result = new OrderController().getTotalOrdersThisMonth();
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



// router.get( OrderController.getTotalOrdersThisMonth);
// router.get('/max-selling-product-orders', OrderController.getMaxSellingProductOrders);
module.exports = OrderRouters;