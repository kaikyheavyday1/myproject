import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Editvision from "../component/Editvision";
import Deleteproduct from "../component/Deleteproduct";

export default function Editproduct(props) {
  const productID = props.match.params.id;
  const [product, setProduct] = useState([]);
  const [newproduct, setNewproduct] = useState();
  useEffect(() => {
    getProduct();
    setNewproduct(props.match.params);
  }, []);
  const getProduct = async () => {
    const fetch = await axios.get(
      `http://localhost:4000/products/getproductID?id=${productID}`
    );
    const data = await fetch.data;
    setProduct(data);
  };
  const handleInputChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setNewproduct({ ...newproduct, [id]: value });
  };
  const handleEditSubmit = async () => {
    const fetch = await axios.post(
      "http://localhost:4000/products/edit",
      newproduct
    );
    const data = await fetch.data;
    if (data.status === true) {
      swal("แก้ไขสินค้าสำเร็จ", "กดคลิก", "success").then((value) => {
        window.location.href = "http://localhost:3000/yourproduct";
      });
    }
  };
 
  return (
    <div className="editproduct container">
      <div className="edit-field mt-5 col-10 mx-auto">
        <h3>แก้ไขสินค้าของคุณ</h3>
        {product.length > 0 &&
          product.map((product, index) => {
            return (
              <div>
                <div className="row">
                  <div className="col-4">
                    <img src={product.pic} className="w-100" />
                  </div>
                  <div className="col-8">
                    <div className="form-group">
                      <label>ชื่อหนังสือ</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder={product.productName}
                        className="form-control"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group mt-2">
                  <label>รายละเอียดหนังสือ</label>
                  <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    placeholder={product.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-2">
                  <label>ราคา</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    placeholder={product.price}
                    onChange={handleInputChange}
                  />
                </div>
                  </div>
                </div>
              </div>
            );
          })}
        <div>
          <button onClick={handleEditSubmit}>แก้ไขสินค้า</button>
          <Editvision productID = {productID} product= {product}/>
          <Deleteproduct productID = {productID} />
        </div>
      </div>
    </div>
  );
}
