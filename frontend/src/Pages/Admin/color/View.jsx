import React, { useContext, useEffect } from 'react'
import Card from '../../../Components/Admin/Card'
import { Link } from 'react-router-dom'
import { Context } from '../../../Context/MainContext'
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';

export default function View() {
  const {fatchColors, colorData, apiColorBaseUrl,notify}=useContext(Context);


  useEffect(
    ()=>{
    fatchColors();
    },
    []
  )



  const deletHandler=(color_id)=>{
    // console.log(category_id, "idddddddd");
    axios.delete(apiColorBaseUrl+"/delete/"+color_id
    ).then(
      (success)=>{
    // console.log(success ,"success");

         if(success.data.status==1){
          fatchColors();
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
        <Link to={"/admin/color"}>Color</Link>/
        View

      </div>
     </Card>



{/*  =-====-==---===----------==== */}


 
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
          Color Code
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
        >
          Color Shade
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
        colorData.map(
          (color,index)=>{
            return (
            <tr className="bg-gray-50" key={color.id} >
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{index+1}</td>
            <td className="px-6 py-3 text-left text-xs  font-bold text-gray-500  tracking-wider"
                style={
                  {
                    color:`${color.code}`
                  }
                } 
            >{color.name}</td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{color.code}</td>
            <td className="px-6 py-3 text-left text-xs font-medium text-white  tracking-wider border-[2px]" 
            style={
              {
                background:`${color.code}`
              }
            } >Shade</td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" >{color.status==1 ? "active":"Inactive"  }</td>
            <td className="px-6 py-3 text-left text-[25px] font-medium text-black flex gap-3  tracking-wider " > 
              <button className=' hover:scale-150  duration-200'><HiOutlinePencilSquare /></button>
              <button className=' hover:scale-150  duration-200' onClick={()=>deletHandler(color._id)}><MdDeleteForever /></button>
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
