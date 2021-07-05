import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

export default function Addcart(props) {
  const productID = props.productID;
  const addcart = async () => {
    const fetch = await axios.post("http://localhost:4000/cart/add", props, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    });
    const data = await fetch.data;
    if (data.status === true) {
      swal("คุณได้นำสินค้าลงตะกร้า", "กดคลิก", "success").then((value) => {
        window.location.href = "http://localhost:3000/cart";
      });
    }
  };
  return (
    <div className="text-end cart-button">
      <button className = "btn btn-primary" onClick={addcart}>ใส่สินค้าลงตะกร้า</button>
    </div>
  );
}
