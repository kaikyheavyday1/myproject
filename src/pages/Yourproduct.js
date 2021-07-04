import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

export default function Yourproduct() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    const fetch = await axios.get(
      "http://localhost:4000/products/getbyuserID",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access-token"),
        },
      }
    );
    const data = await fetch.data;
    setProducts(data);
  };
  return (
    <div className="container yourproduct">
      <div className="product-field mt-5">
        <h3>สินค้าที่คุณลงไว้</h3>
        <div className="row">
          {products.length > 0 &&
            products.map((products, index) => {
              return (
                <div className="col-3">
                  <Card>
                    <Link to={`/product/${products.id}`}>
                      <CardImg
                        top
                        width="100%"
                        src={products.pic}
                        alt="Card image cap"
                      />
                    </Link>
                    <CardBody>
                      <CardTitle tag="h5">{products.name}</CardTitle>
                      <CardText>{products.price} บาท</CardText>
                      <StarRatings
                        rating={products.rating}
                        starDimension="25px"
                        starSpacing="2px"
                        starRatedColor="#40798C"
                      />
                    </CardBody>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
