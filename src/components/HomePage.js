import React, { useState } from "react"
import Hero from './Hero'
import Upcomming from "./Upcomming"
import Newsletter from './Newsletter';

const HomePage = () => {
  const latest = [
    {
      id: 1,
      cover: "../images/upcome/u6.png",
      name: "King of Jungle",
      author: "Rudyard Kipling",
      price: 200
    },
    {
      id: 2,
      cover: "../images/upcome/u2.jpg",
      name: "Brave",
      author: "Rachna Bisht Rawat",
      price: 240
    },
    {
      id: 3,
      cover: "../images/upcome/u7.jpg",
      name: "The illusion",
      author: "Sudha Murthy",
      price: 450
    },
    {
      id: 4,
      cover: "../images/upcome/u1.jpg",
      name: "Doglapan",
      author: "By Ashneer Grover",
      price: 350
    },
    {
      id: 5,
      cover: "../images/upcome/u5.jpg",
      name: "Karma: A Yogi's Guide to Crafting",
      author: "By Sadhguru",
      price: 150
    },
    {
      id: 6,
      cover: "../images/upcome/u4.jpg",
      name: "Me Before You",
      author: "By Jojo Moyes",
      price: 550
    },
  ]
  const [item, setItem] = useState(latest)
  return (
    <div className="">
      
      <Hero/>
      <Upcomming items={item} title='Upcomming Books' />
      <Upcomming items={item} title='New Arrival' />
      <Upcomming items={item} title='BestSeller' />
      <Newsletter />
      
    </div>
  )
}

export default HomePage
