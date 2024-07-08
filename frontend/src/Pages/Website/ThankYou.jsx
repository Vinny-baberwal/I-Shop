import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ThankYou() {
    const {id}=useParams();
    const navigator=useNavigate();



    const home=()=>{
        navigator('/');
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
    <div className="bg-white p-10 rounded-lg shadow-2xl text-center max-w-lg mx-4">
      <div className="flex justify-center mb-6">
        <div className="rounded-full  shadow-lg">

        <img src="/image/righttick.png" alt="Logo" className="    scale-[1.5]    "/>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-800">Thank You for Your Order!</h1>
      <p className="mt-4 text-lg text-gray-600">Your order has been placed successfully. We appreciate your business!</p>
      <p className="mt-2 text-lg text-gray-600">Order Number: <span className="font-semibold">{id || 'N/A'}</span></p>
      <a href="/" className="mt-6 inline-block px-8 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition duration-300">Continue Shopping</a>
    </div>
  </div>
  )
}

export default ThankYou
