import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { allpurchasedorders, ratingAndReviews } from '../services/operations/bookcategory';

const RateAndReview = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [books, setbooks] = useState([]);
  const {token}=useSelector((state)=>state.auth)
  const [bookid,setBookid] = useState('');




  useEffect(() => {
    async function fetchBooks() {
      try {
        const resp = await allpurchasedorders(token);
        setbooks(resp.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    fetchBooks();
  }, []);





  const handleCategoryChange = (e) => {
    setBookid(e.target.value);
  };

  const handlereview=async ()=>{
    const resp = await ratingAndReviews(bookid,rating,review,token);

    setRating(0)
    setHover(0)
    setReview('')
    setBookid('')
  }

  
  console.log("ratings",rating)
  console.log("bookid",bookid)
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
      <select
      value={bookid}
      onChange={handleCategoryChange}
      className="w-full pr-2 mb-2 text-lg outline-none border border-[#7da0fa] rounded text-[#6C7383] px-[10px] py-[8px] "
    >
      <option value="">Choose a Book</option>
      {books.map((item, index) => (
        <option key={index} value={item?._id}>{item?.bookName}</option>
      ))}
    </select>
      <button
      onClick={handlereview}
        className='px-6 mt-4 rounded-lg py-1 bg-green-500 text-white text-xl'
      >
        Add
      </button>
    </div>
  )
}

export default RateAndReview