import React, { useState } from 'react'
import Container from '../Container'
import { FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from 'react-router-dom';
import { VscEyeClosed } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../reducer/UserSlice';
import { emptyCart } from '../../reducer/CartSlice';

function Header() {
  const [openMenu,setOpenMenu]=useState(false);
  const {cart,total}=useSelector(store=>store.cart);
  const user =useSelector(store=>store.user);
  const dispatcher=useDispatch();
  // console.log(user,"{}{}{}{}{")


const logoutHandler=()=>{
  dispatcher(logoutUser());
  dispatcher(emptyCart())
}




  const menuItems=[
    {
      name:"HOME",
      url:""
    },
    {
      name:"STORE",
      url:"/store",
      data:[
        {
          heading:"accessories",
          collection:[
            {
              name:"AirPort",
              url:"/accessories/airport"
            },
            {
              name:"Apple",
              url:"/accessories/apple"
            },
            {
              name:"AirPort",
              url:"/accessories/airport"
            },
            {
              name:"Apple",
              url:"/accessories/apple"
            },
            {
              name:"AirPort",
              url:"/accessories/airport"
            },
            {
              name:"Apple",
              url:"/accessories/apple"
            },
            {
              name:"AirPort",
              url:"/accessories/airport"
            },
            {
              name:"Apple",
              url:"/accessories/apple"
            },
            {
              name:"AirPort",
              url:"/accessories/airport"
            },
            {
              name:"Apple",
              url:"/accessories/apple"
            },
          ]
        },
        {
          heading:"Category",
          collection:[
            {
              name:"AirPort",
              url:"/accessories/airport"
            },
            {
              name:"Apple",
              url:"/accessories/apple"
            }
          ]
        }, {
          heading:"accessories",
          collection:[
            {
              name:"AirPort",
              url:"/accessories/airport"
            },
            {
              name:"Apple",
              url:"/accessories/apple"
            }
          ]
        }
      ]
    },
    {
      name:"IPHONE",
      url:"/iphone"
    },
    {
      name:"IPAD",
      url:"/ipad"
    },
    {
      name:"MACBOOK",
      url:"/macbook"
    },
    {
      name:"ACCESSORIES",
      url:"/accessories"
    },
  ]
  return (
    <>
    <header className='sticky top-0  bg-white z-[99]'>
      <div className=' hidden md:block py-3 shadow '> 
      <Container className="flex justify-between py-2 ">
       <div className='flex gap-3'>
        <span><select name="" id=""> <option value="">EN</option>
        <option value=""></option></select></span>
        <span><select name="" id=""> <option value="">$</option>
        <option value="">r</option></select></span>
       </div>
       <div className='flex gap-5'>
         <div className='flex gap-2  items-center '>
          {
             user.data ==null 
             ? <Link to={"/login"}>Login</Link>
             :<>
             <FaRegUser /> <span>Hi, {user?.data?.name}</span> 
             <span className=' cursor-pointer' onClick={logoutHandler}>Logout</span> </>
          } </div>
          {/* <div><button onClick={dispatcher(logoutUser())}>Logout</button></div> */}
         <div className='flex gap-2 items-center'>
          <Link to={"/cart"} className='flex items-center gap-2' ><HiOutlineShoppingBag /> {cart?.length} Items</Link>
          </div>
         <div>${~~total}</div>
       </div>
 
      </Container>
      </div>
   </header>

   <header>
      <Container>
       

       <div className=' flex justify-between p-4 md:justify-center md:py-6'  >
         <img src="../image\iSHOP Logo.svg" alt="" /> 
         <GiHamburgerMenu onClick={()=>setOpenMenu(true)} className='text-3xl md:hidden'/>

 
       </div>

        
          <nav className=' hidden md:flex justify-center gap-12 my-5 relative border ' id='menu-bar'>
            {
              menuItems.map(
                (item)=>{
                  return(
                    <div>
                    <NavLink to={item.url}>{item.name}</NavLink>
                    {
                      item.data != null && <Megamenu data={item.data}/>
                    }
                    </div>
                    
                  )
                }
              )
            }
          </nav>





          {/* responsive menu */}

          <div className='w-full h-[100vh]  fixed z-10 responsive top-0 duration-700 p-6 text-white font-bold text-2xl'
      style={
        {
          left: openMenu ? '0' : '-100%',
          opacity: openMenu? '1' : '0'
        }
      }  >
        <VscEyeClosed  fontSize={40} onClick={()=>setOpenMenu(false)}/>

        <Container className="flex justify-between py-2 pt-5 ">
       <div className='flex gap-3 text-black'>
        <span><select name="" id=""> <option value="">EN</option>
        <option value=""></option></select></span>
        <span><select name="" id=""> <option value="">$</option>
        <option value="">r</option></select></span>
       </div>
       <div className='flex gap-5'>
         <div className='flex gap-2  items-center '><FaRegUser /> My Profile</div>
         <div className='flex gap-2 items-center'><HiOutlineShoppingBag />Items</div>
         <div>$998</div>
       </div>
 
      </Container>
         
          <ul className=' relative my-5 '>
            {
              menuItems.map(
                (item)=>{
                  return(
                    <li className='flex my-9 justify-center items-center'>
                    <Link to={item.url}>{item.name}</Link>
                    </li>
                  )
                }
              )
            }
          </ul>

           </div>



          {/* responsive menu */}

        


       </Container>
    </header>
     
      </> 
  )
}

export default Header


function Megamenu({data}) {
  return (
    <div className={`w-full border-red-700 border left-0  absolute grid grid-cols-${data.length} mega-menu bg-white p-4 shadow`}>
      {
        data.map(
          (d,i)=>{
            return <div key={i}>  
              <h1>{d.heading}</h1>
              <div className='grid grid-cols-2'>
                {
                  d.collection.map(
                    (c,i)=> {
                      return <div key={i}>
                        {c.name}
                      </div>
                    }
                  )
                }
              </div>
            </div>
          }
          )
      }
    </div>
  )
}


