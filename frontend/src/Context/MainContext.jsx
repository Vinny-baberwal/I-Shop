import axios from 'axios';
import React, { createContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Context = createContext();


export default function MainContext(props) {
  const apiCategoryBaseUrl =   process.env.REACT_APP_API_BASE_URL+process.env.REACT_APP_CATEGORY_BASE_URL;
  const apiColorBaseUrl = process.env.REACT_APP_API_BASE_URL+process.env.REACT_APP_COLOR_BASE_URL;
  const apiProductBaseUrl=process.env.REACT_APP_API_BASE_URL+process.env.REACT_APP_PRODUCT_BASE_URL;
  const apiAccessoryBaseUrl=process.env.REACT_APP_API_BASE_URL+process.env.REACT_APP_ACCESSORY_BASE_URL;
   const apiBaseUrl=process.env.REACT_APP_API_BASE_URL;
  const [tableData,setTableData]=useState([]); // for category
  const[colorData,setColordata]=useState([]); // for color
  const [productData,setProductData]=useState([]);//for product data
  const[accessoryData,setAccessoryData]=useState([]); //for accessory 
const [loader,setLoader]=useState(false);
const[bestProduct,setbestProduct]=useState([]);// for best seller product
const [order,setOrder]=useState([]);//for order
// console.log(bestProduct)
  const notify = (msg,status) =>toast(msg,{type:status?'success':'error'});


  const fatchCategories=()=>{
    axios.get(apiCategoryBaseUrl+"/",
    ).then(
      (success)=>{
    // console.log(success ,"success");
    if(success.data.status==1 ){
     setTableData(success.data.categories);
    }else{
  
    }
      }
    ).catch(
      (error)=>{
  //  console.log("error", error);
  
      }
    )
  }  

// for colorrrrrr


  const fatchColors=()=>{
    axios.get(apiColorBaseUrl+"/",
    ).then(
      (success)=>{
    // console.log(success ,"success");
    if(success.data.status==1 ){
     setColordata(success.data.colors);
    }else{
       setColordata([]);
    }
      }
    ).catch(
      (error)=>{
  //  console.log("error", error);
  
      }
    )
  }  
  const bestSeller=()=>{
    axios.get(
      apiProductBaseUrl+ "/best-seller" 
    ).then(
      (success)=>{
        if(success.data.status==1){
        setbestProduct(success.data.bestSeller)
        }
      }
    ).catch(
      (error)=>{
        console.log(error)
      }
    )
  }


  const fatchProducts=(category_slug=null,limit = null,range=null,color_name=null)=>{
    setLoader(true);
    const searchParams = new URLSearchParams();
    if(category_slug!=null){
      searchParams.set("category_slug",category_slug);
    }
    if(limit!=null){
    searchParams.set("limit",limit);
    }
    if(range!=null){
      searchParams.set("range_start",range.range_start);
      searchParams.set("range_end",range.range_end);
    }
    if(color_name!=null){
      searchParams.set("color_name",color_name);
    }
    axios.get(apiProductBaseUrl+"/" +"?"+ searchParams.toString())
    .then(
      (success)=>{
        if(success.data.status==1){
          setProductData(success.data.products);
        }else{
          setProductData([]);
        }

      }
    ).catch(
      (error)=>{

      }
    ).finally(
      ()=>{
        setLoader(false);
      }
    )
  }

  const fatchAccessory=()=>{
    axios.get(
      apiAccessoryBaseUrl+"/"
    ).then(
      (success)=>{
      if(success.data.status==1){
        // console.log(success.data);  
        setAccessoryData(success.data.accessories);
      } else{
        setAccessoryData([]);
      }
      }
    ).catch(
    (error)=>{

    }
    )
  }

  const fatchOrder=()=>{
    axios.get(
      apiBaseUrl+"/order/"
    ).then(
      (success)=>{
      if(success.data.status==1){
        console.log(success.data.order,"pppppppp");  
        setOrder(success.data.order);
      } else{
        setOrder([]);
      }
      }
    ).catch(
    (error)=>{

    }
    )
  }
  return (
    <>
    <div className='w-full h-full fixed  z-[55555]  justify-center items-center' style={{
      background:"rgba(0,0,0,0.8)",
      display:loader ?'flex': 'none'
    }}>
    <div class="load">
  <div class="gear one">
    <svg id="blue" viewbox="0 0 100 100" fill="#94DDFF">
      <path d="M97.6,55.7V44.3l-13.6-2.9c-0.8-3.3-2.1-6.4-3.9-9.3l7.6-11.7l-8-8L67.9,20c-2.9-1.7-6-3.1-9.3-3.9L55.7,2.4H44.3l-2.9,13.6              c-3.3,0.8-6.4,2.1-9.3,3.9l-11.7-7.6l-8,8L20,32.1c-1.7,2.9-3.1,6-3.9,9.3L2.4,44.3v11.4l13.6,2.9c0.8,3.3,2.1,6.4,3.9,9.3              l-7.6,11.7l8,8L32.1,80c2.9,1.7,6,3.1,9.3,3.9l2.9,13.6h11.4l2.9-13.6c3.3-0.8,6.4-2.1,9.3-3.9l11.7,7.6l8-8L80,67.9              c1.7-2.9,3.1-6,3.9-9.3L97.6,55.7z M50,65.6c-8.7,0-15.6-7-15.6-15.6s7-15.6,15.6-15.6s15.6,7,15.6,15.6S58.7,65.6,50,65.6z"></path>
    </svg>
  </div>
  <div class="gear two">
    <svg id="pink" viewbox="0 0 100 100" fill="#FB8BB9">
      <path d="M97.6,55.7V44.3l-13.6-2.9c-0.8-3.3-2.1-6.4-3.9-9.3l7.6-11.7l-8-8L67.9,20c-2.9-1.7-6-3.1-9.3-3.9L55.7,2.4H44.3l-2.9,13.6              c-3.3,0.8-6.4,2.1-9.3,3.9l-11.7-7.6l-8,8L20,32.1c-1.7,2.9-3.1,6-3.9,9.3L2.4,44.3v11.4l13.6,2.9c0.8,3.3,2.1,6.4,3.9,9.3              l-7.6,11.7l8,8L32.1,80c2.9,1.7,6,3.1,9.3,3.9l2.9,13.6h11.4l2.9-13.6c3.3-0.8,6.4-2.1,9.3-3.9l11.7,7.6l8-8L80,67.9              c1.7-2.9,3.1-6,3.9-9.3L97.6,55.7z M50,65.6c-8.7,0-15.6-7-15.6-15.6s7-15.6,15.6-15.6s15.6,7,15.6,15.6S58.7,65.6,50,65.6z"></path>
    </svg>
  </div>
  <div class="gear three">
    <svg id="yellow" viewbox="0 0 100 100" fill="#FFCD5C">
      <path d="M97.6,55.7V44.3l-13.6-2.9c-0.8-3.3-2.1-6.4-3.9-9.3l7.6-11.7l-8-8L67.9,20c-2.9-1.7-6-3.1-9.3-3.9L55.7,2.4H44.3l-2.9,13.6              c-3.3,0.8-6.4,2.1-9.3,3.9l-11.7-7.6l-8,8L20,32.1c-1.7,2.9-3.1,6-3.9,9.3L2.4,44.3v11.4l13.6,2.9c0.8,3.3,2.1,6.4,3.9,9.3              l-7.6,11.7l8,8L32.1,80c2.9,1.7,6,3.1,9.3,3.9l2.9,13.6h11.4l2.9-13.6c3.3-0.8,6.4-2.1,9.3-3.9l11.7,7.6l8-8L80,67.9              c1.7-2.9,3.1-6,3.9-9.3L97.6,55.7z M50,65.6c-8.7,0-15.6-7-15.6-15.6s7-15.6,15.6-15.6s15.6,7,15.6,15.6S58.7,65.6,50,65.6z"></path>
    </svg>
  </div>
  <div class="lil-circle"></div>
  <svg class="blur-circle">
    <filter id="blur">
      <fegaussianblur in="SourceGraphic" stddeviation="13"></fegaussianblur>
    </filter>
    <circle cx="70" cy="70" r="66" fill="transparent" stroke="white" stroke-width="40" filter="url(#blur)"></circle>
  </svg>
</div> 

    </div>
     <ToastContainer autoClose={700}  theme='colored' />
    <Context.Provider value={{notify,fatchCategories, fatchColors, colorData, tableData, apiCategoryBaseUrl,apiColorBaseUrl,
    apiProductBaseUrl,fatchProducts, productData,apiAccessoryBaseUrl,fatchAccessory , accessoryData,apiBaseUrl, bestProduct,bestSeller,
    fatchOrder, order }}>
        {props.children}
    </Context.Provider>
  </>
  )
}
 
export {Context};