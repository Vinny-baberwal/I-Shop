import React, { useContext, useEffect, useState } from 'react'
import Container from '../../Components/Container'
import ProductBox from '../../Components/Website/ProductsBox'
import { Context } from '../../Context/MainContext'
import { Link, NavLink, useParams, useSearchParams } from 'react-router-dom';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';


export default function Store() {
  const { tableData, fatchCategories , fatchProducts , productData ,colorData ,fatchColors} = useContext(Context);
  const [limit , setLimit]=useState(0);
  const [searchParams,setSearchParams]=useSearchParams();
  const {category_slug,color_name}=useParams();
  const [range,setRange]=useState({range_start:100,range_end:500000});

  // console.log(color_name,"color")
  // console.log(category_slug,"cat")


  useEffect(
    () => {
      fatchCategories();
      fatchColors();
     
    }, []
  )

  useEffect(
    ()=>{
      fatchProducts(category_slug??null, limit??searchParams.get("limit") ,range??null, color_name??null);
    },[category_slug,limit,color_name]
  )

  useEffect(
    ()=>{
      const searchParams ={}
     searchParams.limit =limit; 
     searchParams.range_start=range.range_start;
     searchParams.range_end=range.range_end;
    //  searchParams.color_code= color_code;
      setSearchParams(searchParams);
      
    },[limit,range,]
  )

const goFilter=()=>{
  fatchProducts(category_slug??null, limit??searchParams.get("limit") ,range??null, color_name??null);
}


  return (
    <>
      <Container>
        <div className='grid grid-cols-4 gap-6 w-full p-2'>

          {/* side bar */}
          <div className='border text-center' >
            <div className='bg-gray-50'>
              <h1 className='text-xl font-semibold'>Categories</h1>
              {
                tableData.map(
                  (cat) => {
                    return (
                      <NavLink to={"/store/" + cat.slug} >
                        <div className='flex justify-between p-4 cursor-pointer font-bold'>
                          {cat.name}
                          <span className=' opacity-[0.5]'>{cat.prodCount}</span></div>
                      </NavLink>
                    )

                  }
                )
              }
            </div>
            {/* ========== */}
            <div className='bg-red-200 my-5'>
              <h1 className='text-xl font-semibold'>Range Slider</h1>
               <div className='flex p-3 '>
                {range.range_start}
              <RangeSlider value={[range.range_start,range.range_end]} min="0"max="500000" className="my-9 mt-10" onInput={
                (d)=>setRange({range_start:d[0],range_end:d[1]})
              }/>
              {range.range_end}
              </div>
              <button className='bg-white p-3 w-full border-red-200 border-[5px]  ' onClick={goFilter} >Go</button>
              
            </div>
            {/* ================= */}

            <div className='bg-gray-100 my-5'>
              <h1 className='text-xl font-semibold'>colors</h1>
              <div className='flex justify-center items-center gap-1'>
              {
                colorData.map(
                  (col)=>{
                    return <Link to={"/store/"+ col.name}>
                     <div className='w-[30px] h-[30px] rounded-[50%] ' style={{
                      background:col.code
                    }}>
                      
                    </div>  </Link>
                  }
                )
              } 
            </div>

              
            </div>

          </div>

          {/* ------------------------------------------------ */}
          <div className=' col-span-3 border'>
            <div className='bg-[#2E90E5] md:flex justify-between lg:pr-10 '>
              <div className=' pl-14 pt-16 md:w-[250px]  py-4'>
                <h1 className='text-[42px]  text-white '>iPhone 8</h1>
                <h3 className=' w-[280px] p-1 text-white'>Performance and design. Taken right to the edge.</h3>
              </div>

              <img src="image/iphone_8.png" alt="" className=' ' />
            </div>

            {/* --------========== */}

            <div className='shadow my-4 bg-[#F6F7F8] py-2 px-3 rounded-[4px] flex gap-3'>
                <h3>{productData.length} Items</h3>
                 
                 <select className='bg-white p-2' value={limit} onChange={(e)=>setLimit(e.target.value)}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="0">All</option>

                 </select>

            </div>
{/* '''''''''''''''''''''''' */}

                <div className='grid  md:grid-cols-2 lg:grid-cols-3'>
                  {
                    productData.map(
                      (prod)=><ProductBox {...prod}/>
                    )
                  }

                </div>

          </div>
        </div>

      </Container>

    </>
  )
}
