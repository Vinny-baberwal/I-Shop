// pages/Signup.js
import React, { useContext, useState } from 'react';
import { Context } from '../../Context/MainContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { loginAdmin } from '../../reducer/AdminSlice';
import { useDispatch } from 'react-redux';

function AdSignup() {
  const dispatcher =useDispatch(); 
  
const navigator=useNavigate();


const {apiBaseUrl,notify,productData}=useContext(Context);












const signupHandler=(e)=>{
   e.preventDefault();
   
  //  console.log(e.target.confrim_password.value,"mmmmm")
   const data ={
    name:e.target.name.value,
    email:e.target.email.value,
    password:e.target.password.value,
    confirm_password:e.target.confirm_password.value,
    secret_key:e.target.secret_key.value
    
   }
   axios.post(
    apiBaseUrl+"/admin/signup",data
   ).then(
    (success)=>{
  // console.log(success.data ,"success");

       if(success.data.status==1){ 

        e.target.reset();
        dispatcher(loginAdmin(success.data.user))
        navigator("/admin")
        
       }
       notify(success.data.msg,success.data.status);
    }
  ).catch(
    (error)=>{
      // console.log(error ,"error");

    }
  )
   
       
}



  return (
    <>
<div className="  flex justify-center items-center min-h-[100vh] bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
  <div className="amain ">
  <input type="checkbox" id="chk" aria-hidden="true" />
    <div className="asignup">
    <form onSubmit={signupHandler}>
        {/* <label htmlFor="chk" aria-hidden="true">
          Sign up
        </label> */}
        <input type="text" id="name" name="name" placeholder="User name" required="" />
        <input type="email"   id="email" name="email" placeholder="Email" required="" />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required=""
          />
        <input type="password"  id="confirm_password" name="confirm_password" placeholder="Confirm Password" required="" />
        <input type="text"  id="secret_key" name="secret_key" placeholder="secret_key" required="" />
        <button type="submit" >Sign up</button>
      </form>
    </div>
    <div className="login relative">
        {/* <img src="/image/already_an_have_account-removebg-preview.png"  className=' absolute top-[-130px]' /> */}
      <Link to={"/admin/login"}>

        <label htmlFor="chk" aria-hidden="true" className='pt-2'>
          Login
        </label> </Link>
        <div className=' flex  justify-center'> 
        <img src="\image\tap-removebg-preview.png" alt=""  width={120} className='' />
           </div>
          <div className='text-center text-[#573b8a] font-bold text-xl mt-3' >Just Tap Login Button </div>
   
        
       
    </div>
  </div>
</div>  


</>







    // <div className="flex h-screen justify-center bg-gray-100">
    //   <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
    //     <h1 className="text-3xl font-bold mb-4">Sign up</h1>
    //     <form onSubmit={signupHandler}>
    //       <label className="block mb-2">
    //         Name
    //         <input
    //           type="text"
    //           id="name"
    //           name="name"
    //           className="w-full p-2 pl-10 text-sm text-gray-700"
    //           placeholder="John Doe"
    //         />
    //       </label>
    //       <label className="block mb-2">
    //         Email
    //         <input
    //           type="email"
    //           id="email"
    //           name="email"
    //           className="w-full p-2 pl-10 text-sm text-gray-700"
    //           placeholder="example@example.com"
    //         />
    //       </label>
    //       <label className="block mb-2">
    //         Password
    //         <input
    //           type="password"
    //           id="password"
    //           name="password"
    //           className="w-full p-2 pl-10 text-sm text-gray-700"
    //           placeholder="Password"
    //         />
    //       </label>
    //       <label className="block mb-2">
    //         Confrim Password
    //         <input
    //           type="password"
    //           id="confirm_password"
    //           name="confirm_password"
    //           className="w-full p-2 pl-10 text-sm text-gray-700"
    //           placeholder="Confrim Password"
    //         />
    //       </label>
    //       <button
    //         className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
    //         type="submit"
    //       >
    //         Sign up
    //       </button>
    //       <p className="text-sm text-gray-600">
    //         Already have an account? <Link to={"/login"}>Login</Link>
    //       </p>
    //     </form>
    //   </div>
    // </div>
  );
}

export default AdSignup;