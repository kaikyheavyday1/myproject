import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import StarRatings from "react-star-ratings";

export default function Producthome() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    const fetch = await axios.get("http://localhost:4000/products/getall");
    const data = await fetch.data;
    setProducts(data);
  };
  return (
    <div>
      <h3>สินค้าทั้งหมด</h3>
      <div className="row mt-3">
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
                        starRatedColor ="#40798C"
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
