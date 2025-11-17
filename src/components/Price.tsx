"use client";
import React, { useEffect, useState } from "react";
import Styles from "./Price.module.css";
import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
  const initialPrice = parseFloat(product.price as unknown as string);
  const [total, setTotal] = useState(initialPrice);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  const { addtoCart } = useCartStore();
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  useEffect(() => {
    if (product.options?.length) {
      setTotal(
        quantity * initialPrice + product.options[selected].additionalPrice
      );
    }
  }, [quantity, selected, product, initialPrice]);

  const handleCart = () => {
    addtoCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: product.price,
      ...(product.options?.length && {
        optionalTitle: product.options[selected].title,
      }),
      quantity: quantity,
    });
    toast.success("The product added to the cart!");
  };
  return (
    <div className={Styles.price}>
      <h2 className={Styles.price_h2}>${total}</h2>
      {/* options container  */}
      <div className={Styles.options_container}>
        {product.options?.length &&
          product.options?.map((option, index) => (
            <button
              className={Styles.options_button}
              key={option.title}
              style={{
                background: selected === index ? "rgb(248 113 133)" : "white",
                color: selected === index ? "white" : "red",
              }}
              onClick={() => setSelected(index)}
            >
              {option.title}
            </button>
          ))}
      </div>
      {/* quantity and button container  */}
      <div className={Styles.quantity_and_button}>
        {/* quantity */}
        <div className={Styles.quantity}>
          <span className={Styles.q_span}>Quantity</span>
          <div className={Styles.arrow_button}>
            <button
              className={Styles.arrow}
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              className={Styles.arrow}
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
          {/* cart button  */}
          <button className={Styles.button} onClick={handleCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Price;
