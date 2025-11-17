// /src/components/SearchParamsComponent.tsx

"use client"; // هذا المكون هو العميل بشكل صريح

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SearchParamsComponent = () => {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const router = useRouter();

  useEffect(() => {
    // إذا لم يكن هناك payment_intent، لا تقم بأي شيء
    if (!payment_intent) return;

    const makeRequset = async () => {
      try {
        // تأكد من أن عنوان URL صحيح (استخدم /api/checkout/confirm/[intentId] كما كان في الكود السابق)
        await fetch(
          `http://localhost:3000/api/checkout/confirm/${payment_intent}`,
          {
            method: "PUT",
          }
        );
        router.push("/orders");
      } catch (err) {
        console.log(err);
      }
    };
    makeRequset();
  }, [payment_intent, router]);

  return null; // هذا المكون لا يعرض شيئًا، فقط يقوم بتنفيذ المنطق
};

export default SearchParamsComponent;
