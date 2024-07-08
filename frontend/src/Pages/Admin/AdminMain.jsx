import React from 'react' 
import { Outlet } from 'react-router-dom'
import Header from '../../Components/Admin/Header' 
import SideBar from '../../Components/Admin/SideBar'


function AdminMain() {
  return (
     
     <div className='grid grid-cols-5'>
      <SideBar/>
      <div className='col-span-4'>
        <Header/>
        <Outlet/>

      </div>





     </div>
     
  )
}

export default AdminMain