import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import WebsiteMain from './Pages/Website/WebsiteMain';
import AdminMain from './Pages/Admin/AdminMain';
import Home from './Pages/Website/Home';
import Dashboard from './Pages/Admin/Dashboard';
import CategoryAdd from './Pages/Admin/category/Add';
import CategoryView from './Pages/Admin/category/View';
import CategoryEdit from './Pages/Admin/category/Edit';
import AccessoryAdd from './Pages/Admin/accessory/Add';
import AccessoryView from './Pages/Admin/accessory/View';
import AccessoryEdit from './Pages/Admin/accessory/Edit';
import ColorAdd from './Pages/Admin/color/Add';
import ColorView from './Pages/Admin/color/View';
import ProductAdd from './Pages/Admin/product/Add';
import ProductView from './Pages/Admin/product/View';
import ProductEdit from './Pages/Admin/product/Edit';
import OrderView from './Pages/Admin/OrderView';
import Transaction from './Pages/Admin/Transaction';
import User from './Pages/Admin/User';
import Store from './Pages/Website/Store';
import Iphone from './Pages/Website/Iphone';
import Ipad from './Pages/Website/Ipad';
import MacBook from './Pages/Website/MacBook'; 
import Accessories from './Pages/Website/Accessories';
import Cart from './Pages/Website/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { lsToCart } from './reducer/CartSlice';
import Login from './Pages/Website/Login';
import Signup from './Pages/Website/Signup';
import ProductDetails from './Components/Website/ProductDetails'; 
import { lsToUser } from './reducer/UserSlice';
import CheckOut from './Pages/Website/CheckOut';
import ThankYou from './Pages/Website/ThankYou';
import AdLogin from './Pages/Admin/AdLogin';
import AdminAdd from './Pages/Admin/admin/Add';
import AdminView from './Pages/Admin/admin/View';
import AdSignup from './Pages/Admin/AdSignup';






function App() {
const cartData=useSelector(store=>store.cart);
const dispatcher =useDispatch();




useEffect(
  ()=>{
 dispatcher(lsToCart());
 dispatcher(lsToUser())
//  dispatcher(lsToUser()); 
  },[]
)
useEffect(
  ()=>{
  localStorage.setItem("cartData", JSON.stringify(cartData));
  },[cartData]
)





  const routes = createBrowserRouter(
    [
      {
        path:"/",
        element:<WebsiteMain/>,
        children:[
          {
            path:"",
            element:<Home/>
          },
          {
            path:"store/:category_slug?",
            element:<Store/>
          },
          {
            path:"iphone",
            element:<Iphone/>
          },
          {
            path:"ipad",
            element:<Ipad/>
          },
          {
            path:"macbook",
            element:<MacBook/>
          },
          {
            path:"accessories",
            element:<Accessories/>
          },
          {
            path:"cart",
            element:<Cart/>
          },
          {
            path:"product-details/:id",
            element:<ProductDetails/>
          },
          {
            path:"checkout",
            element:<CheckOut/>
          }
         
        ]
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<Signup/> 
      },
      {
        path:"/thanks-you/:id?",
        element:<ThankYou/>
      },
   


      // admin part---------------------------
      {
        path:"/admin",
        element:<AdminMain/>,
        children:[
          {
           path:"",
           element:<Dashboard/>
          },
          {
            path:"category",
            children:[
              {
                path:"add",
                element:<CategoryAdd/>
              },
              {
                path:"view",
                element:<CategoryView/>
              },
              {
                path:"edit/:id",
                element:<CategoryEdit/>
              }
            ]
          },
          {
            path:"accessory",
            children:[
              {
                path:"add",
                element:<AccessoryAdd/>
              },
              {
                path:"view",
                element:<AccessoryView/>
              },
              {
                path:"edit/:id",
                element:<AccessoryEdit/>
              }
            ]
          },
          {
            path:"color",
            children:[
              {
                path:"add",
                element:<ColorAdd/>
              },
              {
                path:"view",
                element:<ColorView/>
              }
            ]
          },
          {
            path:"product",
            children:[
              {
                path:"add",
                element:<ProductAdd/>
              },
              {
                path:"view",
                element:<ProductView/>
              },
              {
                path:"edit/:id",
                element:<ProductEdit/>
              }
            ]
          },
          {
            path:"Order-view",
            element:<OrderView/>
          },
          {
            path:"transaction",
            element:<Transaction/>
          },
          {
            path:"user",
            element:<User/>
          },
          {
            path:"admin-user",
            children:[
              {
                path:"add",
                element:<AdminAdd/>
              },
              {
                path:"view",
                element:<AdminView/>
              }
            ]
          },
        ]
      },
      {
        path:"/admin/login",
        element:<AdLogin/>
      },
      {
        path:"/admin/signup",
        element:<AdSignup/>
      }
    ]
  )
  return (
   <RouterProvider router={routes}/>
   
  )
}

export default App
