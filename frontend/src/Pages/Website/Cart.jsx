import React, { useContext, useEffect, useState } from 'react'
import Container from '../../Components/Container'
import { useDispatch, useSelector } from 'react-redux';
import { Context } from '../../Context/MainContext';
import { changeQty, removeFormCart } from '../../reducer/CartSlice';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cart() {
    const [cartItem,setCartItem]=useState([]);
 const {cart,total}=useSelector(store=>store.cart);
 const user = useSelector(store=>store.user);
 const {productData,apiBaseUrl,fatchProducts ,notify}=useContext(Context);
const navigator =useNavigate();

// console.log(user,"{}{}{}{}{}")
// console.log(cart,"{}{0000000000000000000}{}{}{}")
 const Checkout =()=>{
  if(user.data ==null){
    navigator("/login")
  }else{
    navigator("/checkout")
  }
 }




 
 useEffect(
  ()=>{
 fatchProducts();
  },[]
 )
 

 useEffect(
    ()=>{
      const data =[]
      if(user.data){
  
        for(let c of cart){
          const found = productData.find(prod=>prod._id==c.pId);
          if(found){
              data.push({
                  ...found,
                  qty:c.qty
              })
          }
          // console.log(data)
      
      }
      }else{
  
        for(let c of cart){
          const found = productData.find(prod=>prod._id==c.pId);
          if(found){
              data.push({
                  ...found,
                  qty:c.qty
              })
          }
          // console.log(data)
      
      }
      }
  
        setCartItem(data)  
    },[cart,productData]
 )


 

 

  return (
    <>
    <Container>
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-medium mb-4">Your Cart</h2>
      {cart?.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is currently empty.</p>
      ) : (
        <div>
          {cartItem.map((item) => (
            <CartItems key={item.id} {...item} apiBaseUrl={apiBaseUrl} notify={notify}  />
          ))}
          <div className="flex justify-end mt-4">
            <button onClick={Checkout} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Checkout
            </button>
          </div>
          <div>$ {~~total}</div>

        </div>
      )}
    </div>
  
    </Container>
    </>
  )
}

const CartItems = ({_id:product_id, image,name ,final_price, qty,apiBaseUrl ,notify}) => {
 const user = useSelector(store=>store.user);
 const {cart,total} = useSelector(store=>store.cart);

 const dispatcher =useDispatch();
// console.log(item)

 

const deleteCart =({pId:product_id, total_price: final_price ,qty:qty})=>{
  if(user.data==null){ 
    dispatcher(removeFormCart({pId:product_id, total_price: final_price*qty}))

  }else{
    axios.post(`${apiBaseUrl}/user/remove-from-cart`,{
      user_id:user.data._id,
      cartData: {pId:product_id, qty:qty,price:final_price},
       
      })
    .then(
      (success)=>{
        // console.log(success.data,"oooooooooooooooo")
        if(success.data.status==1){
          dispatcher(removeFormCart({pId:product_id, total_price:success.data.cartData.price}))

        }else{

        }
        notify(success.data.msg,success.data.status);
      }
    )
  }
}

const INCqtyhandler=()=>{
  if(user.data ==null){ 
    dispatcher(changeQty({price:final_price,pId:product_id, new_qty: qty+1, flag:true})) 


  }else{
    axios.post(`${apiBaseUrl}/user/change-qty-increase`,{
      user_id:user.data._id,
      cartData: {pId:product_id, qty:1,price:final_price},
       
      }).then(
        (success)=>{
          dispatcher(changeQty({price:final_price,pId:product_id, new_qty: qty+1, flag:true})) 
        //  notify(success.data.msg,success.data.status);
        }
      ).catch(
        (error)=>{
          console.log(error)
        }
      )
  }
}
const DESCqtyhandler=()=>{
  if(user.data ==null){  
    dispatcher(changeQty({price:final_price,pId:product_id, new_qty: qty-1, flag:false}))


  }else{
    axios.post(`${apiBaseUrl}/user/change-qty-decrease`,{
      user_id:user.data._id,
      cartData: {pId:product_id, qty:1,price:final_price},
       
      }).then(
        (success)=>{ 
          dispatcher(changeQty({price:final_price,pId:product_id, new_qty: qty-1, flag:false}))
          // console.log(success)
        }
      ).catch(
        (error)=>{
          console.log(error)
        }
      )
  }
}


    return (
        <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            className="w-16 h-16 object-cover rounded-lg mr-4"
            src={ apiBaseUrl + "/image/product/"+image}
            alt={name}
          />
          <div className="  ">
            <h3 className="text-lg font-medium">{name}</h3> 
           <div className='flex items-center'>
            <button disabled={qty==1?true:false} className='p-1 text-2xl font-bold border px-3 m-2 hover:bg-red-500' 
            onClick={()=>DESCqtyhandler({price:final_price,pId:product_id, new_qty: qty-1, flag:false})}>-</button>
            <span>{qty}</span>
            <button className='p-1 text-2xl font-bold border px-3 m-2 hover:bg-green-600'
            onClick={()=>INCqtyhandler({ price:final_price,pId:product_id, new_qty: qty+1, flag:true})} >+</button>
            <RiDeleteBin6Line className=' btn cursor-pointer hover:scale-[1.1] duration-200  border p-1 m-2  ' fontSize={40} 
             onClick={()=>deleteCart({pId:product_id, total_price: final_price*qty ,user_id:user.data?._id})}
            />
            </div> 
           
          </div>
        </div>
        
        <div className="flex flex-col">
          <span className="text-gray-600">Quantity: {qty}</span>
          <span className="text-lg font-medium">${final_price * qty}</span>
        </div>
      </div> 
      </>
    );
  };

export default Cart
