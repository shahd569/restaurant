"use client";
import React from "react";
import Styles from "./orders.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderType } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "unauthenticated") {
    router.push("/");
  }
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:3000/api/orders").then((res) => res.json()),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "appliction/json",
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;
    mutation.mutate({ id, status });
    toast.success("the order status has been changed!");
  };
  if (isLoading || status === "loading") return "Loading...";

  return (
    <div className={Styles.orders}>
      <table className={Styles.table}>
        <thead>
          <tr className={Styles.table_row_1}>
            <th className={Styles.mobile_screen_1}>Order Id</th>
            <th>Date</th>
            <th>Price</th>
            <th className={Styles.mobile_screen_1}>Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: OrderType) => (
            <tr
              style={{
                backgroundColor:
                  item.status !== "delivered" ? "#fef2f2" : "transparent",
              }}
              key={item.id}
            >
              <td className={Styles.mobile_screen_2}>{item.id}</td>
              <td className={Styles.td2}>
                {item.createdAt.toString().slice(0, 10)}
              </td>
              <td className={Styles.td3}>{item.price}</td>
              <td className={Styles.mobile_screen_2}>
                {item.products[0].title}
              </td>
              {session?.user.isAdmin ? (
                <td>
                  <form
                    className={Styles.status_form}
                    onSubmit={(e) => handleUpdate(e, item.id)}
                  >
                    <input
                      placeholder={item.status}
                      className={Styles.status}
                    />
                    <button className={Styles.status_button}>
                      <Image src="/edit.png" alt="" width={20} height={20} />
                    </button>
                  </form>
                </td>
              ) : (
                <td className={Styles.td5}>{item.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
