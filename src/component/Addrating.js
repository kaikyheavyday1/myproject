import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import StarRatings from "react-star-ratings";
import ReactStars from "react-rating-stars-component";
import axios from "axios";

export default function Addrating(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const productID = props.productID
  const rating = props.rating;
  const [newrating, setNewrating] = useState();
  const ratingChanged = (newRating) => {
    setNewrating({ ...newrating, rating: newRating });
  };
  const handleSubmit = async () => {
    const fetch = await axios.post(`http://localhost:4000/rating?product_id=${productID}`, newrating, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    });
    const data = await fetch.data;
    alert(data)
  };
  return (
    <div className="d-flex justify-content-around">
      <StarRatings
        rating={rating}
        starDimension="25px"
        starSpacing="2px"
        starRatedColor="#40798C"
      />
      <Button color="danger" onClick={toggle}>
        ให้เรตติ้งสินค้า
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>ให้เรตติ้งสินค้า</ModalHeader>
        <ModalBody>
          <ReactStars
            classNames="mt-3 ml-2"
            count={5}
            onChange={ratingChanged}
            size={50}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            ให้เรตติ้ง
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            ยกเลิก
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
