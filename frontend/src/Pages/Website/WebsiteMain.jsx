import React from 'react' 
import { Outlet } from 'react-router-dom'
import Header from '../../Components/Website/Header'
import Footer from '../../Components/Website/Footer'

function WebsiteMain() {
  return (
     <>
     <Header/>
     <Outlet/>
     <Footer/>
     </>
  )
}

export default WebsiteMain