import React, { useState, useEffect } from "react";
import axios from "axios";
import Addcart from "../component/Addcart";
import Addrating from "../component/Addrating";


export default function Product(props) {
  const productID = props.match.params.id;
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    const fetch = await axios.get(
      `http://localhost:4000/products/getproductID?id=${productID}`
    );
    const data = await fetch.data;
    setProduct(data);
  };
  return (
    <div className="container product mt-5">
      {product.length > 0 &&
        product.map((product, index) => {
          console.log(product);
          return (
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                <img src={product.pic} alt="product-pic" className="w-100" />
              </div>
              <div className="col-lg-8 col-md-6 col-sm-12 col-12">
                <div className="product-field col-10 mx-auto mt-5">
                  <h2>{product.productName}</h2>
                  <p className="mt-4">{product.description}</p>
                  <h1 className="mt-5">
                    ราคา {product.price-product.discount} บาท
                    <span className="text-decoration-line-through">
                      {product.discount === 0 && ""}
                      {product.discount > 0 && `ลด ${product.discount} บาท`
                        
                      }
                    </span>
                  </h1>
                  <Addcart productID={productID} />
                  <h3>
                    ผู้ลงขายสินค้า : {product.firstname} {product.lastname}
                  </h3>
                  <p>
                    วันที่ลงขายสินค้า :{" "}
                    {product.create_date.toString().split("T")[0]}
                  </p>
                  <p>สถานะการมองเห็น : {product.status === 1 && "เปิด"}{product.status ===2 && "ปิด"} </p>
                  <Addrating rating = {product.rating} productID ={productID}/>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
