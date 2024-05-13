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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [book, setBook] = useState({});
    const [showFullSummary, setShowFullSummary] = useState(false); 
    const [ratingCount, setRatingCount] = useState([0,0,0,0,0]);
    const [averageRating, setAverageRating] = useState(0);
    const [totalRating, setTotalRating] = useState(0);
    const { token } = useSelector((state) => state.auth)
    const id = location.pathname.split('/').pop();
    const user = localStorage.getItem("user");
    const user1 = JSON.parse(user)
  
    // Function to fetch book details

    const fetchData = async () => {
        let response = await showbookdetails(id);
        setBook(response.data.bookDetails);
       
        setRatingCount(response.data.bookDetails);
        setAverageRating(calculateAverageRating(response?.data.ratingandreview))
        setRatingCount(calculateRatingCounts(response?.data.ratingandreview))
        setTotalRating(response?.data.ratingandreview.length);
        // console.log("first",response?.data.bookDetails)
        // console.log("secnd",response?.data.ratingandreview)

    };

    useEffect(() => {
        setTimeout(() =>{
            fetchData();

        },2000)
    }, [location.pathname]);


    const paymenthandler = async() =>{
       if(!token){
        // console.log("ot",token)
        navigate('/login');
        return;
       }
        const resp = await BuyBook(token, [id], user, navigate, dispatch);
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

    // calculate ratings count
    const calculateRatingCounts = (reviews) => {
        const ratingCounts = [0, 0, 0, 0, 0]; 
        reviews.forEach(review => {
            const rating = review.rating;
            ratingCounts[rating - 1]++; 
        });
        return ratingCounts;
    };

    // calculate the average rating
    const calculateAverageRating = (reviews) => {
        if(reviews.length>0){
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        return averageRating;
        }
        else{
            return 0;
        }
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
                                    onClick={()=> setShowFullSummary(!showFullSummary)}>
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
                                        <b>{averageRating}/5</b>
                                        
                                    </p>
                                    <p className=' '>total Ratings: <b>{totalRating}</b></p> 
                                </div>
                                <div className=' mt-1 w-1/5'>
                                    {ratingCount.map((text, idx) => (
                                        <div key={idx} className='flex items-center gap-2 '>
                                           {idx+1} <IoIosStar className='text-xl'/>
                                            <span className='bg-red-500 w-full rounded h-2'></span>
                                            <span>{text}</span>
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
