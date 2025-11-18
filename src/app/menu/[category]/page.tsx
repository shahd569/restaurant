import React from "react";
import Styles from "./category.module.css";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/types";
import { NextRequest } from "next/server";

const getData = async (category: string) => {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const fullUrl = `${baseUrl}/api/products?cat=${category}`;
  const res = await fetch(fullUrl, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

type Props = {
  params: { category: string };
};

const CategoryPage = async ({ params }: Props) => {
  const products: ProductType[] = await getData(params.category);
  return (
    <div className={Styles.category}>
      {products.map((item) => (
        <Link
          className={Styles.link}
          href={`/products/${item.id}`}
          key={item.id}
        >
          {/* image container */}
          {item.img && (
            <div className={Styles.image_container}>
              <Image src={item.img} alt="" fill className={Styles.image} />
            </div>
          )}
          {/* text container */}
          <div className={Styles.text_container}>
            <h1 className={Styles.title}>{item.title}</h1>
            <h2 className={Styles.price}>${item.price}</h2>
            <button className={Styles.button}>Add to Cart</button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
