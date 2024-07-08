import React, { useContext } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../Context/MainContext'; 
import { loginAdmin } from '../../reducer/AdminSlice';
import { useDispatch } from 'react-redux';


function AdLogin() {
//   const {cart}=useSelector(store=>store.cart);
  const {apiBaseUrl,notify,productData}=useContext(Context);
  const dispatcher =useDispatch();
    
  const navigator=useNavigate();

  const loginUserHandler=(e)=>{
   e.preventDefault();
   const data ={
    email:e.target.email.value,
    password:e.target.password.value
   }
   axios.post(
   apiBaseUrl+"/admin/login/" ,data)
   .then(
    (success)=>{
  // console.log(success.data ,"success");

       if(success.data.status==1){ 
 
        e.target.reset();
        dispatcher(loginAdmin(success.data.admin));
      
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


  <div className="  flex justify-center items-center min-h-[100vh] bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
  <div className="amain">
  <input type="checkbox" id="chk" aria-hidden="true" />
    <div className="asignup">
    <label htmlFor="chk" aria-hidden="true">
          Login
        </label>
        
        <div className=' flex  justify-center'> 
        <img src="\image\tap-removebg-preview.png" alt=""  width={120} className='' />
           </div>
          <div className='text-center text-white text-xl mt-3' >Just Tap Login Button </div>
   
    </div>
    <div className="login">
  
    <form onSubmit={loginUserHandler} >
        <label htmlFor="chk" aria-hidden="true">
          Login
        </label>
        <input type="email"   id='email' name="email" placeholder="Email" required="" />
        <input type="password"   id='password' name="pswd" placeholder="Password" required="" />
        <button  type="submit" >Login</button>
      </form>
      <label htmlFor="chk" aria-hidden="true">
        <Link to={"/admin/signup"}>Sign up</Link>
     
        </label>
        
    </div>
  </div>
</div>  




    
    
    
    
    
    
    
    
    
    
    
    // <div className="flex h-screen justify-center bg-gray-100">
    //   <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
    //     <h1 className="text-3xl font-bold mb-4">Login</h1>
    //     <form onSubmit={loginUserHandler}>
    //       <label className="block mb-2">
    //         Email
    //         <input
    //           type="email"
    //           id='email'
    //           className="w-full p-2 pl-10 text-sm text-gray-700"
    //           placeholder="example@example.com"
    //           />
    //       </label>
    //       <label className="block mb-2">
    //         Password
    //         <input
    //           type="password"
    //           id='password'
    //           className="w-full p-2 pl-10 text-sm text-gray-700"
    //           placeholder="Password"
    //           />
    //       </label>
    //       <button
    //         className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
    //         type="submit"
    //         >
    //         Login
    //       </button>
    //       <p className="text-sm text-gray-600">
    //         Don't have an account? <Link to={"/signup"}>Sign up</Link>
    //       </p>
    //     </form>
    //   </div>
    // </div>
  );
}

export default AdLogin































