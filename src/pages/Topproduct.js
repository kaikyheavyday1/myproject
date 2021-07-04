import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

export default function Topproduct() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    const fetch = await axios.get(
      "http://localhost:4000/products/list?list=top"
    );
    const data = await fetch.data;
    setProducts(data);
  };
  return (
    <div className="topproduct container">
      <h1 className="mt-5">สินค้าแนะนำ</h1>
      <div className="row">
        {products.length > 0 &&
          products.map((products, index) => {
            return (
              <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                <Link to={`/product/${products.id}`}>
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src={products.pic}
                      alt="Card image cap"
                    />

                    <CardBody>
                      <CardTitle tag="h5">{products.name}</CardTitle>
                      <CardText>{products.price} บาท</CardText>
                      <StarRatings
                        rating={products.rating}
                        starDimension="15px"
                        starSpacing="2px"
                        starRatedColor="#40798C"
                      />
                    </CardBody>
                  </Card>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
