"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SearchParamsComponent = () => {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const router = useRouter();

  useEffect(() => {
    if (!payment_intent) return;

    const makeRequset = async () => {
      const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
      const fullUrl = `${baseUrl}/api/checkout/confirm/${payment_intent}`;
      try {
        await fetch(fullUrl, {
          method: "PUT",
        });
        router.push("/orders");
      } catch (err) {
        console.log(err);
      }
    };
    makeRequset();
  }, [payment_intent, router]);

  return null;
};

export default SearchParamsComponent;
