"use client";
import React, { useEffect } from "react";
import Styles from "./cart.module.css";
import Image from "next/image";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Price from "@/components/Price";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckout = async () => {
    if (!session) {
      router.push("/");
    } else {
      try {
        const res = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: "Not Paid!",
            userEmail: session.user.email,
          }),
        });
        const data = await res.json();
        router.push(`/pay/${data.id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className={Styles.cart}>
      {/* products container */}
      <div className={Styles.products_container}>
        {/* single item */}
        {products.map((item) => (
          <div className={Styles.single_item} key={item.id}>
            {item.img && (
              <Image src={item.img} alt="" width={100} height={100} />
            )}
            <div className="">
              <h1 className={Styles.title}>
                {item.title} x{item.quantity}
              </h1>
              <span>{item.optionalTitle}</span>
            </div>
            <h2 className={Styles.price}>${item.price}</h2>
            <span
              className={Styles.delete}
              onClick={() => removeFromCart(item)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      {/* payment container  */}
      <div className={Styles.payment_container}>
        <div className={Styles.payment}>
          <span className="">Subtotal ({totalItems} items)</span>
          <span className="">${totalPrice}</span>
        </div>
        <div className={Styles.payment}>
          <span className="">Service Cost</span>
          <span className="">$0.00</span>
        </div>
        <div className={Styles.payment}>
          <span className="">Delivery Cost</span>
          <span className={Styles.free}>FREE!</span>
        </div>
        <hr className={Styles.horizontal} />
        <div className={Styles.payment}>
          <span className="">TOTAL (INCL .VAT)</span>
          <span className={Styles.total}>${totalPrice}</span>
        </div>
        <button className={Styles.button} onClick={handleCheckout}>
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;
