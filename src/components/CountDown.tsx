//USING LIBRARY
// "use client"
// import React from 'react'
// import Countdown from 'react-countdown';
// import Styles from './CountDown.module.css'

// const endingDate=new Date("2023-07-25");

// const CountDown = () => {
//   return (
//    <Countdown date={endingDate} className={Styles.count}/>
//   )
// }

// export default CountDown

"use client"
import React, { useState, useEffect } from "react";
import Styles from './CountDown.module.css'

const CountDown = () => {
  
  const difference = +new Date(`10/10/2030`) - +new Date();
  const [delay, setDelay] = useState(difference);

  const d = Math.floor(difference / (1000 * 60 * 60 * 24));
  const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const m = Math.floor((difference / 1000 / 60) % 60);
  const s = Math.floor((difference / 1000) % 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  });
  return (
    <span className={Styles.count}>
      {d}:{h}:{m}:{s}
    </span>
  );
};

export default CountDown;
