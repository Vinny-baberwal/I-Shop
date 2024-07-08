import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
 
  

export default function SideBar() {
  const [openItemIndex,setOpenItemIndex]=useState(null)
  const admin=useSelector(store=>store.admin);

  const items =[
    {
      name:"DAshboard",
      url:"/admin",
      super_feature:false
    },
    {
      name:"Category",
      url:null,
      super_feature:false,
      subItems:[
        {
          name:"Add",
          url:"/admin/category/add"
        },
        {
          name:"View",
          url:"/admin/category/view"
        }
      ]
    },
    {
      name:"Color",
      url:null,
      super_feature:false,
      subItems:[
        {
          name:"Add",
          url:"/admin/color/add"
        },
        {
          name:"View",
          url:"/admin/color/view"
        }
      ]
    },
    {
      name:"Accessory",
      url:null,
      super_feature:false,
      subItems:[
        {
          name:"Add",
          url:"/admin/accessory/add"
        },
        {
          name:"View",
          url:"/admin/accessory/view"
        }
      ]
    },
    {
      name:"Product",
      url:null,
      subItems:[
        {
          name:"Add",
          url:"/admin/product/add"
        },
        {
          name:"View",
          url:"/admin/product/view"
        }
      ]
    },
    {
      name:"Admin User",
      url:null,
      super_feature:true,
      subItems:[
        {
          name:"Add",
          url:"/admin/admin-user/add"
        },
        {
          name:"View",
          url:"/admin/admin-user/view"
        }
      ]
    },
    {
      name:"Users",
      url:"/admin/user"
    },
    {
      name:"Orders",
      url:"/admin/Order-view",
      super_feature:true,
    },
    {
      name:"Transaction",
      url:"/admin/transaction",
      super_feature:true,

    }
  ]
  return (
    <div className=' col-span-1 bg-gradient-to-b from-indigo-500 ..  h-[100vh]'>
      <div className='text-center text-white p-3 text-xl'>IShop Admin</div>
      <hr />
      <ul>
        {
          items.map(
            (item,index)=>{
              if(item.super_feature==true && admin.data?.is_super==false){
                return null;
              }
              return(

                <li key={index} className='p-1 px-3 text-white font-bold' >
                  {
                    item.url !=  null
                    ? <Link to={item.url}>{item.name}</Link>
                    : <DropDown {...item} index={index} openItemIndex={openItemIndex} setOpenItemIndex={setOpenItemIndex}/>
                  }
                  </li>
              )
            }
          )
        }
      </ul>
    </div>
  )
}


const DropDown =({name, subItems, index , openItemIndex,setOpenItemIndex})=>{
  const [menuOpen, setMenuOpen] = useState(false);
 
  useEffect(
    ()=>{
if(openItemIndex==index){
  setMenuOpen(true);
}else{
setMenuOpen(false);
}
    },[openItemIndex]
  )

  const toggleMenu = () => {
   setMenuOpen(!menuOpen);
  };
  useEffect(
    ()=>{
if(menuOpen==true){
  setOpenItemIndex(index);
}else{ 
}
    },[menuOpen]
  )

  return (
    <div className="flex flex-col">
      <div className="relative">
        <button
          onClick={() => toggleMenu(true)}
          className=" text-white hover:bg-gray-400  font-bold  rounded inline-flex items-center"
        >
         {name}
        </button>
        {menuOpen && (
          <div className="top-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
            {/* Dropdown content for Dropdown 1 */}
            {
              subItems.map(
                (sb,index)=>{
                  return(
                    <Link key={index} to={sb.url} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" >{sb.name}</Link>
                  )
                }
              )
            }



             
          </div>
        )}
      </div>
     
    </div>
  );
};
