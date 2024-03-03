import React, { useState } from 'react'

const Search = () => {
    const [input, setInput] = useState('')
    const [results, setResults] = useState([])

    //fetch data from dummy api
    const fetchData = async (value) => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await res.json();
        const results = data.filter((user) => {
            return value && user && user.name && user.name.toLowerCase().includes(value)
        })

        return results;
    }

    //set the filtered data to render
    const handleChange = async (value) => {
        setInput(value)
        const res = await fetchData(value)
        setResults(res)
    }
    //set the value from filter result
    const handleResult =(val)=>{
        setInput(val)
        setResults([])
    }
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
                        <div key={idx} className='border mb-1 py-1 cursor-pointer' onClick={(e) => handleResult(result.name)}>{result.name}</div>
                    ))
                }

            </div>
        </div>
    )
}

export default Search