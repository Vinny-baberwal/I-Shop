import React, { useContext, useEffect, useRef, useState } from 'react'
import Card from '../../../Components/Admin/Card'
import { Link } from 'react-router-dom'
import Select from 'react-select';
import { Context } from '../../../Context/MainContext';
import axios from 'axios';

export default function Add() {
const[errorMsg,setErrorMsg]=useState("");

const slugRef= useRef();
const original_priceRef =useRef();
const discount_percentRef =useRef();
const final_priceRef =useRef();
const {fatchCategories, fatchColors, colorData, tableData,apiProductBaseUrl,notify,accessoryData,fatchAccessory,fatchProducts}=useContext(Context);
// const[prodCat,setProdCat]=useState(null);
// const[prodColor,setProdColor]=useState(null);
// const[prodAss,setProdAss]=useState(null);



let prodCat =null;
let prodColor=null;
let prodAss=null;

// console.log(prodColor, "0000000000000000000000000")


useEffect(
  ()=>{
   fatchCategories();
   fatchColors();
   fatchAccessory();
  },[]
)





// ----------
const titleToSlug =(title)=>{
  const slug= title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  slugRef.current.value= slug ;
}


const calFinalPrice =()=>{
  if(original_priceRef.current.value !="" && discount_percentRef.current.value != ""){
    if(discount_percentRef.current.value>=100 || discount_percentRef.current.value <= -1){
        discount_percentRef.current.style.border= "2px red solid";
        discount_percentRef.current.nextElementSibling.style.visibility= "visible"
        final_priceRef.current.value=""
    }else{
      const  final =original_priceRef.current.value - ((discount_percentRef.current.value * original_priceRef.current.value) / 100 );
      final_priceRef.current.value=final
      discount_percentRef.current.style.border= "";
      discount_percentRef.current.nextElementSibling.style.visibility= "hidden"
    }
 
  }
}



const submitHandler=(event)=>{
   event.preventDefault();
  const slug= event.target.slug.value;
   if( slug !=""){ 
    const formData = new FormData();
    for(let otherImage of event.target.other_image.files){
      // console.log(otherImage);
      formData.append("other_image",otherImage);
    }
    formData.append("name",event.target.name.value);
    formData.append("slug",slug);
    formData.append("original_price",event.target.original_price.value);
    formData.append("discount_percent",event.target.discount_percent.value);
    formData.append("discription",event.target.discription.value);
    formData.append("final_price",event.target.final_price.value);
    formData.append("category_id",prodCat);
    formData.append("accessory_id",JSON.stringify(prodAss));
    formData.append("color_id",JSON.stringify(prodColor));
    formData.append("image",event.target.image.files[0]);
    // new Response(formData).text().then(console.log)
    // console.log(formData,"formmmmmm");
    // return
    axios.post(
      apiProductBaseUrl + "/create",
      formData
    ).then(
      (success)=>{
        console.log("success", success);
        
     if(success.data.status==1){
         event.target.reset();
         setErrorMsg(""); 
        //  setProdCat("");
        //   setProdColor("");
        //   setProdAss("");
         
         
     }else{
  
     }
     notify(success.data.msg,success.data.status);
      }
    ).catch(
    (error)=>{
   console.log("error", error);
  
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
       <Link to={"/admin/product"}>Product</Link>/
       Add
     </div>
    </Card>



    
    <div className="p-4">
  <form encType='multipart/form-data' className="space-y-6 " onSubmit={submitHandler}  >
   <div className='grid grid-cols-2  gap-6'>
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
      <span  className="block  text-red-700 p-2 text-center text-[19px]">{errorMsg} </span>
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



    </div>
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Discriptions
      </label>
      <input 
      // required="true"
        type="text"
        id="discription"
        name="discription"
        className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      /> 
    </div>


    <div className='grid grid-cols-3  gap-6'>
    <div>
      <label htmlFor="original_price" className="block text-sm font-medium text-gray-700">
        Original price
      </label>
      <input 
      onChange={calFinalPrice}
      ref={original_priceRef}
        type="text"
        id="original_price"
        name="original_price"
        className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      /> 
    </div>
    <div>
      <label htmlFor="discount_percent" className="block text-sm font-medium text-gray-700">
      Discount Percent(%)
      </label>
      <input
      defaultValue={0}
        ref={discount_percentRef}
        onChange={calFinalPrice}
        type="text"
        id="discount_percent"
        name="discount_percent"
        className="mt-1 p-2 lowercase focus:outline-none ring-red-500 border-red-500 block w-full shadow-sm sm:text-sm  rounded-md"
      />
      <span style={{visibility:"hidden"}}>Value must be 0 to 100</span>
    </div>

    <div>
      <label htmlFor="final_price" className="block text-sm font-medium text-gray-700">
      Final Price
      </label>
      <input
      ref={final_priceRef}
        readOnly
        type="text"
        id="final_price"
        name="final_price"
        className="mt-1 p-2 lowercase focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
    </div>

</div>
{/* select boxxxxxx */}

<div className='grid grid-cols-3 gap-7 px-4'>
  <div className='mb-4 '>
  <label htmlFor="final_price" className="block m-2 text-sm font-medium text-gray-700">
      Categories
      </label>
      <Select 
      onChange={
        (option)=>{
          prodCat=option.value 
          // setProdCat(option.value);
          // console.log(prodCat)
        }
      }
      options={
        tableData.map(
          (data)=>{
            return {value:data._id, label:data.name}
          }
        )
      }/>
    </div>  

    <div className='mb-4'>
  <label htmlFor="final_price" className="block m-2 text-sm font-medium text-gray-700">
      Colors
      </label>
      <Select  
      closeMenuOnSelect={false}
      isMulti 
      onChange={
         (options)=>{
          prodColor=options.map((option)=>option.value)
          // setProdColor(options.map((option)=>option.value));
          // console.log("object", prodColor);
         }
      }
      options={
        colorData.map(
          (color)=>{
            return {value:color._id, label:color.name}
          }
        )
      }/>
    </div>  

    
    <div className='mb-4'>
  <label htmlFor="final_price" className="block m-2 text-sm font-medium text-gray-700">
      Accessory
      </label>

      <Select  
      closeMenuOnSelect={false}
      isMulti 
      onChange={
         (options)=>{
          prodAss=options.map((option)=>option.value) 
         }
      }
      options={
        accessoryData.map(
          (access)=>{
            return {value:access._id, label:access.name}
          }
        )
      }/>
      {/* <Select    
      onChange={
         (option)=>{
          prodAss=option.value
          // setProdAss(option.value);
          // console.log("object", prodAss);
         }
      }
      options={
        accessoryData.map(
          (access)=>{
            // console.log(access,"poiuytrewwqsdfgbnmkuytdf")
            return {value:access._id, label:access.name}
          }
        )
      }/> */}
    </div>  

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
      <label
        htmlFor="image"
        className="block text-sm font-medium text-gray-700"
      >
       Other Image
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
        <input type="file" id="other_image" name="other_image"  multiple={true} accept='image/*' />
        <label
          htmlFor="other_image"
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
