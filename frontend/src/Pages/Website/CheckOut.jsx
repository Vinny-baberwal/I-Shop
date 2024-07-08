import React, { useContext, useEffect, useRef, useState } from 'react'
import Container from '../../Components/Container'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { Context } from '../../Context/MainContext';
import { useNavigate } from 'react-router-dom';
import { emptyCart } from '../../reducer/CartSlice';
import useRazorpay from "react-razorpay";



function getProcessingFee(flag){
    if(flag==1){
        return 50
    }else{
        return 0
    }
}

function CheckOut() {
    const {apiBaseUrl,notify}=useContext(Context);
const {data:userData}=useSelector(store=>store.user);
const{total}=useSelector(store=>store.cart);
const[payment_mode,setPayment_mode]=useState(0)
const checkoutForm=useRef();
const [address,setAddress]=useState([]);
const[userAdd,setUserAdd]=useState();
const navigator =useNavigate();
const dispatcher=useDispatch();
// console.log(userData?._id,"save addrss")
const [Razorpay] = useRazorpay();
console.log(address,"00000000")




const getAddress=()=>{
  axios.get(
    `${apiBaseUrl}/user/get-address/${userData?._id}`

  ).then(
    (success)=>{
    if(success.data.status==1){
      // console.log(success.data,"<><><><><><><><><><><><><><><><><><><><><>");   
      setAddress(success.data.address);

    }   
    }
  ).catch(
  (error)=>{
// console.log(error)
  }
  )
}

const addAddress=()=>{
const data ={
    name:checkoutForm.current.name.value,
    email:checkoutForm.current.email.value,
    contact:checkoutForm.current.contact.value,
    address:checkoutForm.current.address.value,
    pincode:checkoutForm.current.pincode.value,
    city:checkoutForm.current.city.value,
    state:checkoutForm.current.state.value
}
axios.post(
apiBaseUrl+"/user/add-address/"+userData?._id,
data
).then(
    (success)=>{
        console.log(success.data);
        if(success.data.status==1){
        }else{

        }
       notify(success.data.msg,success.data.status);

    }
).catch(
    (error)=>{
        console.log(error);
    }
)
}
 
const placedOrder =(e)=>{
  e.preventDefault();
  const data ={
    user_id:userData?._id,
   payment_mode:payment_mode,
   shipping_details:{
      name:checkoutForm.current.name.value,
      email:checkoutForm.current.email.value,
      contact:checkoutForm.current.contact.value,
      address:checkoutForm.current.contact.value,
      pincode:checkoutForm.current.pincode.value,
      city:checkoutForm.current.city.value,
      state:checkoutForm.current.state.value
    }
    }
    axios.post(
      apiBaseUrl+"/order/create" 
      ,data
      ).then(
        (success)=>{
          console.log(success.data);
          if(success.data.status){
            if(payment_mode==1){
              navigator("/thanks-you/"+success.data.order_id)
              dispatcher(emptyCart());
            }else{
              //online payment
              initRozarpay(success.data.order,success.data.razorpay_order);
            }
           
            
            }else{
            }
            notify(success.data.msg,success.data.status);
              }
              ).catch(
                (error)=>{
                  console.log(error);
                  }
                  )
                  
}


const initRozarpay=(order,razorpay_order)=>{
  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
    amount: order.order_total*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "IShop Pvd. Lmt.",
    description: "Transaction for "+ order._id,
    image: "http://localhost:3000/image/iSHOP%20Logo.svg",
    order_id: razorpay_order.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
    handler: function (response) {
   console.log(response)
   axios.post(
    apiBaseUrl+"/order/payment-success",
    {
      ...response,
      order_id:order._id,
      user_id:userData?._id,
      amount:order.order_total
    }
   ).then(
    (success)=>{
      console.log(success.data);
      if(success.data.status==1){
        navigator("/thanks-you/"+success.data.order_id)
        dispatcher(emptyCart());
      }
    }
   ).catch(
    (error)=>{
      console.log(error);
    
      }
   )
    },
    prefill: {
      name: userData?.name,
      email: userData?.email,
      // contact: userData?.contact,

    },
    // notes: {
    //   address: "Razorpay Corporate Office",
    // },
    theme: {
      color: "#ff4252",
    },
  };
  const rzp1 = new Razorpay(options);

  rzp1.on("payment.failed", function (response) {
   console.log(response.error.metadata,"[][][][][][][][][][]")
   axios.post(
    apiBaseUrl+"/order/payment-failed",
    {
      ...response.error.metadata,
      order_id:order._id,
      user_id:userData?._id,
      amount:order.order_total
    }
   ).then(
    (success)=>{
      console.log(success.data);
      if(success.data.status==1){
        // navigator("/thanks-you/"+success.data.order_id)
      }
    }
   ).catch(
    (error)=>{
      console.log(error);
    }
   )
  });

  rzp1.open();

}



// console.log(userAdd,"00000000")


useEffect(
  ()=>{
  getAddress();
  },[userData]
);

  return (
   <Container>
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
  <form  ref={checkoutForm} onSubmit={placedOrder} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    
    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
      <div className="min-w-0 flex-1 space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Delivery Details
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="your_name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                {" "}
                Your name{" "}
              </label>
              <input
              defaultValue={userData?.name}
                type="text"
                id="name"
                name='name'
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Bonnie Green"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="your_email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                {" "}
                Your email*{" "}
              </label>
              <input
              defaultValue={userData?.email}
                type="email"
                id="email"
                name='email'
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="name@flowbite.com"
                required=""
              />
            </div>
           
            <div>
              <div className="mb-2 flex items-center gap-2">
                <label
                  htmlFor="select-city-input-3"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {" "}
                  City*{" "}
                </label>
              </div>
              <input
              defaultValue={address[userAdd]?.city}
                type="text"
                id="select-city-input-3"
                name='city'
                // defaultValue={address[0]?.city}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="state"
                required=""
              />
              {/* <select
                id="select-city-input-3"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option selected="">San Francisco</option>
                <option value="NY">New York</option>
                <option value="LA">Los Angeles</option>
                <option value="CH">Chicago</option>
                <option value="HU">Houston</option>
              </select> */}
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2">
                <label
                  htmlFor="select-city-input-3"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {" "}
                  State*{" "}
                  
                </label>
              </div>
              <input
                type="text"
                id="select-state-input-4"
                name='state'
                defaultValue={address[userAdd]?.state}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="City"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="phone-input-3"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                {" "}
                Phone Number*{" "}
              </label>
              <div className="flex items-center">
                <button
                  id="dropdown-phone-button-3"
                  data-dropdown-toggle="dropdown-phone-3"
                  className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                  type="button"
                >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 30 20"
                      width={22}
                      height={12}
                  >
                      <rect width={30} height={20} fill="#FF9933" />
                      <rect y="6.67" width={30} height="6.67" fill="#FFFFFF" />
                      <rect y="13.33" width={30} height="6.67" fill="#138808" />
                      <circle cx={15} cy={10} r={3} fill="#000080" />
                      <circle cx={15} cy={10} r="2.7" fill="#FFFFFF" />
                      <path
                          d="M15 7.1v5.8M12.9 8.2l4.2 3.6M12.9 11.8l4.2-3.6M10.9 10h6.2M10.9 8.2l4.2 3.6M10.9 11.8l4.2-3.6"
                          stroke="#000080"
                          strokewidth="0.5"
                      />
                  </svg>

                
                  +91
              
                </button>
              
                <div className="relative w-full">
                  <input
                    type="text"
                    defaultValue={address[userAdd]?.contact}
                    id="phone-input"
                   name='contact'
                    className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500"
                    pattern="[6-9]{1}[0-9]{9}"
                    placeholder="123-456-7890"
                    required=""
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="pincode"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                {" "}
                Pincode{" "}
              </label>
              <input
              maxLength={6}
                type="number"
                defaultValue={address[userAdd]?.pincode}
                id="pincode"
                name='pincode'
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Pincode"
                required=""
              />
            </div>
            <div className=' col-span-2'>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                {" "}
                Complete Address {" "}
              </label>
             <textarea 
             name="address" 
             defaultValue={address[userAdd]?.address}
             id="address"
             className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
             >

             </textarea>
            </div>
          
            <div className="sm:col-span-2">
               
              <button
                type="button"
                disabled={address?.length>=6?true:false}
                onClick={addAddress}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
                save this address
              </button>
            </div>
          </div>
        </div>

{/* --------------- */}

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Saved Address
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
           
          {
                  
                 address?.map(
                    (add,i)=>{
                      return (
                        <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                            checked={userAdd==i?true:false}
                            onChange={(e)=>setUserAdd(e.target.value)}
                            value={i}
                             
                              aria-describedby="paypal-text"
                              type="radio"
                             
                              defaultValue=""
                              className="h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                            />
                          </div>
                          <div className="ms-4 text-sm">
                            <label
                              htmlFor="paypal-2"
                              className="font-medium leading-none text-gray-900 dark:text-white"
                            >
                              {" "}
                              {add.name}{" "}
                             
                            </label>
                            <p
                              id="pay-on-delivery-text"
                              className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                            >
                                {add.address}{" "}
                                {add.city}{" "}
                                {add.state}{" "}
                                {add.pincode}{" "}

                            </p>
                         
                          </div>
                        </div>
                        
                      </div>
                         
                      )
                    }
                  )
                 }
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                  checked={payment_mode==0?true:false}
                  onChange={(e)=>setPayment_mode(0)}
                    id="razorpay"
                    aria-describedby="paypal-text"
                    type="radio"
                    name="payment-method"
                    defaultValue=""
                    className="h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                </div>
                <div className="ms-4 text-sm">
                  <label
                    htmlFor="paypal-2"
                    className="font-medium leading-none text-gray-900 dark:text-white"
                  >
                    {" "}
                    Razorpay account{" "}
                  </label>
                  <p
                    id="pay-on-delivery-text"
                    className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                  >
                     pay via UPI, cards etc.
                  </p>
               
                </div>
              </div>
              
            </div>
          </div>
        </div>
{/* ---------- */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Payment
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
           
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                  checked={payment_mode==1?true:false}
                  onChange={(e)=>setPayment_mode(1)}
                    id="pay-on-delivery"
                    aria-describedby="pay-on-delivery-text"
                    type="radio"
                    name="payment-method"
                    defaultValue=""
                    className="h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                </div>
                <div className="ms-4 text-sm">
                  <label
                    htmlFor="pay-on-delivery"
                    className="font-medium leading-none text-gray-900 dark:text-white"
                  >
                    {" "}
                    Payment on delivery{" "}
                  </label>
                  <p
                    id="pay-on-delivery-text"
                    className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                  >
                    +$50 payment processing fee
                  </p>
                </div>
              </div>
            
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                  checked={payment_mode==0?true:false}
                  onChange={(e)=>setPayment_mode(0)}
                    id="razorpay"
                    aria-describedby="paypal-text"
                    type="radio"
                    name="payment-method"
                    defaultValue=""
                    className="h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                </div>
                <div className="ms-4 text-sm">
                  <label
                    htmlFor="paypal-2"
                    className="font-medium leading-none text-gray-900 dark:text-white"
                  >
                    {" "}
                    Razorpay account{" "}
                  </label>
                  <p
                    id="pay-on-delivery-text"
                    className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                  >
                     pay via UPI, cards etc.
                  </p>
               
                </div>
              </div>
              
            </div>
          </div>
        </div>
     
    
      </div>
      <div className=" sticky top-[90px] mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
        <div className="flow-root">
          <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Subtotal
              </dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">
              ₹ {total}
              </dd>
            </dl>
           
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Processing Fee
              </dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">
              ₹ {getProcessingFee(payment_mode)}
              </dd>
            </dl>
          
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-bold text-gray-900 dark:text-white">
                Total
              </dt>
              <dd className="text-base font-bold text-gray-900 dark:text-white">
              ₹{~~total+ getProcessingFee(payment_mode)}
              </dd>
            </dl>
          </div>
        </div>
        <div className="space-y-3">
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Proceed to Payment
          </button>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            One or more items in your cart require an account.{" "}
            <a
           
              title=""
              className="font-medium text-blue-700 underline hover:no-underline dark:text-blue-500"
            >
              Sign in or create an account now.
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  </form>
</section>
 

   </Container>
  )
}

export default CheckOut
