import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Slices/cartSlice';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  
  const addToCartHandler = () => {
    let totalPrice = 1 * book.price;
    const tempbook = {
      ...book,
      quantity: 1,
      totalPrice
    }
    dispatch(addToCart(tempbook));
  };
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    } else {
        return text;
    }
};
  return (
    <div className="flex md:flex-col lg:flex-col flex-row rounded-lg overflow-hidden bg-white mb-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="lg:w-[100%] w-[50%] py-2 lg:bg-[#f2f5f4] ">
      <div className='w-full'>
      <Link to={`/bookinfo/${book._id}`}>
        <img src={book.thumbnail} alt={book.bookName} className=' w-full h-[200px] object-contain' />
      </Link>
      </div>
      </div>
      <div className="py-2 px-4  min-h-[155px] relative ">
      <Link to={`/bookinfo/${book._id}`}>
        <h3 className='font-semibold text-xl'>{truncateText(book.bookName, 20)}</h3>
        </Link>
        <p>{book.bookAuthor}</p>
        <p>Price: <span className='text-red-500 text-xl'>₹{book.price}</span></p>
        <div className='bg-red-500 py-2 text-xl text-white text-center absolute bottom-0 left-0 right-0 addToCartbutton' 
        onClick={addToCartHandler}>
          <button>Add to cart</button>
          </div>
      </div>
    </div>
  );
};

export default BookCard; 
