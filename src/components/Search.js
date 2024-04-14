import React, { useState } from 'react'
import { showallbooks } from '../services/operations/bookcategory'
import BookInfo from './BookInfo';
import { NavLink, useNavigate } from 'react-router-dom';

const Search = () => {
    const [input, setInput] = useState('')
    const [value,setvalue]=useState(null);
    const [results, setResults] = useState([])
    const navigation=useNavigate();

  
    const fetchData = async (value) => {
        try {
            const resp=await showallbooks();
        const data = resp.data;
        setResults(data)
        console.log("data",data)
        const results = data.filter((user) => {
            return value && user && user.bookName && user.bookName.toLowerCase().includes(value)
        })
        console.log("resssuuullt",results)
        return results;
        } catch (error) {
            console.log("resssuuullt",error)
        }
    }

    //set the filtered data to render
    const handleChange = async (value) => {
        setInput(value)
        const res = await fetchData(value)
        setResults(res)
    }
    //set the value from filter result
    const handleResult =(val)=>{
        console.log(val)
        setvalue(val)
        navigation(`/bookinfo/${val}`)

        setResults([])
        setInput("")
    }
    
    // console.log("value",value)
    return (
        <div className="container">
            <div>
                <div>
                    <input type="text"
                        placeholder='search'
                        className='w-[95%] outline-none text-xl py-1 px-2 relative input'
                        value={input}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                </div>

            </div>
            <div className='w-[50vw] z-10 absolute bg-white top-13'>
                {
                    results && results.map((result, idx) => (
                        <div key={idx} className='border mb-1 py-1 cursor-pointer' onClick={(e) => handleResult(result._id)}>{result.bookName}</div>
                    ))
                }

            </div>

          
        </div>
    )
}

export default Search