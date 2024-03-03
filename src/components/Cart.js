import React from 'react'
const cartData = [
    {
        cover: "../images/upcome/slide2.jpg",
        title: "Atomic Habits",
        author: "James Clear",
        available: "In-Stock",
        price: 190,
        total: "",
    },
    {
        cover: "../images/upcome/u2.jpg",
        title: "The Brave: Param Vir Chakra Stories",
        author: "",
        available: "out-Stock",
        price: 249,
        total: "",
    },
    {
        cover: "../images/upcome/u1.jpg",
        title: "Doglapan",
        author: "Ashneer Grover",
        available: "In-Stock",
        price: 299,
        total: "",
    },
]
const Cart = ({data}) => {
    return (
        <div>
            <h1 className="text-center mt-5 text-4xl">Your Bag</h1>
            <div className='lg:py-10 p-5 lg:px-[3vw] flex lg:flex-row flex-col gap-4'>
            <div className='lg:w-2/3 w-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>

                {
                    cartData.map((data, idx) => (
                        <div key={idx} className='flex items-center mt-2 border'>
                            <div className='lg:w-[120px] w-[190px] h-[150px]'>
                                <img src={data.cover} alt="" className='w-full h-full object-contain' />
                            </div>
                            <div className='px-5 pt-3 font-medium'>
                                <h2 className='text-xl lg:text-2xl  leading-6 lg:leading-7'>{data.title}</h2>
                                <p className='mb-2'>  <b>Author: </b> {data.author}</p>
                                <p><b>Availablity: </b> {data.available}</p>
                                <p className="text-red-500 text-2xl">{data.price}</p>
                                <div className='flex items-center my-2'>
                                    <button className='py-[2px] px-[10px] border border-black hover:border-slate-200 hover:bg-slate-200'>-</button>
                                    <p className='mx-3'>0</p>
                                    <button className='py-[2px] px-[10px] border border-black hover:border-slate-200 hover:bg-slate-200'>+</button>
                                </div>
                                <h2 className=''>Total Amount: 500</h2>
                            </div>
                        </div>
                    ))
                }

            </div>
            <div className='relative lg:w-[30%] w-full h-[450px] px-5 py-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
                <h1 className="text-center text-3xl mb-5">Order Summary</h1>
                <div className='text-xl'>
                    <div className='flex justify-between items-center my-5'><p>Discount Amount</p> 250</div>
                    <div className='flex justify-between items-center my-5'><p>Total MRP</p> 2540</div>
                    <span className='block border border-[#333] w-full mt-5 mb-2'></span>
                    <div className='flex justify-between items-center'><p>Total Amount</p> 2540</div>
                    <button className='text-white bg-green-500 hover:bg-green-600 w-full py-3 absolute bottom-0 left-0'>CheckOut</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Cart