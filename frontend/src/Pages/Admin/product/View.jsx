import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../Context/MainContext'
import Card from '../../../Components/Admin/Card'
import { Link } from 'react-router-dom'
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';
import { FaImages } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

export default function View() {
  const apiBaseUrl= process.env.REACT_APP_API_BASE_URL;
  const [imageView,setImageView]=useState(false);
  const[dltData,setDltData]=useState({});

  const{fatchProducts,productData ,apiProductBaseUrl,notify}=useContext(Context);
  // console.log(productData,"proooooooooooo")

  useEffect(
    ()=>{
      fatchProducts();
    },[]
  )
  // console.log(productData,"imageee");


  const deletHandler=(product_id)=>{ 
  
    // console.log(product_id, "idddddddd");
    axios.delete(apiProductBaseUrl+"/delete/"+product_id
    ).then(
      (success)=>{
    // console.log(success ,"success");

         if(success.data.status==1){
          fatchProducts();
         }
         notify(success.data.msg,success.data.status);
      }
    ).catch(
      (error)=>{
        // console.log(error ,"error");

      }
    )
  }


useEffect(
  ()=>{
    ImageViewhendler();
  },[imageView]
)
  

const ImageViewhendler=(id)=>{
  
  if(id){
    axios.get(apiProductBaseUrl+"/"+id)
    .then(
        (success)=>{
            // console.log(success)
        if(success.data.status==1){
          // console.log(success.data.products.other_image,"ppppppppppppppppppp")
            setDltData(success.data.products);
        }
        }
    ).catch(
        (error)=>{

        }
    )
    // console.log(id)
    setImageView(true)
            }

}

const changeStatus=(product_id,new_status)=>{
  axios.put(
    apiProductBaseUrl + "/change-status/"+ product_id +"/" +new_status
  ).then(
    (success)=>{
  // console.log(success ,"success");

       if(success.data.status==1){
        fatchProducts();
       }
       notify(success.data.msg,success.data.status);
    }
  ).catch(
    (error)=>{
      // console.log(error ,"error");

    }
  )
}

const changeSeller=(product_id,new_status)=>{
  axios.put(
    apiProductBaseUrl + "/best-seller/"+ product_id +"/" +new_status
  ).then(
    (success)=>{
  // console.log(success ,"success");

       if(success.data.status==1){
        fatchProducts();
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
    <div className='w-[80%] mx-auto h-full bg-black fixed opacity-90 text-white p-6'
    style={{
      visibility:imageView ? "visible": "hidden"
    }}> 
     
    <IoCloseCircle fontSize={55} onClick={()=>setImageView(false)}/>
      
                <div className='grid grid-cols-6  gap-3  opacity-[1] '> 
                  {
                 
                    dltData?.other_image?.map(
                      (img)=> {
                         return (
                          <div >
                        <img src={apiBaseUrl+"/image/product/"+img} alt=""  width={120}  /> 
                        </div>
                         )
                      }
                    )
                  }
                </div>
              
    </div>





    {/* -------------------- */}
     <Card>
      <div>
        <Link to={"/admin"}>Dashbord</Link> /
        <Link to={"/admin/product"}>Product</Link>/
        View

      </div>
     </Card>



     <div className="overflow-x-auto">
  <table className="table-auto min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
        >
          Sr
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
        >
          Name
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
        >
          Slug
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
        >
         Price
        </th>
 
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
        >
          Color
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
        >
          Category 
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
        >
          Accessory 
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
        >
          Image
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
        >
          Status
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
        >
          Best-Seller
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
        >
          Action
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {/* Your table rows go here */}

      {
        productData.map(
          (data,index)=>{
            return (
            <tr className="bg-gray-50" key={data.id} >
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{index+1}</td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{data.name}</td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{data.slug}</td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >
             <del>₹ {data.original_price}</del>
             <div>{data.discount_percent}</div> 
             <div>₹ {~~data.final_price}</div>
             </td> 
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >
              {data.color_id.map(
                (col)=> <div>{col?.name}</div>
              ) }</td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{data.category_id?.name}</td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >
              {data.accessory_id?.map(
                (acc=>acc.name)
              )}</td>


            <td className=" py-3 text-left text-xs font-medium text-gray-500  tracking-wider flex gap-4" >
              <img src={apiBaseUrl+"/image/product/"+data?.image} alt="" width={100} />
               {/* {
                data?.other_image.map(
                  (oi)=> <img src={apiBaseUrl+"/image/product/"+oi} alt="" width={50} className='flex gap-3' />
                )
               }
               */}
              </td>
              <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{data.status==1
            ? <button onClick={()=>changeStatus(data._id , false)} className='bg-green-600 text-white p-3 rounded' >active</button>
            :<button onClick={()=>changeStatus(data._id , true)} className='bg-red-500 text-white p-3 rounded' >Inactive</button>  
            }</td>
            
             <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{data.best_seller==1
            ? <button onClick={()=>changeSeller(data._id , false)} className='bg-green-600 text-white p-3 rounded' >Best-Seller</button>
            :<button onClick={()=>changeSeller(data._id , true)} className='bg-red-500 text-white p-3 rounded' >Average</button>  
            }</td>

            <td className="px-6 py-3 text-left text-[25px] font-medium text-black flex gap-3  tracking-wider  " >
              <button className=' hover:scale-150  duration-200'>  <Link to={"/admin/product/edit/"+ data._id}>
                <HiOutlinePencilSquare />
                </Link></button>
              <button className=' hover:scale-150  duration-200' onClick={()=>deletHandler(data._id)}><MdDeleteForever /></button>
              <button className=' hover:scale-150  duration-200' onClick={()=>ImageViewhendler(data._id)} ><FaImages /></button>
            </td>
    
           
          </tr>
          
            )
          }
        )
        
      }
      

     
    </tbody>
  </table>
</div>

     </>
  )
}
