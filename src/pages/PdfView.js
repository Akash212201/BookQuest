import React, { useState, useRef, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { viewbookdetails } from '../services/operations/bookcategory';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const EBookView = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const containerRef = useRef(null);
  const [book,setbook]=useState({});
  const {token}=useSelector((state)=> state.auth)

  const location = useLocation();
  const id = location.pathname.split('/').pop();

  // console.log(id)
  const fetchData = async () => {
    let response = await viewbookdetails(id,token);
    setbook(response.data);
};

useEffect(() => {
    fetchData();
}, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const scrollTop = container.scrollTop;
        const pageHeight = container.scrollHeight / numPages;
        const newPageNumber = Math.floor(scrollTop / pageHeight) + 1;
        setPageNumber(newPageNumber);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [numPages]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const changePage = offset => {
    const newPage = pageNumber + offset;
    if (newPage >= 1 && newPage <= numPages) {
      setPageNumber(newPage);
      const container = containerRef.current;
      if (container) {
        const pageHeight = container.scrollHeight / numPages;
        container.scrollTop = (newPage - 1) * pageHeight;
      }
    }
  };

  return (
    <div className='me-6 my-3 px-6 py-2'>
      <h1 className='text-xl mb-2'>{` ${book?.bookName} by ${book?.bookAuthor} `}</h1>
      <p className='px-2 py-2 bg-[#2f2f2f] text-white text-center text-xl'>Page {pageNumber} of {numPages}</p>
      
      <div className="bg-[#2f2f2f] ebook flex justify-center overflow-y-auto border-b border-black h-[68vh]" ref={containerRef}>
        <Document
          file={book.pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              pageNumber={index + 1} />
          ))}
        </Document>
      </div>
      <div className="flex justify-center items-center mt-6">
        <button disabled={pageNumber <= 1} onClick={() => changePage(-1)}
          className="px-3 py-1 bg-[#e5e7ff] hover:bg-green-500 hover:text-white rounded mr-4">Previous
        </button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button disabled={pageNumber >= numPages} onClick={() => changePage(1)}
          className="px-3 py-1 bg-[#e5e7ff] hover:bg-green-500 hover:text-white rounded ml-4">
          Next
        </button>
      </div>
    </div>
  );
};

export default EBookView;
