import React from 'react';
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

  return (
    <div className="flex md:flex-col lg:flex-col flex-row rounded-lg overflow-hidden bg-white border shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="lg:w-[100%] md:w-[100%] w-[50%] py-2 bg-[#f0f0f06f]">
        <img src={book.cover} alt={book.name} className=' w-full h-[200px] object-contain' />
      </div>
      <div className="py-2 px-4 lg:w-[100%] md:w-[100%] w-[50%] min-h-[155px] items-stretch relative ">
        <h3 className='font-semibold text-xl'>{book.name}</h3>
        <p>{book.author}</p>
        <p>Price: {book.price}</p>
        <div className='bg-red-500 py-2 text-xl text-white text-center absolute bottom-0 left-0 right-0' onClick={addToCartHandler}><button>Add to cart</button></div>
      </div>
    </div>
  );
};

export default BookCard; 
