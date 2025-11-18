import React from "react";
import Styles from "./menu.module.css";
import Link from "next/link";
import { MenuType } from "@/types/types";

const getData = async () => {
  const res = await fetch("/api/categories", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const MenuPage = async () => {
  const menu: MenuType = await getData();
  return (
    <div className={Styles.menu}>
      {menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          style={{ backgroundImage: `url(${category.img})` }}
          className={Styles.link}
        >
          <div
            className={Styles.text_container}
            style={{ color: `${category.color}` }}
          >
            <h1 className={Styles.title}>{category.title}</h1>
            <p className={Styles.paragraph}>{category.desc}</p>
            <button
              className={Styles.button}
              style={{
                backgroundColor: `${category.color}`,
                color: `${category.color === "black" ? "white" : "#ef4444"}`,
              }}
            >
              Explore
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
