import React, { useContext, useRef, useState } from 'react';  
import Card from '../../../Components/Admin/Card';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Context } from '../../../Context/MainContext';

export default function Add() {
const slugRef= useRef();
const {notify}= useContext(Context);
const[errorMsg,setErrorMsg]=useState("");
const apiCategoryBaseUrl =   process.env.REACT_APP_API_BASE_URL+process.env.REACT_APP_CATEGORY_BASE_URL;
// console.log(apiCategoryBaseUrl);
const titleToSlug =(title)=>{
  const slug= title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  slugRef.current.value= slug ;
}




const submitHandler=(event)=>{
  event.preventDefault();
  const name= event.target.name.value;
  const slug =event.target.slug.value;
  const image=event.target.image.files[0]; 
  if(name != ""&& slug!="" && image!= undefined){
    const formData =new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("image", image);
    axios.post(
      apiCategoryBaseUrl + "/create",
      formData
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
       <Link to={"/admin/category"}>Category</Link>/
       Add
     </div>
    </Card>



    
    <div className="p-4">
  <form encType='multipart/form-data' className="space-y-6 " onSubmit={submitHandler} >
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
      </label>
      <input
      onChange={(e)=>titleToSlug(e.target.value)}
      // required="true"
        type="text"
        id="name"
        name="name"
        className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
      <span  className="block  text-red-700 p-2 text-center text-[19px]">{errorMsg}</span>
    </div>
    <div>
      <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
        Slug
      </label>
      <input
        readOnly
        ref={slugRef}
        type="text"
        id="slug"
        name="slug"
        className="mt-1 p-2 lowercase focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
    </div>
    <div>
      <label
        htmlFor="image"
        className="block text-sm font-medium text-gray-700"
      >
        Image
      </label>
      <div className="mt-1 flex items-center">
        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
          <svg
            className="h-full w-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M4 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4zm13.5 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM9 13.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <input type="file" id="image" name="image"   />
        <label
          htmlFor="image"
          className="ml-5 cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Choose file
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
