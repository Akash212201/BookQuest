import React from 'react'
import BookCard from './BookCard'

const Books = ({data}) => {
    
  return (
    <div className='flex flex-wrap my-5 items-center justify-center'>
        { 
            data.map((data)=>(
                <div key={data.id} className='mx-2 lg:mx-5 mb-6'>
                <BookCard item={data}/>
                </div>
            ))
        }
    </div> 
  )
}

export default Books
