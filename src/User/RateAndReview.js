import React, { useState } from 'react'

const RateAndReview = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('Add one dropdown to select user purchased books to give rating. Make review feild optional');

  return (
    <div className='lg:me-6 me-2 my-3 p-6 '>
      <h1 className='mb-4 text-2xl font-semibold tracking-wide'>Rating and Review</h1>
      {
        [1, 2, 3, 4, 5].map((num) => (
          <button
            className='outline-none cursor-pointer me-2 text-4xl bg-transparent'
            key={num}
            onClick={() => setRating(num)}
            onMouseOver={() => setHover(num)}
            onMouseLeave={() => setHover(rating)}
          >
            <span
              className={`${num <= ((rating && hover) || hover) ? 'text-green-500' : 'text-[#ccc]'}`}>
              &#9733;</span>
          </button>
        ))
      }
      <div className='mt-6'>
        <h1 className='text-xl font-semibold tracking-wide mb-2'>Write a Review (Optional) </h1>
        <textarea name="" id="" cols="50" rows="10"
          className='border p-2 text-xl resize-none w-full rounded-lg outline-[#90bdf4]'
          value={review}
          onChange={(e) => setReview(e.target.value)}>

        </textarea>
      </div>
      <button
        className='px-6 mt-4 rounded-lg py-1 bg-green-500 text-white text-xl'
      >
        Add
      </button>
    </div>
  )
}

export default RateAndReview