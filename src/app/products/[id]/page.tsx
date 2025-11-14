import React from "react";
import Styles from "./products.module.css";
import Image from "next/image";
import Price from "@/components/Price";
import { ProductType } from "@/types/types";
import { NextRequest } from "next/server";
import DeleteButton from "@/components/DeleteButton";

const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const singleProduct: ProductType = await getData(params.id);
  return (
    <div className={Styles.single_product}>
      {/* image container */}
      {singleProduct.img && (
        <div className={Styles.image_container}>
          <Image src={singleProduct.img} alt="" fill className={Styles.image} />
        </div>
      )}
      {/* text container  */}
      <div className={Styles.text_container}>
        <h1 className={Styles.title}>{singleProduct.title}</h1>
        <p>{singleProduct.desc}</p>
        <Price product={singleProduct} />
      </div>
      <DeleteButton id={singleProduct.id} />
    </div>
  );
};

export default SingleProductPage;
