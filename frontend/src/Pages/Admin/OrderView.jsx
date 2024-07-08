import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/MainContext';
import { FiCheckCircle, FiClock } from 'react-icons/fi';

export default function OrderView() {
const {fatchOrder,order}=useContext(Context);
const today = new Date().toISOString().split('T')[0];
  const [ordersItm, setOrdersItm] = useState(order);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
console.log(ordersItm,"uuuuuuuuu")



  useEffect(
    ()=>{
      fatchOrder();
      handleFilter();
    },[]
  )
    const handleFilter = () => {
      if (!startDate || !endDate) return;
  
      const filteredOrders = order.filter(order => {
        const orderDate = new Date(order?.createdAt);
        const start = startDate ? new Date(startDate).getTime() - 24 * 60 * 60 * 1000 : new Date('1970-01-01'); // Default start date to epoch if not set
        const end = endDate ? new Date(endDate) : new Date(today); // Default end date to today if not set
  
        return orderDate >= start && orderDate <= end;
      });
  
      setOrdersItm(filteredOrders);
      // console.log(filteredOrders,"ooooooo")
    };

    // const handleFilter = () => {
    //   const now = new Date();
    //   const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
    //   setStartDate(last24Hours.toISOString().split('T')[0]);
    //   setEndDate(now.toISOString().split('T')[0]);
  
    //   const filtered = order.filter(order => {
    //     const orderDate = new Date(order.createdAt);
    //     return orderDate >= last24Hours && orderDate <= now;
    //   });
  
    //   setOrdersItm(filtered);
    // };



    const formatDate = (dateString) => {
      const options = { day: '2-digit' , month: '2-digit' ,year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'};
      return new Date(dateString).toLocaleDateString('en-IN', options);
    };
  
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Order View</h1>
  
        <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">From</label>
              <input
                type="date"
                defaultValue={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">To</label>
              <input
                type="date"
                defaultValue={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="pt-5">
              <button
                onClick={handleFilter}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
  
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {ordersItm.map((order) => (
                <tr key={order?._id} className="hover:bg-gray-50">
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{order?._id}</p>
                    <span>{order.length}</span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{order?.shipping_details.name
                    }</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{formatDate(order?.createdAt)}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${order.order_status  ? 'text-green-900'  : 'text-yellow-900'}`}>
                             <span
                        aria-hidden
                        className={`absolute inset-0 ${order.order_status  ? 'bg-green-200' : 'bg-yellow-200'} opacity-50 rounded-full`}
                      ></span>
                      <span className="relative flex items-center">
                        {order.order_status  ? <FiClock className="mr-1" /> :<FiCheckCircle className="mr-1" /> } 
                        {order.order_status? 'Payment-done' : 'Order-Placed'}

                      </span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{order.order_total}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  