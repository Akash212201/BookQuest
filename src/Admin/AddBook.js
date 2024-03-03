import React,{useState, useEffect} from 'react'

const AddBook = () => {
    const [bookName, setBookName] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookSummary, setBookSummary] = useState('');
    const [price, setPrice] = useState();
    const [bookStock, setBookStock] = useState();
    const [category, setCategory] = useState('');
    const [noOfPages, setNoOfPages] = useState('');
   
  return (
    <div>
        <div>
            <label htmlFor="">Book Name</label>
            <div className='border'>
            <input type="text" placeholder='Enter Book Name' className='px-1 py-2'/>
            </div>
        </div>
    </div>
  )
}

export default AddBook