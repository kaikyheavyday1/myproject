import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

export default function Editvision(props) {
  const productID = props.productID;
  const product = props.product;
  const handleVisionOff = async () => {
    const fetch = await axios.post(
      `http://localhost:4000/products/update?id=${productID}&&status=off`
    );
    const data = await fetch.data;
    if (data.status === true) {
      swal("ปิดการมองเห็นสินค้าสำเร็จ", "กดคลิก", "success").then((value) => {
        window.location.href = "http://localhost:3000/yourproduct";
      });
    }
  };
  const handleVisionOn = async () => {
    const fetch = await axios.post(
      `http://localhost:4000/products/update?id=${productID}&&status=on`
    );
    const data = await fetch.data;
    if (data.status === true) {
      swal("เปิดการมองเห็นสินค้าสำเร็จ", "กดคลิก", "success").then((value) => {
        window.location.href = "http://localhost:3000/yourproduct";
      });
    }
  };
  return (
    <div>
      {product.length > 0 &&
        product.map((product, index) => {
          if (product.status === 2) {
            return (
              <button className ="btn btn-info vis" onClick={handleVisionOn}>เปิดการมองเห็นสินค้า</button>
            );
          } else {
            return (
              <button className ="btn btn-info vis" onClick={handleVisionOff}>ปิดการมองเห็นสินค้า</button>
            );
          }
        })}
    </div>
  );
}
