import React from 'react'
import Styles from './Offer.module.css'
import Image from 'next/image'
import CountDown from './CountDown'

const Offer = () => {
  return (
    <div className={Styles.offer}>
      {/* text container */}
      <div className={Styles.text_container}>
        <h1 className={Styles.title}>Delicious Burger & French Fry</h1>
        <p className={Styles.paragraph}>Progressively simplify effective e-toilers and process-centric methods
        of empowerment. Quickly pontificate parallel.</p>
        <CountDown/>
        <button className={Styles.button}>Order Now</button>
      </div>
      {/* image container */}
      <div className={Styles.image_container}>
        <Image src="/offerProduct.png" alt="" className={Styles.image} width={400} height={400}/>
      </div>
    </div>
  )
}

export default Offer
