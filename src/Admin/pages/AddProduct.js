import React, { useState } from 'react';

const AddProduct = () => {
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [bookSummary, setBookSummary] = useState("");
  const [pdf, setpdf] = useState("");

  const Form = [
    {
      Label: "Book Name",
      type: "text",
      placeHolder: "Enter book title",
      value: bookName,
      onChange: (e) => setBookName(e.target.value),
    },
    {
      Label: "Author Name",
      type: "text",
      placeHolder: "Enter Author name",
      value: bookAuthor,
      onChange: (e) => setBookAuthor(e.target.value),
    },
    {
      Label: "Price",
      type: "number",
      placeHolder: "Book Value",
      value: price,
      onChange: (e) => setPrice(e.target.value),
    },
    {
      Label: "Book Thumbnail",
      type: "file",
      placeHolder: "",
      value: thumbnail,
      onChange: (e) => setThumbnail(e.target.value),
    },
    {
      Label: "Category",
      type: "text",
      placeHolder: "Category Here",
      value: category,
      onChange: (e) => setCategory(e.target.value),
    },
    {
      Label: "Book PDF",
      type: "file",
      placeHolder: "Upload Book PDF",
      value: pdf,
      onChange: (e) => setpdf(e.target.value),
    },
    {
      Label: "Book Summary",
      type: "text",
      placeHolder: "Write Book Summary",
      value: bookSummary,
      onChange: (e) => setBookSummary(e.target.value),
    },
  ];

  //function for sending data to server
  //update it accordingly
  const submitHandler = (e) => {
    e.preventDefault();
    const data = { bookAuthor, bookName, bookSummary, category, price, thumbnail, pdf };
    console.log(data);
    setBookAuthor("");
    setBookName("");
    setBookSummary("");
    setCategory("");
    setPrice("");
    setThumbnail("");
    setpdf("");
  };

  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  return (
    <>
      <h1 className='font-semibold text-2xl'>Add New Book</h1>
      <div className="my-4 rounded-[10px] bg-white px-6 py-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <form action="" onSubmit={submitHandler}>
          {chunkArray(Form, 2).map((row, rowIndex) => (
            <div key={rowIndex} className="lg:mb-4 flex flex-wrap">
              {row.map((item, index) => (
                <div key={index} className="lg:w-1/2 w-full pr-2 mb-2">
                  <label htmlFor={item.Label}>{item.Label}</label>
                  {
                    item.Label === "Book Summary" ? (
                      <textarea
                        placeholder={item.placeHolder}
                        value={item.value}
                        onChange={item.onChange}
                        className="text-lg input outline-none border border-[#7da0fa] text-[#6C7383] rounded px-[10px] py-[8px] w-full mb-1 resize-none"
                      />
                      ) : (
                      <input
                        type={item.type}
                        placeholder={item.placeHolder}
                        value={item.value}
                        onChange={item.onChange}
                        className="text-lg input outline-none border border-[#7da0fa] rounded text-[#6C7383] px-[10px] py-[8px] w-full mb-1"
                      />
                    )
                  }
                </div>
              ))}
            </div>
          ))}
          <button type="submit"
            className="block px-[1.75rem] py-2 rounded-lg bg-[#7DA0FA] hover:bg-[#7978E9] text-white text-xl">
            Add Book
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
