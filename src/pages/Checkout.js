import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [cartorder, setCartorder] = useState([])
  const [price, setPrice] = useState();
  const [payment, setPayment] = useState();
  const [order, setOrder] = useState();
  useEffect(() => {
    getcart();
    getcartorder();
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
    setPayment({ total_price: sum });
  };
  const getcartorder = async() =>{
    const fetch = await axios.get("http://localhost:4000/cart/getorder", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    });
    const data = await fetch.data;
    setCartorder(data);
  }
  const handleInputChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setPayment({ ...payment, [id]: value });
  };
  const handleButtonSubmit = async () => {
    setOrder({ payment: payment, cart: cartorder });
    const fetch = await axios.post("http://localhost:4000/payment", order, {
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
    <div className="cart container">
      {console.log(payment)}
      <div className="row mt-5">
        <div className="col-8">
          <div>
            <h2>ที่อยู่ในการจัดส่ง</h2>
          </div>
          <div className="row">
            <div className="form-group col-6">
              <label>ชื่อ</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="form-control"
                placeholder="ชื่อของคุณ"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-6">
              <label>นามสกุล</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="form-control"
                placeholder="นามสกุลของคุณ"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-12">
              <label>ที่อยู่</label>
              <textarea
                name="address"
                id="address"
                className="form-control"
                placeholder="ใส่ที่อยู่ของคุณ"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-6">
              <label>แขวง/ตำบล</label>
              <input
                type="text"
                name="district"
                id="district"
                className="form-control"
                placeholder="แขวงหรือตำบลของคุณ"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-6">
              <label>เขต/อำเภอ</label>
              <input
                type="text"
                name="amphure"
                id="amphure"
                className="form-control"
                placeholder="เขตหรือตำบลของคุณ"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-6">
              <label>จังหวัด</label>
              <input
                type="text"
                name="province"
                id="province"
                className="form-control"
                placeholder="จังหวัดของคุณ"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-6">
              <label>รหัสไปรษณีย์</label>
              <input
                type="text"
                name="zip"
                id="zip"
                className="form-control"
                placeholder="รหัสไปรษณีย์ของคุณ"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-12">
              <label>เบอร์โทรศัพท์</label>
              <input
                type="text"
                name="tel"
                id="tel"
                className="form-control"
                placeholder="เบอร์โทรศัพท์ของคุณ"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-6">
              <label>เลือกการจัดส่งของคุณ</label>
              <select
                class="form-control"
                onChange={handleInputChange}
                id="delivery"
              >
                <option value="">กรุณาเลือกการจัดส่ง</option>
                <option value="free">free shipping</option>
                <option value="kerry">kerry</option>
                <option value="flash">flash</option>
              </select>
            </div>
            <div className="form-group col-6">
              <label>เลือกการชำระเงินของคุณ</label>
              <select
                class="form-control"
                onChange={handleInputChange}
                id="pay"
              >
                <option value="">กรุณาเลือกการชำระเงิน</option>
                <option value="payment on delivery">ชำระเงินปลายทาง</option>
                <option value="debit/credit">บัตรเครดิต/เดบิต</option>
              </select>
            </div>
            <div className="mt-5">
              <button onClick={handleButtonSubmit}>ชำระเงิน</button>
            </div>
          </div>
        </div>
        <div className="col-4 mt-5">
          <h4>สรุปคำสั่งซื้อ</h4>
          {cart.length > 0 &&
            cart.map((cart, index) => {
              return (
                <div className="d-flex justify-content-between">
                  <img src={cart.pic} height="50px" />
                  <p>{cart.name}</p>
                  <p>{cart.price} บาท</p>
                </div>
              );
            })}
          <h5>รวมราคาทั้งหมด : {price !== undefined && price} บาท</h5>
        </div>
      </div>
    </div>
  );
}
