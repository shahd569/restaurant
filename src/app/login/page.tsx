"use client";
import React from "react";
import Styles from "./login.module.css";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className={Styles.login}>
      {/* box */}
      <div className={Styles.box}>
        {/* image container */}
        <div className={Styles.image_container}>
          <Image src="/loginBg.png" alt="" fill className={Styles.image} />
        </div>
        {/* form container */}
        <div className={Styles.form_container}>
          <h1 className={Styles.title}>Welcome</h1>
          <p>Log into your account or create a new one using social buttons</p>
          <button className={Styles.google} onClick={() => signIn("google")}>
            <Image
              src="/google.png"
              alt=""
              width={20}
              height={20}
              className={Styles.google_image}
            />
            <span>Sign in with Google</span>
          </button>
          <button className={Styles.facebook}>
            <Image
              src="/facebook.png"
              alt=""
              width={20}
              height={20}
              className={Styles.facebook_image}
            />
            <span>Sign in with Facebook</span>
          </button>
          <p className={Styles.paragraph}>
            Have a problem?{" "}
            <Link href="/" className={Styles.link}>
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
