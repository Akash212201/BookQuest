import React, { useState } from 'react'
import { toast } from 'react-toastify';
const Requestbook = () => {
    const [bookName, setBookName] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState();
    const handleSubmit = () => {
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
        console.log(data)
        setBookName('');
        setBookAuthor('');
        setEmail('');
        setMobile('');
    }
    return (
        <div className='lg:h-[80vh] lg:px-20 md:px-16 px-4 py-4 rounded-md'>
            <h1 className='text-3xl font-semibold'>Request a book</h1>
            <p className='lg:text-xl text-lg font-normal text-[#909596]'>Please fill up the form below to Request a Book. We will inform you as soon as the book is available.</p>
            <div className='border lg:px-10 px-4 py-5 mt-5'>
                <div className='flex lg:flex-row flex-col justify-between items-center gap-4'>
                    <div className='lg:w-1/2 w-full'>
                        <label htmlFor="bookTitle" className='relative'>Book Title <span className='text-red-500 absolute -top-1'>*</span></label>
                        <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} className='w-full border p-2 rounded outline-none mb-4' />
                    </div>
                    <div className='lg:w-1/2 w-full'>
                        <label htmlFor="Author Name" className='relative'>Author <span className='text-red-500 absolute -top-1'>*</span></label>
                        <input type="text" value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} className='w-full border p-2 rounded outline-none mb-4' />
                    </div>
                </div>
                <div className='flex lg:flex-row flex-col justify-between items-center gap-4'>
                    <div className='lg:w-1/2 w-full'>
                        <label htmlFor="email" className='relative'>Email Id <span className='text-red-500 absolute -top-1'>*</span></label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border p-2 rounded outline-none mb-4' />
                    </div>
                    <div className='lg:w-1/2 w-full'>
                        <label htmlFor="mobile">Mobile/Phone</label>
                        <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} className='w-full border p-2 rounded outline-none mb-4' />
                    </div>
                </div>
                <button className='px-5 rounded text-white py-1 bg-green-500 '
                    onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default Requestbook