import React from 'react';
import BookCard2 from './BookCard2';
import BookCard from './BookCard';

const Books = ({ books }) => {
  console.log("books",books)
  return (
    <div className="products">
      {books.map(book => (
        <BookCard key={book.id} book={book} /> 
      ))}
    </div>
  );
};

export default Books;
