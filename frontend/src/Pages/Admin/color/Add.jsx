import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../../Components/Admin/Card'
import axios from 'axios';
import { Context } from '../../../Context/MainContext';

export default function Add() {
const {apiColorBaseUrl,notify}= useContext(Context); 
const[errorMsg,setErrorMsg]=useState("");






  const submitHandler=(event)=>{
    event.preventDefault();
    const name= event.target.name.value; 
    const color= event.target.color.value;
    if(name != ""){
      axios.post(
        apiColorBaseUrl + "/create",
        {name,color} 
      ).then(
        (success)=>{
          // console.log("success", success)
          
       if(success.data.status==1){
           event.target.reset();
           setErrorMsg("");
           
       }else{
    
       }
       notify(success.data.msg,success.data.status);
        }
      ).catch(
      (error)=>{
    //  console.log("error", error)
    
      }
      )
    }else{
     setErrorMsg("Please fill details");
    }
  
  
  }
  






  return (
    <>
    
    <Card>
     <div>
       <Link to={"/admin"}>Dashbord</Link> /
       <Link to={"/admin/color"}>Color</Link>/
       Add
     </div>
    </Card>




    <div className="p-4">
  <form className="space-y-6 "   onSubmit={submitHandler} >
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
      </label>
      <input
      // required="true"
        type="text"
        id="name"
        name="name"
        className="mt-1 p-2 uppercase focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      /> 
      <span  className="block  text-red-700 p-2 text-center text-[19px]">{errorMsg}</span>
    </div>
   
    <div>
      <label
        htmlFor="color"
        className="block text-sm font-medium text-gray-700"
      >
        Color
      </label>
      <div className="mt-1 flex items-center">
      
      
        <input 
        type="color" 
        id="color" 
        name="color" 
         />
        <label
          htmlFor="color"
          className="ml-5 cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Choose color
        </label>
      </div>
    </div>
    <div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </div>
  </form>
</div>

    
    </>
  )
}
