import React, { useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Context } from '../../Context/MainContext';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../reducer/CartSlice';

const ProductCarousel = ({ products }) => {
    const dispatcher =useDispatch();

    const{apiBaseUrl}=useContext(Context);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
    <Slider {...settings}>
      {products.map(product => (
         <div className='shadow p-2 m-4 text-center  relative hover:scale-[0.9] duration-300' key={product._id} >
        <div className=' absolute top-0 left-0 bg-red-500 m-1 px-2 rounded'>{
        product.discount_percent!=0? product.discount_percent: "0" }% off</div>
        {/* <img src={apiBaseUrl+"/image/product/"+product.image} alt=""  className='mx-auto mb-2'/> */}
        <div>{product.name}</div>
        {/* <Stars yellow={2} /> */}
        <div className='my-2'>
            <span className='text-[#FF4858] pt-2' >${~~product.final_price}</span>
            <span className='text-[#C1C8CE]  line-through px-1 py-9 ' >${product.original_price}</span>
        </div> 
        <button  onClick={()=>dispatcher(addToCart({pId:product.product_id, price: product.final_price}))}
        className='p-2 border hover:bg-blue-500 mx-auto my-3 block duration-200'>Add to Cart</button>
    </div>
        // <div key={product.id} className="p-4">
        //   <img src={product.image} alt={product.name} className="mx-auto" />
        //   <div className="text-center">
        //     <h2 className="text-lg font-semibold">{product.name}</h2>
        //     <p className="text-gray-600">${product.final_price}</p>
        //   </div>
        // </div>
      ))}
    </Slider>
  );
};

export default ProductCarousel;
