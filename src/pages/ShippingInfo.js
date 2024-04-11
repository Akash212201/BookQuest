import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ShippingInfo = () => { 
  const [firstName, setFirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [street, setStreet] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const submitHandler = () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobile: mobile,
      street: street,
      zipCode: zipCode,
      city: city,
      state: state,
      country: country,
    }
    setFirstName("");
    setlastName("");
    setEmail("");
    setMobile("");
    setStreet("");
    setZipCode("");
    setCity("");
    setState("");
    setCountry("");
    console.log(data)
  }
  return (
    <div className="flex justify-center items-center lg:h-[55vh] mb-20">
      <div className='py-2 lg:w-[550px]'>
        <h1 className='lg:text-4xl text-2xl font-semibold px-4'>Address</h1>
        <div className='px-2 mt-4'>
          <div className='w-full lg:flex justify-between items-center gap-2'>
            <input type="text"
              placeholder='First Name'
              className='lg:w-[50%] w-full px-2 py-2 rounded outline-none mb-2 border'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} />
            <input type="text"
              placeholder='Last Name'
              className='lg:w-[50%] w-full px-2 py-2 rounded outline-none mb-2 border'
              value={lastName}
              onChange={(e) => setlastName(e.target.value)} />
          </div>
          <div className='mb-2 rounded border'>
            <input type="email"
              placeholder='Email address'
              className='w-full px-2 py-2 rounded outline-none'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='w-full lg:flex justify-between items-center gap-2'>
            <input type="text"
              placeholder='Phone No'
              className='lg:w-[50%] w-full px-2 py-2 rounded outline-none mb-2 border'
              value={mobile}
              onChange={(e) => setMobile(e.target.value)} />
            <input type="text"
              placeholder='Street'
              className='lg:w-[50%] w-full px-2 py-2 rounded outline-none mb-2 border'
              value={street}
              onChange={(e) => setStreet(e.target.value)} />
          </div>
          <div className='w-full lg:flex justify-between items-center gap-2'>
            <input type="text"
              placeholder='Zip Code'
              className='lg:w-[50%] w-full px-2 py-2 rounded outline-none mb-2 border'
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)} />
            <input type="text"
              placeholder='City'
              className='lg:w-[50%] w-full px-2 py-2 rounded outline-none mb-2 border'
              value={city}
              onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className='w-full lg:flex justify-between items-center gap-2'>
            <input type="text"
              placeholder='State'
              className='lg:w-[50%] w-full px-2 py-2 rounded outline-none mb-2 border'
              value={state}
              onChange={(e) => setState(e.target.value)} />
            <input type="text"
              placeholder='Country'
              className='lg:w-[50%] w-full px-2 py-2 rounded outline-none mb-2 border'
              value={country}
              onChange={(e) => setCountry(e.target.value)} />
          </div>

        </div>
        {/* next button for payment confirmation page */}
        <Link to="#!">
        <button onClick={submitHandler}
        className=' px-3 py-1 ml-2 text-white bg-green-500 font-semibold mt-4 text-lg'>Next</button>
      </Link>
      </div>
    </div>
  )
}

export default ShippingInfo