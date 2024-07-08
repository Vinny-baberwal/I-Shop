import React, { useContext, useEffect, useState } from 'react'
import Container from '../../Components/Container'
import ProductsBox from '../../Components/Website/ProductsBox'
import { Context } from '../../Context/MainContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, userDBcart } from '../../reducer/CartSlice';
import ProductCarousel from '../../Components/Website/ProductSlider';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import axios from 'axios';



function Home() {
  let { fatchCategories, fatchProducts, tableData, productData, bestProduct, bestSeller, apiBaseUrl } = useContext(Context);
  const [selected_cat, setSelected_cat] = useState(0);
  const user =useSelector(store=>store.user)
  const dispatcher = useDispatch();
  // console.log(bestProduct)
  useEffect(
    () => {
      fatchCategories();
      fatchProducts();
      bestSeller();
    }, []
  )
  // console.log(productData)

  if (selected_cat != 0) {
    bestProduct = bestProduct.filter(
      (prod) => prod.category_id._id == selected_cat
    )
  }


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: "60px",
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay interval in milliseconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  const addToCartHandler=({pId:product_id, price: final_price})=>{
    if(user.data==null){
        dispatcher(addToCart({pId:product_id, price: final_price}));
    }else{
        axios.post(
            apiBaseUrl+"/user/add-to-cart",
            {
              user_id:user.data._id,
              cartData: {pId:product_id, qty:1,price:final_price}
            
            }
          ).then(
            (success)=>{
              // console.log(success)
      dispatcher(addToCart({pId:product_id, price: final_price, user_id:user.data._id}))
    
              if(success.data.status==1){
              let total =0;
                const d =success?.data.userCart?.map(
                  (uc)=>{
                    
                    const found =productData.find(p=>p._id==uc.product_id);
                    // console.log(found);
                    if(found){
                      total =total +(found.final_price*uc.qty)
                      }
                     return {
                       pId:uc.product_id,
                      qty:uc.qty
                  }
                  }
               );
    
              //  console.log(d,"pppppppppp");
                dispatcher(userDBcart({userDBcart:d,total}))
              }
            
            }
          ).catch(
            (error)=>{
              // console.log(error)
              }
          )
    }
    }




  return (
    <>
      <section className='background  h-[500px] md:h-[650px]'>
        <Container className='relative  h-full '>

          <img src="\image\2_corousel.png" alt="" className='absolute h-[85%] md:h-full right-0  bottom-0' />


        </Container>
        
      </section>

        <Container>
          <div className='text-3xl font-bold uppercase m-4 text-center'>best seller</div>
          <nav>
            <ul className='hidden md:flex justify-center gap-16 m-1  font-semibold ' >
              <li className=' cursor-pointer' onClick={() => setSelected_cat(0)}>All</li>
              {
                tableData.map(
                  (data, i) => {
                    return (
                      <li className=' cursor-pointer' onClick={() => setSelected_cat(data._id)} key={i}>{data.name}</li>
                    )
                  }
                )
              }
              {/* <li >All</li>
            <li>Mac</li>
            <li>iphone</li>
            <li>ipad</li>
            <li>ipod</li>
            <li>Accessories</li> */}
            </ul>

            <select onChange={(e) => setSelected_cat(e.target.value)} className='block md:hidden text-center mx-auto  text-xl p-2  m-1  font-semibold bg-[#F8F8F8] '>
              <option value={0}>All</option>
              {
                tableData.map(
                  (data, i) => {
                    return (
                      <option key={i} className='text-center' value={data._id}>{data.name}</option>
                    )
                  }
                )
              }
              {/* 
           <option>Mac</option>
           <option>iphone</option>
           <option>ipad</option>
           <option>ipod</option>
           <option>Accessories</option> */}

            </select>
          </nav>

        </Container>


        <Container className=" grid md:grid-cols-2 lg:grid-cols-4 mt-6 ">
          {
            bestProduct?.map(
              (prod,i) => {
                return (<div key={i} className='shadow p-2 m-4 text-center  relative hover:scale-[1.1] duration-300' >
                  <div className=' absolute top-0 left-0 bg-red-500 m-1 px-2 rounded'>{
                    prod.discount_percent != 0 ? prod.discount_percent : "0"}% off</div>
                  <Link to={"product-details/" + prod._id}><img src={apiBaseUrl + "/image/product/" + prod.image} alt="" className='mx-auto mb-2' />
                   <div>{prod.name}</div> </Link>
                  {/* <Stars yellow={2} /> */}
                  <div className='my-2'>
                    <span className='text-[#FF4858] pt-2' >${~~prod.final_price}</span>
                    <span className='text-[#C1C8CE]  line-through px-1 py-9 ' >${prod.original_price}</span>
                  </div>
                  {/* <button onClick={() => dispatcher(addToCart({ pId: prod._id, price: prod.final_price }))}
                    className='p-2 border hover:bg-blue-500 mx-auto my-3 block duration-200'>Add to Cart</button> */}
                       <button  onClick={()=>addToCartHandler({pId:prod._id, price: prod.final_price,user_id:user.data?._id})}
                         className='p-2 border hover:bg-blue-500 mx-auto my-3 block duration-200'>Add to Cart</button>
                </div>
                )

              }
            )
          }




        </Container>

        {/* ------------ */}

        <section className='bg-[#2E90E5] mt-[95px] relative'>
          <Container>
            <div className='bg-[#2E90E5] md:flex justify-between lg:pr-10 h-[450px]'>
              <div className=' pl-12 pt-16 w-[190px] md:w-[250px]  py-4'>
                <h1 className=' text-[32px] md:text-[42px]  text-white '>iPhone 8</h1>
                <h3 className=' w-[200px] md:w-[280px] p-1 text-white'>Performance and design. Taken right to the edge.</h3>
              </div>

              <img src="image/iphone_6_plus.png" alt="" className=' absolute  bottom-0 pt-6 md:right-[150px] md:top-[-50px] md:h-[500px] h-[300px]' />
            </div>

          </Container>


        </section>



        <Container className="mt-14 p-2 m-3">
          <div className=' grid grid-cols-1 md:grid-cols-3 p-3 '>
            <div className='text-center p-4'>
              <img src="/image/shipping.svg" alt="" className='mx-auto py-4'/>
              <h3 className='font-bold text-xl py-2'>FREE SHIPPING</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam,
                 quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
              </p>
            </div>

            <div className='text-center p-4'>
              <img src="/image/refund.svg" alt="" className='mx-auto py-3'/>
              <h3 className='font-bold text-xl py-2'>100% REFUND</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam,
                 quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
              </p>
            </div>


            <div className='text-center p-4'>
              <img src="/image/support.svg" alt="" className='mx-auto py-3'/>
              <h3 className='font-bold text-xl py-2'>SUPPORT 24/7 </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam,
                 quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
              </p>
            </div>

          </div>
        </Container>


        {/* ----------------sliderr  sliderrrrrrrr------- */}


        <Container>
          <h1 className='p-2 text-center text-2xl font-bold mt-6'>FEATURED PRODUCTS</h1>
          <Slider {...settings}>

            {
              bestProduct?.map(
                (prod) => {
                  return (<div className='shadow p-2 m-4 text-center  relative hover:scale-[1] duration-300  w-[100px] scale-[0.9]'   >
                    <div className=' absolute top-0 left-0 bg-red-500 m-1 px-2 rounded'>{
                      prod.discount_percent != 0 ? prod.discount_percent : "0"}% off</div>
                    <img src={apiBaseUrl + "/image/product/" + prod.image} alt="" className='mx-auto mb-2' />
                    <Link to={"product-details/" + prod._id}> <div>{prod.name}</div> </Link>
                    {/* <Stars yellow={2} /> */}
                    <div className='my-2'>
                      <span className='text-[#FF4858] pt-2' >${~~prod.final_price}</span>
                      <span className='text-[#C1C8CE]  line-through px-1 py-9 ' >${prod.original_price}</span>
                    </div>
                    <button onClick={() => dispatcher(addToCart({ pId: prod._id, price: prod.final_price }))}
                      className='p-2 border hover:bg-blue-500 mx-auto my-3 block duration-200'>Add to Cart</button>
                  </div>
                  )

                }
              )
            }
          </Slider>
        </Container>
        {/* ----slider end */}


        















    </>
  )
}

export default Home


