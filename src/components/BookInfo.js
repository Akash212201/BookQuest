import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LuShoppingBag } from 'react-icons/lu';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { IoIosStar } from 'react-icons/io';
import { showbookdetails } from '../services/operations/bookcategory';
import { addToCart } from '../Slices/cartSlice';
import { BuyBook } from '../services/operations/Payment';

const BookInfo = () => {
    const [book, setBook] = useState({});
    const [showFullSummary, setShowFullSummary] = useState(false); // State to track whether full summary should be shown
    const location = useLocation();
    const id = location.pathname.split('/').pop();
    // const token=localStorage.getItem('token')
    const { token } = useSelector((state) => state.auth)
    const user = localStorage.getItem("user");
    const user1 = JSON.parse(user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Function to fetch book details

    const fetchData = async () => {
        let response = await showbookdetails(id);
        setBook(response.data);
    };

    useEffect(() => {
        fetchData();
    }, [location.pathname]);


    async function paymenthandler() {
       
        const resp = await BuyBook(token, [id], user, navigate, dispatch);
       //  console.log(resp);
    }

    const addToCartHandler = () => {
        let totalPrice = 1 * book.price;
        const tempbook = {
            ...book,
            quantity: 1,
            totalPrice,
        };
        dispatch(addToCart(tempbook));
    };

    // Function to toggle full summary display
    const toggleSummary = () => {
        setShowFullSummary(!showFullSummary);
    };



    return (
        <>
            {book && Object.keys(book).length > 0 && (
                <div className='py-10 px-7 lg:px-[10vw] flex lg:flex-row flex-col gap-4'>
                    <div className='lg:w-[30%] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] w-full h-[450px] px-2 py-4'>
                        <img src={book.thumbnail} alt='' className='w-full h-[420px] object-contain' />
                    </div>
                    <div className='lg:w-2/3 w-full'>
                        <div className='px-5 pt-3 font-medium'>
                            <h2 className='text-2xl'>{book.bookName}</h2>
                            <p className='my-3'>
                                <b>Author: </b> {book.bookAuthor}
                            </p>
                            <p>Price: <span className='text-red-500 text-xl'>₹{book.price}</span></p>
                            <p>
                                <b>Availablity: </b>
                                {book.bookStock}
                            </p>
                            <div className='mt-5'>
                                {showFullSummary ? book.bookSummary : `${book.bookSummary.slice(0, 250)}...`}
                                <button
                                    className='text-blue-500 hover:underline focus:outline-none'
                                    onClick={toggleSummary}>
                                    {showFullSummary ? 'View less' : 'View more'}
                                </button>
                            </div>
                            {
                                user1 && user1.accountType === "Admin" ? <></>
                                    : <div className='my-10 flex items-center lg:text-xl'>
                                        <button onClick={paymenthandler} className='flex items-center border px-3 py-2 text-white bg-red-500 cursor-pointer hover:bg-red-600 transition mr-5'>
                                            <MdOutlineShoppingCart className='mr-2' />
                                            Buy Now
                                        </button>
                                        <button
                                            className='flex items-center border px-3 py-2 text-white bg-red-500 cursor-pointer hover:bg-red-600 transition'
                                            onClick={addToCartHandler}>
                                            <LuShoppingBag className='mr-2' />
                                            Add to Cart
                                        </button>
                                    </div>
                            }
                            <div className='flex lg:gap-16 lg:flex-row flex-col'>
                                <div className=''>
                                    <h3 className='text-2xl font-light'>Rating and Reviews</h3>
                                    <p className='text-2xl mt-1 mb-5'>
                                        <b>5.0/5</b>
                                    </p>
                                </div>
                                <div className='mt-1'>
                                    {[4, 3, 2, 1, 0].map((text, idx) => (
                                        <div key={idx} className='flex items-center'>
                                            {text + 1}
                                            <IoIosStar />
                                            <span className='border h-3 lg:w-[10vw] w-[30vw] rounded-md mx-2 bg-red-200'></span>
                                            0
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
};

export default BookInfo;
