import Image from "next/image";
import React from "react";
import Styles from "./Featured.module.css";
import { ProductType } from "@/types/types";

const getData = async () => {
  const res = await fetch("/api/products", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const Featured = async () => {
  const featuredProducts: ProductType[] = await getData();
  return (
    <div className={Styles.featured}>
      {/* wrapper */}
      <div className={Styles.wrapper}>
        {/* single item */}
        {featuredProducts.map((item) => (
          <div key={item.id} className={Styles.single_item}>
            {/* image container */}
            {item.img && (
              <div className={Styles.image_container}>
                <Image src={item.img} alt="" fill className={Styles.image} />
              </div>
            )}
            {/* text container */}
            <div className={Styles.text_container}>
              <h1 className={Styles.title}>{item.title}</h1>
              <p className={Styles.desc}>{item.desc}</p>
              <span className={Styles.price}>{item.price}</span>
              <button className={Styles.button}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
