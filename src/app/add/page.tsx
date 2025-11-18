"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Styles from "./add.module.css";

type Option = {
  title: string;
  additionalprice: number;
};

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

const Addpage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });
  const [option, setOption] = useState<Option>({
    title: "",
    additionalprice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };

  const upload = async () => {
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "restaurant");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dpkfofscc/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    if (!res.ok) {
      console.error("Cloudinary upload failed:", await res.text());
      throw new Error("Cloudinary upload failed!");
    }
    const resData = await res.json();
    return resData.url;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let url = "";
      if (file) {
        url = await upload();
      } else {
        url = "";
      }
      const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
      const fullUrl = `${baseUrl}/api/products`;
      const res = await fetch(fullUrl, {
        method: "POST",
        body: JSON.stringify({
          img: url,
          ...inputs,
          options,
        }),
      });
      const data = await res.json();
      router.push(`/products/${data.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form action="" className={Styles.addForm} onSubmit={handleSubmit}>
        <h1>Add New Product</h1>
        <div className={Styles.labels}>
          <label>Image</label>
          <input
            type="file"
            className={Styles.inputs}
            onChange={handleChangeImg}
          />
        </div>
        <div className={Styles.labels}>
          <label>Title</label>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            className={Styles.inputs}
          />
        </div>
        <div className={Styles.labels}>
          <label>Desc</label>
          <textarea
            onChange={handleChange}
            name="desc"
            className={Styles.inputs}
          />
        </div>
        <div className={Styles.labels}>
          <label>Price</label>
          <input
            onChange={handleChange}
            type="number"
            name="price"
            className={Styles.inputs}
          />
        </div>
        <div className={Styles.labels}>
          <label>Category</label>
          <input
            onChange={handleChange}
            type="text"
            name="catSlug"
            className={Styles.inputs}
          />
        </div>
        <div className={Styles.labels}>
          <label>Options</label>
          <div>
            <input
              onChange={changeOption}
              type="text"
              placeholder="Title"
              name="title"
              className={Styles.inputs}
            />
            <input
              onChange={changeOption}
              type="number"
              placeholder="Additional Price"
              name="additionalprice"
              className={Styles.inputs}
            />
          </div>
          <div
            className={Styles.button}
            onClick={() => setOptions((prev) => [...prev, option])}
          >
            Add Option
          </div>
        </div>
        <div>
          {options.map((item) => (
            <div
              className={Styles.option}
              key={item.title}
              onClick={() =>
                setOptions(options.filter((opt) => opt.title !== item.title))
              }
            >
              <span>{item.title}</span>
              <span>${item.additionalprice}</span>
            </div>
          ))}
        </div>
        <button type="submit" className={Styles.submit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addpage;
