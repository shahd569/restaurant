"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Styles from "./CartIcon.module.css";
import { useCartStore } from "@/utils/store";

const CartIcon = () => {
  const { totalItems } = useCartStore();
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return (
    <Link href="/cart" className={Styles.cart_link}>
      <div className={Styles.cart_icon}>
        <Image src="/cart.png" alt="" fill />
      </div>
      <span>Cart ({totalItems})</span>
    </Link>
  );
};

export default CartIcon;
