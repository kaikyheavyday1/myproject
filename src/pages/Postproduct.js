import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageUploader from "react-images-upload";
import firebase from "firebase";
import swal from "sweetalert";

import { Service } from "../service/Service";

let productData = {
  name: null,
  description: null,
  price: null,
  pic: null,
};

export default function Postproduct() {
  var firebaseConfig = {
    apiKey: "AIzaSyCAXr6E34IvwkIhJUr5MehYCVTmw-R9YDI",
    authDomain: "book-e5cdd.firebaseapp.com",
    projectId: "book-e5cdd",
    storageBucket: "book-e5cdd.appspot.com",
    messagingSenderId: "888657019094",
    appId: "1:888657019094:web:ac17ef23bd5478be690977",
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  const [user, setUser] = useState();
  const [product, setProduct] = useState(productData);
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState(null);
  const service = new Service();
  useEffect(() => {
    getuserID();
  }, []);
  const getuserID = async () => {
    const fetch = await axios.get("http://localhost:4000/user/getID", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    });
    const data = await fetch.data;
    setUser(data.user_id);
  };
  const handleInputChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setProduct({ ...product, [id]: value });
  };
  const onDrop = async (picture) => {
    setPicture(picture);
    const url = await uploadImageToFirebase(picture, 1);
    setProduct({ ...product, pic: url });
  };
  const uploadImageToFirebase = (file, state) => {
    return new Promise((resolve, reject) => {
      const storageRef = firebase
        .storage()
        .ref(`${user}/products/${file[0].name}`);
      var metadata = { contentType: "image/jpeg" };
      const task = storageRef.put(file[0], metadata);
      let url;
      task.on(
        `state_changed`,
        (snapshort) => {
          let percentage =
            (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
          console.log(percentage);
        },
        (error) => {
          console.log(error);
        },
        () => {
          task.snapshot.ref.getDownloadURL().then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };
  const handleButtonSubmit = async () => {
    const validate = service.validateInputBook(product);
    if (validate) {
      setError(`กรุณาใส่ค่า ${validate}`);
      return;
    }
    const fetch = await axios.post(
      "http://localhost:4000/products/post",
      product,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access-token"), 
        },
      }
    );
    const data = await fetch.data;
    if (data.status === true) {
      swal("อัพโหลดหนังสือสำเร็จ", "กดคลิก", "success").then((value) => {
        window.location.href = "http://localhost:3000/yourproduct";
      });
    }
  };

  return (
    <div className="postproduct container">
      <h3 className="title mt-5 text-center">ลงสินค้าของคุณ</h3>
      <div className="post-field col-9 mx-auto">
        <div className="form-group">
          <label>ชื่อหนังสือ</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="ใส่ชื่อหนังสือ"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-2">
          <label>รายละเอียดหนังสือ</label>
          <textarea
            name="description"
            id="description"
            className="form-control"
            placeholder="ใส่รายละเอียดหนังสือ"
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
            placeholder="ใส่ราคาหนังสือ"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-2">
          <ImageUploader
            singleImage={true}
            onChange={onDrop}
            withPreview={true}
          />
        </div>
        <div className="mt-5 text-center">
          <h4 style={{ color: "red" }}>{error ? error : ""}</h4>
          <button type="button" onClick={handleButtonSubmit} className="mb-3 btn btn-success">
            ลงสินค้า
          </button>
        </div>
      </div>
    </div>
  );
}
