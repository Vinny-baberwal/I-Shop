import React from 'react'

export default function Card(props) {
  return (
    <div className='py-3 shadow'>
        {props.children}
      
    </div>
  )
}
