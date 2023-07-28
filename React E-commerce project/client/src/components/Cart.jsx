import axios from "axios";
import React from "react";

export default function Cart() {
  async function getCartItems() {
    try {
      const { data } = axios.get(
       "https://ecommerce.routemisr.com/api/v1/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          }}
          );
          console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

  return <button onClick={getCartItems}>Cart</button>;
}
