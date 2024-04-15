import React, { useState } from 'react'
import { createcategory } from '../../services/operations/bookcategory'

const AddCategory = () => {
  const [categoryName, setCategory] = useState('')
  const [categoryDesc, setCategoryDesc] = useState('')
  const submitHandler = async () => {
    const data = {
      categoryName: categoryName,
      categoryDesc: categoryDesc
    }
    const resp=await createcategory(data);
    console.log(resp);
    setCategory('');
    setCategoryDesc('');

    console.log(data)
  }

  
  const resetHandler = () => {
    setCategory('');
    setCategoryDesc('');
  }
  return (
    <div className='me-6 my-3 p-6 '>
      <h1 className='text-2xl font-semibold tracking-wide mb-4'>Add New Category</h1>
      <div className=' bg-white p-4 rounded shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
        <div className='mt-6'>
          <h1 className='mb-2'>Category Name</h1>
          <div>
            <input type="text"
              className='w-full border px-2 text-2xl py-1 rounded-lg outline-[#90bdf4]'
              value={categoryName}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>
        <div className='mt-6'>
          <h1 className='mb-2'>Category Description</h1>
          <textarea name="" id="" cols="50" rows="10"
            className='border p-2 text-xl resize-none w-full rounded-lg outline-[#90bdf4]'
            value={categoryDesc}
            onChange={(e) => setCategoryDesc(e.target.value)}
          ></textarea>
        </div>
        <div className='mt-6 flex gap-4'>
          <button
            className='px-6 rounded-lg py-1 bg-green-500 text-white text-xl'
            onClick={submitHandler}
          >
            Add
          </button>
          <button
            className='px-6 rounded-lg py-1 bg-red-500 text-white text-xl'
            onClick={resetHandler}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddCategory