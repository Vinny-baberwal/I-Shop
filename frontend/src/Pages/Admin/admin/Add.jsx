import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../../Components/Admin/Card'
import axios from 'axios';
import { Context } from '../../../Context/MainContext';

export default function Add() {
const {apiColorBaseUrl,notify}= useContext(Context); 
const[errorMsg,setErrorMsg]=useState("");




 





  return (
    <>
    
    <Card>
     <div>
       <Link to={"/admin"}>Dashbord</Link> /
       <Link to={"/admin/admin-user"}>Admin-User</Link>/
       Add
     </div>
    </Card>




    <div className="p-4">
  <form className="space-y-6 "    >
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
      </label>
      <input
      // required="true"
        type="text"
        id="name"
        name="name"
        className="mt-1 p-2 uppercase focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />  
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
      // required="true"
        type="email"
        id="email"
        name="email"
        className="mt-1 p-2 uppercase focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />  
    </div>
        <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Password
      </label>
      <input
      // required="true"
        type="password"
        id="password"
        name="password"
        className="mt-1 p-2 uppercase focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      /> 
      {/* <span  className="block  text-red-700 p-2 text-center text-[19px]">{errorMsg}</span> */}
    </div>
    <div>
      <label htmlFor="is_super" className="block text-sm font-medium text-gray-700">
        Super Admin
      </label>
      <input
      // required="true"
        type="checkbox"
        id="is_super"
        name="is_super"
        className="mt-1 p-2 uppercase focus:ring-indigo-500 focus:border-indigo-500 block    shadow-sm sm:text-sm border-gray-300 rounded-md"
      />  
    </div>
   
    
    <div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </div>
  </form>
</div>

    
    </>
  )
}
