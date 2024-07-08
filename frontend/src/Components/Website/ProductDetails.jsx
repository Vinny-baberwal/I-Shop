import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../../Context/MainContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ProductDetails() {
    const { productData,apiBaseUrl,fatchProducts}= useContext(Context);
    const [mainImage, setMainImage] = useState(null); 
    const {id} =useParams(); 
console.log(productData,"kjhgfdsazxcvghuiuytrewdfghgfdewdsfv") 

 useEffect(
  ()=>{
    fatchProducts();

  },[]
 )


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



  

    
  return (
    <>
    {
        productData.map(
            (prod)=>{
                if(prod._id==id){
                 return   <div className="min-h-screen bg-gray-100 p-6">
                 <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
                   <div className="flex flex-col lg:flex-row">
                     {/* Product Image */}
                     <div className="lg:w-1/2 flex flex-col items-center p-4 ">
                      
                      {
                        mainImage == null ?   <img
                        src={apiBaseUrl+"/image/product/"+prod.image}
                         alt="Product"
                         className="rounded-lg shadow-md  w-[500px] h-[500px]"
                       /> 
                       :  <img
                       src={apiBaseUrl+"/image/product/"+mainImage}
                        alt="Product"
                        className="rounded-lg shadow-md  w-[500px] h-[500px] "
                      />
                      }
                   
                       <div className="flex space-x-2 mt-4 overflow-hidden">
                      
                         {prod.other_image.map((image, index) => (
                           <img
                             key={index}
                             src={apiBaseUrl+"/image/product/"+image}
                             alt={`Thumbnail ${index + 1}`}
                             className={`w-40 h-46 rounded-lg cursor-pointer border-2  ${
                               mainImage === image ? 'border-blue-500' : 'border-transparent'
                             }`}
                             onClick={() => setMainImage(image)}
                           />
                         ))}
                        
                         <img
                        src={apiBaseUrl+"/image/product/"+prod.image}
                         alt="Product"
                         onClick={() => setMainImage(prod.image)}
                         className="rounded-lg shadow-md w-40 h-46  cursor-pointer"
                       /> 
                     
                       </div>
                       
                     </div>
                     {/* Product Details */}
                     <div className="lg:w-1/2 p-4">
                       <h1 className="text-3xl font-bold text-gray-800">{prod.name}</h1>
                       <p className="text-gray-600 mt-2">{prod.category_id.name}</p>
                       <p className="text-2xl font-semibold text-gray-900 mt-4">Price : {prod.final_price} 
                       <span className=' line-through mx-2 opacity-50 font-thin'>{prod.original_price}</span>
                       <div className='text-red-500 font-thin'> Save :{prod.original_price-prod.final_price}</div></p>
                       <p className="text-gray-700 mt-4">
                        {prod.discription}
                       </p>
                       <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                         Add to Cart
                       </button>
                     </div>
                   </div>




                   {/* Frequently Bought Together */}

                        
                   <div className="mt-14 ">
                     <h2 className="text-2xl font-bold text-gray-800">Frequently Bought Together</h2>
                     <div className="flex flex-wrap justify-between mt-6">
                            {/* Product 1 */}
                     {
                          prod.accessory_id.map(
                            (access)=>{
                              return   <div className="w-full md:w-1/3 p-4">
                              <div className="bg-white shadow-lg rounded-lg p-4">
                                <img
                                  src={apiBaseUrl+"/image/accessory/"+access.image}
                                  alt="Product 1"
                                  className="rounded-lg shadow-md mx-auto"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mt-4">Product 1{access.name}</h3>
                                <p className="text-gray-700 mt-2">${access.price}</p>
                                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                            }
                          )
                         }
 
                     </div>
                     <Slider {...settings}>
                      <div>hellokjhgfghjkjhgh</div>

                     </Slider>
                   </div>
                 </div>
               </div>
                }
            }
        )
    }
   
  </>
  )
}

export default ProductDetails
