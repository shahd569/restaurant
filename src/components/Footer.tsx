import Link from 'next/link'
import React from 'react'
import Styles from "./Footer.module.css"

const Footer = () => {
  return (
    <div className={Styles.footer}>
      <Link href="/" className={Styles.logo}>MASSIMO</Link>
      <p>© ALL RIGHTS RESERVED.</p>
    </div>
  )
}

export default Footer
