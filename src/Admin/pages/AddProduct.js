import React, { useEffect, useState } from 'react';
import { addnewbook, getcategories } from '../../services/operations/bookcategory';
import { useSelector } from "react-redux";

const AddProduct = () => {
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnail1, setThumbnail1] = useState("");
  const [category, setCategory] = useState(""); // State to store selected category
  const [bookSummary, setBookSummary] = useState("");
  const [pdfUrl, setpdf] = useState(null);
  const [pdfUrl1, setpdf1] = useState("");
  const [loading, setloading] = useState("");
  const [category1, setCategory1] = useState([]);
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    async function fetchData() {
      const resp = await getcategories();
      console.log(resp.data);
      setCategory1(resp.data);
    }
    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

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
      value: thumbnail1,
      onChange: (e) => {
        setThumbnail1(e.target.value)
        setThumbnail(e.target.files[0]);
      }
    },
    {
      Label: "Book PDF",
      type: "file",
      placeHolder: "Upload Book PDF",
      value: pdfUrl1,
      onChange: (e) => {
        setpdf1(e.target.value)
        setpdf(e.target.files[0]);
        console.log("e.target", e.target.files[0])
      }
    },
    {
      Label: "Book Summary",
      type: "text",
      placeHolder: "Write Book Summary",
      value: bookSummary,
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
    formData.append("bookAuthor", bookAuthor);
    formData.append("bookName", bookName);
    formData.append("bookSummary", bookSummary);
    formData.append("category", category); // Use the selected category
    formData.append("price", price);
    formData.append("thumbnail", thumbnail);
    formData.append("pdfUrl", pdfUrl);
    console.log(formData);
    setloading(true);
    const resp = await addnewbook(formData, token);
    setloading(false);
    console.log("response", resp);
    setBookAuthor("");
    setBookName("");
    setBookSummary("");
    setCategory("");
    setPrice("");
    setThumbnail1("");
    setpdf1("");
  };

  return (
    <div>
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

              <select
                value={category} // Set the value of the select to the selected category
                onChange={handleCategoryChange} // Handle category change
                className="form-style w-full"
              >
                <option value="">Choose a Category</option>
                {category1.map((item, index) => (
                  <option key={index} value={item?._id}>{item?.categoryName}</option>
                ))}
              </select>
            </div>
          ))}
          <button type="submit"
            className="block px-[1.75rem] py-2 rounded-lg bg-[#7DA0FA] hover:bg-[#7978E9] text-white text-xl">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
