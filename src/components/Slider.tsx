"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Styles from "./Slider.module.css"

const data=[
  {
    id:1,
    title:"always fresh & always crispy & always hot",
    image:"/slide1.png"
  },
  {
    id:2,
    title:"we deliver your order wherever you are in NY",
    image:"/slide2.png"
  },
  {
    id:3,
    title:"the best pizza to share with your family",
    image:"/slide3.jpg"
  },
]

const Slider = () => {
  const [currentSlide,setCurrentSlide]=useState(0);

  useEffect(()=>{
    const interval=setInterval(
      ()=>setCurrentSlide((prev)=>(prev===data.length-1?0:prev+1)),2000)
    return ()=>clearInterval(interval);
  },[])

  return (
  <div className={Styles.slider}>
    {/* text container */}
    <div className={Styles.text}>
        <h1 className={Styles.title}>
            {data[currentSlide].title}
        </h1>
        <button className={Styles.button}>Order Now</button>
    </div>
    {/* image container */}
    <div className={Styles.image_container}>
        <Image src={data[currentSlide].image} alt="" fill className={Styles.image}/>
    </div>
  </div>
  )
}

export default Slider
