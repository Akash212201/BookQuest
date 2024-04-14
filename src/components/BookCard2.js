import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Slices/cartSlice';

const BookCard2 = ({ book }) => {
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
    //trim the 
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        } else {
            return text;
        }
    };
    return (
        <div class="book-card">
            <div class="content-wrapper">
             
                <img src={book.thumbnail} alt={book.bookName}
                    class="book-card-img w-[160px] -mt-[35px] rounded-[2px] object-cover mb-5" />
            
                <div class="card-content">
                    <div class="text-ellipsis overflow-hidden whitespace-nowrap font-medium ">
                    <Link to={`/bookinfo/${book._id}`} className='border border-black lg:text-xl '>
                    {truncateText(book.bookName, 20)}
                    </Link>
                        <p className='mt-1 text-[#8b939c] text-ellipsis overflow-hidden whitespace-nowrap text-[13px]'>
                            by {book.bookAuthor}
                        </p>
                        <p>Price: <span className='text-red-500 text-xl'>₹{book.price}</span></p>
                    </div>
                    <fieldset class="rating book-rate">
                        <input type="checkbox" id="star-c1" name="rating" value="5" />
                        <label class="full" for="star-c1"></label>
                        <input type="checkbox" id="star-c2" name="rating" value="4" />
                        <label class="full" for="star-c2"></label>
                        <input type="checkbox" id="star-c3" name="rating" value="3" />
                        <label class="full" for="star-c3"></label>
                        <input type="checkbox" id="star-c4" name="rating" value="2" />
                        <label class="full" for="star-c4"></label>
                        <input type="checkbox" id="star-c5" name="rating" value="1" />
                        <label class="full" for="star-c5"></label>
                    </fieldset>
                    

                </div>
            
            </div>
        </div>
    )
}

export default BookCard2