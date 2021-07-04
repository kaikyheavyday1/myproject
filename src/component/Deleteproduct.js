import React from "react";
import axios from "axios";
import swal from "sweetalert";
export default function Deleteproduct(props) {
  const productID = props.productID;
  const handleButtonSubmit = async () => {
    swal({
      title: "คุณแน่ใจที่จะลบสินค้าของคุณใช่หรือไม่",
      text: "ถ้าคุณลบจะไม่สามารถกู้สินค้าของคุณได้",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      const fetch = await axios.get(
        `http://localhost:4000/products/delete?id=${productID}`
      );
      const data = await fetch.data;
      if (willDelete) {
        swal("คุณได้ลบสินค้าของคุณแล้ว", {
          icon: "success",
        }).then((value) => {
          window.location.href = "http://localhost:3000/yourproduct";
        });
      } else {
        swal("คุณไม่ได้ลบสินค้าของคุณ");
      }
    });
  };
  return (
    <div>
      <button onClick={handleButtonSubmit}>ลบสินค้าของคุณ</button>
    </div>
  );
}
