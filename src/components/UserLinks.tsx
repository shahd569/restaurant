"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Styles from "./UserLinks.module.css";

const UserLinks = () => {
  const { status } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <div>
          <Link href="/orders">Orders</Link>
          <span onClick={() => signOut()} className={Styles.signOut}>
            Logout
          </span>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default UserLinks;
