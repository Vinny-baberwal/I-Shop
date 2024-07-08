import React, { useContext } from 'react'
import { FaStar } from "react-icons/fa";
import { Context } from '../../Context/MainContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, userDBcart } from '../../reducer/CartSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
 




export default function ProductsBox({_id :product_id,name , image,final_price,original_price,discount_percent}) {
    const dispatcher =useDispatch();
    const user =useSelector(store=>store.user);
  const {cart}=useSelector(store=>store.cart);
  
    const{apiBaseUrl,productData}=useContext(Context);


const addToCartHandler=({pId:product_id, price: final_price})=>{
if(user.data==null){
    dispatcher(addToCart({pId:product_id, price: final_price}));
}else{
    axios.post(
        apiBaseUrl+"/user/add-to-cart",
        {
          user_id:user.data._id,
          cartData: {pId:product_id, qty:1,price:final_price}
        
        }
      ).then(
        (success)=>{
          // console.log(success)
  dispatcher(addToCart({pId:product_id, price: final_price, user_id:user.data._id}))

          if(success.data.status==1){
          let total =0;
            const d =success?.data.userCart?.map(
              (uc)=>{
                
                const found =productData.find(p=>p._id==uc.product_id);
                // console.log(found);
                if(found){
                  total =total +(found.final_price*uc.qty)
                  }
                 return {
                   pId:uc.product_id,
                  qty:uc.qty
              }
              }
           );

          //  console.log(d,"pppppppppp");
            dispatcher(userDBcart({userDBcart:d,total}))
          }
        
        }
      ).catch(
        (error)=>{
          // console.log(error)
          }
      )
}
}
//  console.log(addToCartHandler,"lllllllll")



  return (
    <div className='shadow p-2 m-4 text-center  relative hover:scale-[0.9] duration-300' >
        <div className=' absolute top-0 left-0 bg-red-500 m-1 px-2 rounded'>{
        discount_percent!=0? discount_percent: "0" }% off</div>
        <img src={apiBaseUrl+"/image/product/"+image} alt=""  className='mx-auto mb-2'/>
        <Link to={"/product-details/" + product_id}> <div>  {name}</div> </Link>
        <Stars yellow={3.5} />
        <div className='my-2'>
            <span className='text-[#FF4858] pt-2' >${~~final_price}</span>
            <span className='text-[#C1C8CE]  line-through px-1 py-9 ' >${original_price}</span>
        </div> 
        {/* <button  onClick={()=>dispatcher(addToCart({pId:product_id, price: final_price, }))}
        className='p-2 border hover:bg-blue-500 mx-auto my-3 block duration-200'>Add to Cart</button> */}
        
        <button  onClick={()=>addToCartHandler({pId:product_id, price: final_price,user_id:user.data?._id})}
        className='p-2 border hover:bg-blue-500 mx-auto my-3 block duration-200'>Add to Cart</button>
    </div>
  )
}






// function Stars({ yellow }) {
//     let starts = [];
//     for (var i = 1; i <= 5; i++) {
//         if (i <= yellow) {
//             starts.push(<FaStar key={i} color='#FFC600' />);
//         } else {
//             starts.push(<FaStar key={i} color='#C1C8CE' />);
//         }
//     }
//     return <div className='mt-[30px] flex justify-center'>{starts}</div>;

// }


function Stars ({yellow}){
    let starts =[];
    for(var i =1; i <= 5; i++){
        if(i<= yellow){
            starts.push( <FaStar key={i} color='#FFC600' />);
        }else{
            starts.push( <FaStar key={i} color='#C1C8CE' />);
        }
    }
    return<div className='mt-[12px] flex justify-center'>{starts}</div>;
}
