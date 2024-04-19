import React from 'react';
import BookCard from './BookCard';

const Books = ({ books }) => {
  console.log("books",books)
  return (
    <div className="products">
      {books.length>0?books.map((book,id) => (
        <BookCard key={id} book={book} /> 
      )):<div>
      <h1 className="text-center mt-5 text-4xl mb-2">Your Books</h1>
      <h1 className='text-4xl font-bold text-center mt-20'>No Category Books Available</h1>
      </div>}
    </div>
  );
};

export default Books;
