import React, { useContext, useEffect, useState } from 'react'
import Card from '../../../Components/Admin/Card'
import { Link } from 'react-router-dom'
import { Context } from '../../../Context/MainContext';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';

export default function View() {
const apiBaseUrl= process.env.REACT_APP_API_BASE_URL;
  const{fatchCategories,tableData,apiCategoryBaseUrl,notify}=useContext(Context);

  useEffect(
    ()=>{
      fatchCategories();
    },[]
  )

  //  console.log(tableData.map(
  //   (img)=> img.image_name
  //  ),".............");

  const deletHandler=(category_id)=>{
    // const image =tableData.map((img)=> img.image_name);
    // console.log(category_id, "idddddddd");
    axios.delete(apiCategoryBaseUrl+"/delete/"+category_id
   
    ).then(
      (success)=>{
    // console.log(success ,"success");

         if(success.data.status==1){
          fatchCategories();
         }
         notify(success.data.msg,success.data.status);
      }
    ).catch(
      (error)=>{
        // console.log(error ,"error");

      }
    )
  }


  const changeStatus=(category_id,new_status)=>{
    axios.put(
      apiCategoryBaseUrl + "/change-status/"+ category_id +"/" +new_status
    ).then(
      (success)=>{
    // console.log(success ,"success");

         if(success.data.status==1){
          fatchCategories();
         }
         notify(success.data.msg,success.data.status);
      }
    ).catch(
      (error)=>{
        // console.log(error ,"error");

      }
    )
  }
  
  const changeSeller=(category_id,new_status)=>{
    axios.put(
      apiCategoryBaseUrl + "/best-seller/"+ category_id +"/" +new_status
    ).then(
      (success)=>{
    // console.log(success ,"success");

         if(success.data.status==1){
          fatchCategories();
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
     <Card>
      <div>
        <Link to={"/admin"}>Dashbord</Link> /
        <Link to={"/admin/category"}>Category</Link>/
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
        tableData.map(
          (data,index)=>{
            return (
            <tr className="bg-gray-50" key={data.id} >
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{index+1}</td>

            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{data.name}</td>

            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{data.slug}</td>

            <td className=" py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >
              <img src={apiBaseUrl+"/image/category/"+data.image_name} alt="" width={120} />
              </td>

            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{data.status==1
            ? <button onClick={()=>changeStatus(data._id , false)} className='bg-green-600 text-white p-3 rounded' >active</button>
            :<button onClick={()=>changeStatus(data._id , true)} className='bg-red-500 text-white p-3 rounded' >Inactive</button>  
            }</td>
            
             <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{data.best_seller==1
            ? <button onClick={()=>changeSeller(data._id , false)} className='bg-green-600 text-white p-3 rounded' >Best-Seller</button>
            :<button onClick={()=>changeSeller(data._id , true)} className='bg-red-500 text-white p-3 rounded' >Average</button>  
            }</td>
 

            <td className="px-6 py-3 text-left text-[25px] font-medium text-black flex gap-3  tracking-wider " >
              <button className=' hover:scale-150  duration-200'>
                <Link to={"/admin/category/edit/"+ data._id}>
                <HiOutlinePencilSquare />
                </Link>
                </button>
              <button className=' hover:scale-150  duration-200' onClick={()=>deletHandler(data._id)}><MdDeleteForever /></button>
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
