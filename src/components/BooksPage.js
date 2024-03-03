import React from 'react'
import Books from './Books'

const BooksPage = () => {
    const homeData = [
        {
            id: 9,
            cover: "../images/upcome/u5.jpg",
            name: "Jumbo Queen",
            author: "Arthur",
            price: 399,
        },
        {
            id: 10,
            cover: "../images/upcome/u6.png",
            name: "King of Jungle",
            author: "Arthur",
            price: 499,
        },
        {
            id: 11,
            cover: "../images/upcome/u7.jpg",
            name: "The illusion",
            author: "Arthur",
            price: 500,
        },
        {
            id: 12,
            cover: "../images/upcome/u1.jpg",
            name: "Latest Movie",
            author: "Arthur",
            price: 320,
        },
        {
            id: 1,
            cover: "../images/home1.jpg",
            name: "My office Boss",
            author: "Mark",
            price: 149,

        },
        {
            id: 2,
            cover: "../images/home2.jpg",
            name: "My office Boss",
            author: "David",
            price: 199,
        },
        {
            id: 3,
            cover: "../images/home3.jpg",
            name: "My office Boss",
            author: "David",
            price: 299,
        },
        {
            id: 4,
            cover: "../images/home4.jpg",
            name: "My office Boss",
            author: "G. Bell",
            price: 399,
        },
        {
            id: 5,
            cover: "../images/upcome/u1.jpg",
            name: "My office Boss",
            author: "Arthur",
            price: 299,
        },
        {
            id: 6,
            cover: "../images/upcome/u2.jpg",
            name: "Shadowe",
            author: "Arthur",
            price: 199,
        },
        {
            id: 7,
            cover: "../images/upcome/u3.jpg",
            name: "Another Danger",
            author: "Arthur",
            price: 99,
        },
        {
            id: 8,
            cover: "../images/upcome/u4.jpg",
            name: "One Man Army",
            author: "Arthur",
            price: 99,
        },
        
        {
            id: 13,
            cover: "../images/upcome/u5.jpg",
            name: "Latest two",
            author: "Arthur",
            price: 175,
        },
        {
            id: 14,
            cover: "../images/upcome/u4.jpg",
            name: "Latest Three",
            author: "Arthur",
            price: 250,
        },
    ]

    return (
        <div className='lg:p-10 bg-slate-300'>

            <div className="flex lg:gap-6 ">
                <div className="bg-[#bbc7d7eb] lg:w-[75%] rounded h-[95vh]">
                </div>

                <div className='bg-[#bbc7d7] relative'>
                    <div className='absolute top-0 right-0 bg-slate-300 p-2 font-bold rounded-b-lg'>
                        Sort By: 
                        <select name="" id="" className='ml-2 bg-slate-300 outline-none'>
                            <option value="">Low to High</option>
                            <option value="">High to Low</option>
                            <option value="">Popular</option>
                            <option value="">Newest</option>
                        </select>
                    </div>
                    <div className="mt-10 flex items-center justify-center rounded">
                        <Books data={homeData} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BooksPage