import React from 'react'
import Container from '../Container'

function Footer() {
  return (
    <div className='bg-gray-100 mt-[50px]'>
    <Container>
    <footer className=" py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-1/3 xl:w-1/4 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold"><img src="images/ishop.png" alt="" /></h2>
            <p className="text-gray-600 mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
              the industry's standard dummy text ever since the 1500s, when an unknown printer.
            </p>
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4">
              Explore More
            </button>
          </div>
          <div className="w-full md:w-1/3 xl:w-1/4 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold">Follow Us</h2>
            <p className="text-gray-600 mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
              the industry's standard dummy text ever since the 1500s, when an unknown printer.
            </p>
            <div className="flex mt-2">
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-4">
                <i className="fab fa-facebook-f fa-2x"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-4">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-4">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3 xl:w-1/4 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold">Contact Us</h2>
            
            <ul className="text-gray-600 mt-2">
              <li>
                <i className="fas fa-map-marker-alt mr-2"></i>
                iShop: address @building 124
              </li>
              <li>
                <i className="fas fa-phone mr-2"></i>
                Call us now: 0123-456-789
              </li>
              <li>
                <i className="fas fa-envelope mr-2"></i>
                Email: support@whatever.com
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    <div className='border border-b-1 mb-[50px]'></div>
    </Container>
    
 <Container>
  
 <footer className="">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">Infomation</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">About Us</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Infomation</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4">Service</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">About Us</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Infomation</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4">Extras</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">About Us</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Infomation</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4">My Account</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">About Us</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Infomation</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4">Userful Links</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">About Us</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Infomation</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4">Our Offers</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">About Us</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Infomation</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-700 transition duration-300 ease-in-out">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        <div className='border border-b-1 mt-[30px]'></div>

        <div className="flex justify-center items-center mt-8">
          <img src="/image/Western_union.svg" alt="Mastercard" className="h-6 mr-4" />
          <img src="/image/master_card.svg" alt="Paypal" className="h-6 mr-4" />
          <img src="/image/Paypal.svg" alt="Visa" className="h-6 mr-4" />
          <img src="/image/visa.svg" alt="Visa" className="h-6 mr-4" />

        </div>
      </div>
    </footer>

 </Container>
 </div>

  )
}

export default Footer
