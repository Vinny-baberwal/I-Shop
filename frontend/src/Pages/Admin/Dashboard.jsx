import React, { useContext } from 'react'
import Card from '../../Components/Admin/Card'
import {Link} from 'react-router-dom'
import { BarChart } from '@mui/x-charts/BarChart';
import { Context } from '../../Context/MainContext';
export default function Dashboard() {
  const {order}=useContext(Context);


for( let i of order){
  console.log(i.totalPrice)
}





  return (
     <>
     <Card>
      <div>
        <Link to={"/admin"}>Dashbord</Link> /
        <div>{order.length}</div>
         
      </div>
     </Card>
     <div>
     <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: ['bar A', 'bar B', 'bar C'],
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: [order.length, 5, 50],
        },
      ]}
      width={500}
      height={300}
    />
     </div>
     </>
  )
}
