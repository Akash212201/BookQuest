import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { editbook, showbookdetails } from '../../services/operations/bookcategory';
import { useSelector } from "react-redux"; 

const UpdateBook = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const [bookData, setBookData] = useState({});
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [bookStock, setbookStock] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnail1, setThumbnail1] = useState("");
  const [bookSummary, setBookSummary] = useState("");
  const [pdfUrl, setpdf] = useState(null);
  const [pdfUrl1, setpdf1] = useState("");
  const [loading, setloading] = useState("");
  const navigate=useNavigate();
  const {token}=useSelector((state)=>state.auth)

  useEffect(() => { 
    const fetchData = async() => {
      try {
        const resp = await showbookdetails(id);
        console.log("first",resp.data)
        setBookData(resp?.data.bookDetails || {});
        setBookName(resp?.data.bookDetails?.bookName);
        setBookAuthor(resp?.data.bookDetails?.bookAuthor)
        setBookSummary(resp?.data.bookDetails?.bookSummary)
        setPrice(resp?.data.bookDetails?.price)
        setThumbnail(resp?.data.bookDetails?.thumbnail)
        setpdf(resp?.data.bookDetails?.pdfUrl)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  const Form = [
    {
      Label: "Book Name",
      type: "text",
      placeHolder: "Enter book title",
      value: bookName || bookData?.bookName,
      onChange: (e) => setBookName(e.target.value),
    },
    {
      Label: "Author Name",
      type: "text",
      placeHolder: "Enter Author name",
      value: bookAuthor || bookData?.bookAuthor,
      onChange: (e) => setBookAuthor(e.target.value),
    },
    {
      Label: "Price",
      type: "number",
      placeHolder: "Book Value",
      value: price || bookData?.price,
      onChange: (e) => setPrice(e.target.value),
    },
   {
      Label: "Book Summary",
      type: "text",
      placeHolder: "Write Book Summary",
      value: bookSummary || bookData?.bookSummary,
      onChange: (e) => setBookSummary(e.target.value),
    },
  ];

  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("bookid", id);

    if(bookData.bookAuthor!==bookAuthor){
      formData.append("bookAuthor", bookAuthor);
}

if(bookData.bookName!==bookName){
    formData.append("bookName", bookName);
}

if(bookData.bookSummary!==bookSummary){
    formData.append("bookSummary", bookSummary);
}

if(bookData.price!==price){
    formData.append("price", price);
}

if(bookData.bookStock!==bookStock){
    formData.append("bookStock", bookStock);
}





    // console.log(formData);

    const resp=await editbook(formData,token,navigate);
    // console.log(resp.data);
    // setloading(true);
    
    // setloading(false);
    // setBookAuthor("");
    // setBookName("");
    // setBookSummary("");
    // setPrice("");
    // setThumbnail1("");
    // setpdf1("");
    // setbookStock("")
  };

  return (
    <div className='lg:me-6 me-2 my-3 p-6 '>
      <h1 className='text-2xl font-semibold tracking-wide'>Update Book Details</h1>
      <div className="my-4 rounded-[10px] bg-white px-6 py-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <form action="" onSubmit={submitHandler} encType="multipart/form-data">
        
          {chunkArray(Form, 2).map((row, rowIndex) => (
            <div key={rowIndex} className="lg:mb-4 flex flex-wrap">
              {row.map((item, index) => (
                <div key={index} className="lg:w-1/2 w-full pr-2">
                  <label htmlFor={item.Label}>{item.Label}</label>
                  {
                    item.type === "file" ? (
                      <div className='border border-black p-[10px]'>
                        <input
                          type={item.type}
                          placeholder={item.placeHolder}
                          value={item.value}
                          onChange={item.onChange}
                          style={{ display: 'none' }}
                          className="text-lg outline-none border border-[#7da0fa] text-[#6C7383] rounded px-[10px] py-[4px] w-full mb-1 resize-none"
                      
                        />
                        <label>{item.value ? item.value.name : item.placeHolder}</label>
                      </div>
                    ) :
                    item.Label === "Book Summary" ? (
                      <textarea
                        placeholder={item.placeHolder}
                        value={item.value}
                        onChange={item.onChange}
                        className="text-lg outline-none border border-[#7da0fa] text-[#6C7383] rounded px-[10px] py-[4px] w-full mb-1 resize-none"
                      />
                    ) : (
                      <input
                        type={item.type}
                        placeholder={item.placeHolder}
                        value={item.value}
                        onChange={item.onChange}
                        className="text-lg outline-none border border-[#7da0fa] rounded text-[#6C7383] px-[10px] py-[8px] w-full mb-1"
                      />
                    )
                  }
                </div>
              ))}
            </div>
          ))}
          <div className="lg:w-1/2 w-full mb-4 text-lg  border border-[#7da0fa] rounded text-white bg-[#b2b2b2] px-[10px] py-[8px] "
          >
            {bookData?.category?.categoryName}
          </div>
          <button type="submit"
            className="block px-[1.75rem] py-2 rounded-lg bg-[#7DA0FA] hover:bg-[#7978E9] text-white text-xl">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBook;
