import React, { useContext, useEffect } from 'react'
import Card from '../../../Components/Admin/Card'
import { Link } from 'react-router-dom'
import { Context } from '../../../Context/MainContext'
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';

export default function View() {
const apiBaseUrl= process.env.REACT_APP_API_BASE_URL;

  const{fatchAccessory,accessoryData,apiAccessoryBaseUrl,notify}=useContext(Context);





  useEffect(
    ()=>{
    fatchAccessory();
    },[]
  )


  const deletHandler=(accessory_id)=>{
    // console.log(accessory_id, "idddddddd");
    axios.delete(apiAccessoryBaseUrl+"/delete/"+accessory_id
    ).then(
      (success)=>{
    // console.log(success ,"success");

         if(success.data.status==1){
          fatchAccessory();
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
       <Link to={"/admin/accessory"}>Accessory</Link>/
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
         Action
       </th>
     </tr>
   </thead>
   <tbody className="bg-white divide-y divide-gray-200">
     {/* Your table rows go here */}


     {
       accessoryData.map(
         (data,index)=>{
           return (
           <tr className="bg-gray-50" key={data.id} >
           <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{index+1}</td>
           <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{data.name}</td>
           <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{data.slug}</td>
           <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{data.price}</td>

           <td className=" py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >
             <img src={apiBaseUrl+"/image/accessory/"+data.image} alt="" width={120} />
             </td>
           <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{data.status==1 ? "active":"Inactive"  }</td>
           <td className="px-6 py-3 text-left text-[25px] font-medium text-black flex gap-3  tracking-wider " >
             <button className=' hover:scale-150  duration-200'>
              <Link to={"/admin/accessory/edit/" + data._id}>
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
