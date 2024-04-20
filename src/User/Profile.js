import { useState } from 'react'
import Convert from './convert'
import userImg from '../assests/profileImg.png'


const Profile = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [profile, setProfile] = useState()
  const [mobile, setMobile] = useState('')

  const submitHandler = async () => {
   
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobile: mobile,
      address: address,
      profile: profile || userImg
    }
    console.log(data, "new")
  }
  const onUpload = async e => {
    const base64 = await Convert(e.target.files[0]);
    setProfile(base64)
  }
  return (
    <div className="lg:me-6 my-3 p-6 w-full ">
      <div className="bg-white rounded-[20px] lg:px-[50px] px-[20px] py-[30px] lg:mt-0 mt-5  ">
        <div className="title">
          <h4>Profile</h4>
          <span className="title-span">Update your Profile Here</span>
        </div>

        <div className="profile flex justify-center p-5 my-3">
          <label htmlFor="Profile">
            <img src={profile || userImg} alt="" className='border-[4px] border-[#a2a2a2b0] w-[135px] rounded-[50%]'/>
          </label>
          <input type="file" id="Profile" name="Profile" onChange={onUpload} />
        </div>
        <div className="">
          <div className="flex lg:flex-row flex-col justify-between items-center gap-4">
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text"
              placeholder="First Name" className='lg:w-1/2 w-full border border-gray-500 outline-none p-2 rounded-lg' />
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text"
              placeholder="Last Name" className='lg:w-1/2 w-full border border-gray-500 outline-none p-2 rounded-lg' />
          </div>
          <div className="flex lg:flex-row flex-col justify-between items-center gap-4 my-4">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
              placeholder="Email Here" className='lg:w-1/2 w-full border border-gray-500 outline-none p-2 rounded-lg' />
            <input value={mobile} onChange={(e) => setMobile(e.target.value)} type="number"
              placeholder="Mobile Number" className='lg:w-1/2 w-full border border-gray-500 outline-none p-2 rounded-lg' />
          </div>
          <input value={address} onChange={(e) => setAddress(e.target.value)} type="text"
            placeholder="Enter your address here" className='lg:w-1/2 w-full border border-gray-500 outline-none p-2 rounded-lg' />
          <button className=' block mt-5 px-4 py-2 rounded-lg bg-green-500 text-white font-semibold' 
          onClick={submitHandler}>Update Profile</button>
        </div>


      </div>
    </div>
  )
}

export default Profile