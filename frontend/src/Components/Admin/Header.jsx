import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function Header() {
const admin =useSelector(store=>store.admin);
const navigator=useNavigate();


// useEffect(
//   ()=>{

//     if(admin.data==null){
//       navigator("/admin/login")
//     }else{
//       navigator("/admin")
//     }
    
//   },[admin]
// )




  return (
    <div className='py-4 shadow'>
      Header 

      toh kese hai aap log
    </div>
  )
}
