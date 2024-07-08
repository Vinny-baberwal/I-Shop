import React, { useContext, useEffect, useRef, useState } from 'react';  
import Card from '../../../Components/Admin/Card';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../../Context/MainContext';
import axios from 'axios';
import Select from 'react-select';







function Edit() {
  const[editCatProd,setEditCatprod]=useState(null);
  const[editColorProd,setEditColorProd]=useState(null);
  const[editAccessoryProd,setEditAccessoryProd]=useState(null);
    const {id} = useParams();
    const slugRef= useRef();
    const navigator =useNavigate();
    const {notify,apiProductBaseUrl,apiBaseUrl,tableData,colorData,fatchCategories,fatchColors ,fatchAccessory, accessoryData}= useContext(Context);
    const[editProductData,setEditProductData]=useState({});//for edit Product
    // const[errorMsg,setErrorMsg]=useState("");
    const original_priceRef =useRef();
const discount_percentRef =useRef();
const final_priceRef =useRef(); 
   
    // console.log(apiCategoryBaseUrl);
    const titleToSlug =(title)=>{
      const slug= title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
      slugRef.current.value= slug ;
    }
    
    // console.log(accessoryData,"<><><><><><>")
    // console.log(editColorProd,"<><><><><><>")

useEffect(
  ()=>{
   fatchCategories();
   fatchColors();
   fatchAccessory();
  },[]
)

    

  useEffect(
    ()=>{
     if(id != ""){
        axios.get(apiProductBaseUrl+"/"+id)
        .then(
            (success)=>{
                // console.log(success.data)
            if(success.data.status==1){
                setEditProductData(success.data.product);
            }
            }
        ).catch(
            (error)=>{

            }
        )
     }
    },[id]
  )


  useEffect(
    ()=>{
    if(editProductData!=null){
      setEditCatprod({value:editProductData?.category_id?._id, label:editProductData?.category_id?.name});
      setEditColorProd(editProductData?.color_id?.map(
        (col)=>{
          return {value:col._id,label:col.name}
     } ));
     setEditAccessoryProd(editProductData?.accessory_id?.map(
      (acc)=>{
        return {value:acc._id,label:acc.name}
      }  
     ));

      
    }
    },[editProductData]
  )
  
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



 













// console.log(editProductData,"ooooooooooooooooooooooo")

const editAccessoryProds = editAccessoryProd?.map(access=>access.value);

 const submitHandler=(event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",event.target.name.value);
    formData.append("slug",event.target.slug.value);
    formData.append("old_image",editProductData.image);
    formData.append("original_price",event.target.original_price.value);
    formData.append("discount_percent",event.target.discount_percent.value);
    formData.append("final_price",event.target.final_price.value);
    formData.append("category_id",editCatProd.value);
    formData.append("discription",event.target.discription.value);
    const editcolorData= editColorProd.map(col=>col.value);
    formData.append("color_id",JSON.stringify(editcolorData));
    formData.append("accessory_id",JSON.stringify(editAccessoryProds));
    formData.append("image",event.target.image.files[0]?? null);
    // new Response(formData).text().then(console.log)
    axios.put(apiProductBaseUrl +"/update/"+ id,
        formData
    ).then(
        (success)=>{
            // console.log(success,"hooogyaaa reee hoogyaaa");
          if(success.data.status==1){
            // setTableData(success.data.categories);
            navigator("/admin/product/view");
          } 
          notify(success.data.msg,success.data.status);

        }
    ).catch(
        (error)=>{
        // console.log(error)
        }
    )

 }
     



  return (
    <>
    <Card>
     <div>
       <Link to={"/admin"}>Dashbord</Link> /
       <Link to={"/admin/product"}>Product</Link>/
       Edit
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
      defaultValue={editProductData?.name}
      // required="true"
        type="text"
        id="name"
        name="name"
        className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
      {/* <span  className="block  text-red-700 p-2 text-center text-[19px]">{errorMsg} </span> */}
    </div>
    <div>
      <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
        Slug
      </label>
      <input
      defaultValue={editProductData?.slug}
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
      defaultValue={editProductData?.discription}
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
      defaultValue={editProductData?.original_price}
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
      // defaultValue={0}
      defaultValue={editProductData?.discount_percent}
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
      {/* {editProductData.category_id?.name} */}
      </label>
      <input
      defaultValue={editProductData?.final_price}
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

<div className='grid grid-cols-2 gap-7 px-4'>
  <div className='mb-4 '>
  <label htmlFor="final_price" className="block m-2 text-sm font-medium text-gray-700">
      Categories
      </label>
      <Select
      value={editCatProd}
      onChange={
        (option)=>{
          setEditCatprod(option)
          // console.log(prodCat)
        }
      }
      options={
        tableData.map(
          (data)=>{
            return {value:data?._id, label:data?.name}
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
      value={editColorProd}
      isMulti 
      onChange={
         (options)=>{
          setEditColorProd(options) ;
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
      Accessories
      </label>
      <Select  
      closeMenuOnSelect={false}
      value={editAccessoryProd}
      isMulti 
      onChange={
         (options)=>{
          setEditAccessoryProd(options) ;
          // console.log("object", prodColor);
         }
      }
      options={
        accessoryData.map(
          (access)=>{
            return {value:access._id, label:access.name}
            // console.log(access)
          }
        )
      }/>
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
        <img src={apiBaseUrl+"/image/product/"+editProductData?.image} alt="" />
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

export default Edit
