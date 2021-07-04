import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState();
  useEffect(() => {
    getcart();
  }, []);
  const getcart = async () => {
    const fetch = await axios.get("http://localhost:4000/cart/get", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    });
    const data = await fetch.data;
    setCart(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].price;
    }
    setPrice(sum);
  };
  const deletecart = async (e) => {
    const cart_id = e.target.id;
    const fetch = await axios.get(
      `http://localhost:4000/cart/delete?id=${cart_id}`
    );
    const data = await fetch.data;
    if (data.status === true) {
      swal("ลบสินค้าในตะกร้าแล้ว", "กดคลิก", "success").then((value) => {
        window.location.href = "http://localhost:3000/cart";
      });
    }
  };
  const deleteallcart = async (e) => {
    const fetch = await axios.get(
      "http://localhost:4000/cart/delete?all=true",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access-token"),
        },
      }
    );
    const data = await fetch.data;
    if (data.status === true) {
      swal("ลบสินค้าในตะกร้าทั้งหมดแล้ว", "กดคลิก", "success").then((value) => {
        window.location.href = "http://localhost:3000/cart";
      });
    }
  };
  return (
    <div className="cart container mt-5">
      <div className="title">
        <h3>ตะกร้ารถเข็นของคุณ</h3>
      </div>
      <div className="cart-field">
        {cart.length > 0 &&
          cart.map((cart, index) => {
            return (
              <div className="row incart pt-3">
                <div className="col-3">
                  <img src={cart.pic} height="100px" />
                </div>
                <div className="col-3">
                  <h4>{cart.name}</h4>
                </div>
                <div className="col-3 text-center">
                  <h4>{cart.price} บาท</h4>
                </div>
                <div className="col-3 text-center">
                  <button
                    className="btn btn-danger"
                    onClick={deletecart}
                    id={cart.id}
                  >
                    ลบ
                  </button>
                </div>
                <hr className="mt-2"></hr>
              </div>
            );
          })}
      </div>
      <div className="d-flex justify-content-between pt-3 sumfield">
        <h3>
          รวมราคาทั้งหมด : {price !== undefined && price} บาท
        </h3>
        <div>
          <button onClick={deleteallcart} className="btn btn-danger" id="delete">ล้างตะกร้าสินค้า</button>
          <Link to="/checkout">
            <button className="btn btn-primary">ชำระเงิน</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
