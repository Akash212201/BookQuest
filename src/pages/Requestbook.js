import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { reqBook } from '../services/operations/bookcategory';
import bannerImg from '../assests/requestBookPage.png'
const Requestbook = () => {
    const [bookName, setBookName] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState();
    const handleSubmit = async () => {
        if (!bookName && !email && !bookAuthor) {
            toast.error("Marked feild cannot be blank");
            return;
        }
        const data = {
            bookName: bookName,
            bookAuthor: bookAuthor,
            email: email,
            mobile: mobile
        }
       // console.log(data)
        const resp = await reqBook(data);
        // console.log(resp)
        setBookName('');
        setBookAuthor('');
        setEmail('');
        setMobile('');
    }
    return (
        <div className=' lg:px-20 md:px-16 px-4 py-4 rounded-md pb-10'>
                <div className='h-[30vh] rounded-[2rem] overflow-hidden mb-5'>
                    <img src ={bannerImg} alt="" className='w-full h-full object-fill'/>
                </div>
            <h1 className='text-3xl font-semibold'>Request a book</h1>
            <p className='lg:text-xl text-lg font-normal text-[#909596]'>Please fill up the form below to Request a Book. We will inform you as soon as the book is available.</p>
            <div className='lg:px-10 px-4 py-5 mt-5 bg-white rounded-[1rem] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
                <div className='flex lg:flex-row flex-col justify-between items-center gap-4'>
                    <div className='lg:w-1/2 w-full '>
                        <label htmlFor="bookTitle" className='relative'>Book Title <span className='text-red-500 absolute -top-1'>*</span></label>
                        <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} 
                        className='w-full border p-2 rounded outline-[#75a8e6] mb-4 bg-[#ecf0f5]' />
                    </div>
                    <div className='lg:w-1/2 w-full'>
                        <label htmlFor="Author Name" className='relative'>Author <span className='text-red-500 absolute -top-1'>*</span></label>
                        <input type="text" value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} 
                        className='w-full border p-2 rounded outline-[#75a8e6] mb-4 bg-[#ecf0f5]' />
                    </div>
                </div>
                <div className='flex lg:flex-row flex-col justify-between items-center gap-4'>
                    <div className='lg:w-1/2 w-full'>
                        <label htmlFor="email" className='relative'>Email Id <span className='text-red-500 absolute -top-1'>*</span></label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                        className='w-full border p-2 rounded outline-[#75a8e6] mb-4 bg-[#ecf0f5]' />
                    </div>
                    <div className='lg:w-1/2 w-full'>
                        <label htmlFor="mobile">Mobile/Phone</label>
                        <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} 
                        className='w-full border p-2 rounded outline-[#75a8e6] mb-4 bg-[#ecf0f5]' />
                    </div>
                </div>
                <button className='px-5 rounded text-white py-1 bg-green-500 '
                    onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default Requestbook