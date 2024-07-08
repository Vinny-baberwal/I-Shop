import React, { useContext, useEffect } from 'react'
import Card from '../../../Components/Admin/Card'
import { Link } from 'react-router-dom' ;

export default function View() { 


  

 


  return (
   <>
   <Card>
      <div>
        <Link to={"/admin"}>Dashbord</Link> /
        <Link to={"/admin/admin-user"}>Admin-User</Link>/
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


     
     
    </tbody>
  </table>
</div>  
   </>
  )
}
