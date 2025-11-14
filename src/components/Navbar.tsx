import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import Styles from "./Navbar.module.css";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";

const Navbar = () => {
  return (
    <div className={Styles.navbar}>
      {/* left links */}
      <div className={Styles.nav_left}>
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">Contact</Link>
      </div>
      {/* LOGO */}
      <div className={Styles.logo}>
        <Link href="/">Massimo</Link>
      </div>
      {/* mobile menu */}
      <div className={Styles.mobile_screen}>
        <Menu />
      </div>
      {/* right links */}
      <div className={Styles.nav_right}>
        <div className={Styles.phone}>
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span>123 456 78</span>
        </div>
        <UserLinks />
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
