import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import { Service } from "../service/Service";

let userData = {
  email: null,
  password: null,
  confirmpassword: null,
  firstname: null,
  lastname: null,
  tel: null,
  address: null,
};
export default function Register() {
  const service = new Service();
  const [user, setUser] = useState(userData);
  const [error, setError] = useState();

  const handleInputChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setUser({ ...user, [id]: value });
  };

  const handleButtonSubmit = async () => {
    if (!user) {
      console.log("เกิดข้อผิดพลาด ไม่มีข้อมูล");
      return;
    }
    const validate = service.validateInput(user);
    if (validate) {
      setError(`กรุณาใส่ค่า ${validate}`);
      return;
    }
    const check = service.checkPassword(user);
    if (check === true) {
      const fetch = await axios.post(
        "http://localhost:4000/user/register",
        user
      );
      const data = await fetch.data;
      if (data.status === true) {
        swal('สมัครสมาชิกสำเร็จ', 'กดคลิกเพื่อเข้าสู่ระบบ', 'success').then((value) =>{
          window.location.href = 'http://localhost:3000/login'
        })
      }
    }else{
      setError(`รหัสผ่านกับยืนยันรหัสผ่านไม่ตรงกัน`);
    }
  };
  return (
    <div className="container register">
      <div className="register-field mt-5 col-8 mx-auto">
        <h1>สมัครสมาชิกของคุณ</h1>
        <div className="form-group">
          <label>อีเมล</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="อีเมลของคุณ"
            onChange={handleInputChange}
          />
        </div>
        <div className="row">
          <div className="form-group col-6 mt-2">
            <label>ชื่อ</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="form-control"
              placeholder="กรุณาใส่ชื่อของคุณ"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-6 mt-2">
            <label>นามสกุล</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="form-control"
              placeholder="กรุณาใส่นามสกุลของคุณ"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group mt-2">
          <label>เบอร์โทรศัพท์</label>
          <input
            type="tel"
            name="tel"
            id="tel"
            className="form-control"
            placeholder="กรุณาใส่เบอร์โทรของคุณ"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-2">
          <label>ที่อยู่</label>
          <textarea
            name="address"
            id="address"
            className="form-control"
            placeholder="กรุณากรอกที่อยู่ของคุณ"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-2">
          <label>รหัสผ่าน</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="กรุณาใส่รหัสผ่าน"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-2">
          <label>ยืนยันรหัสผ่าน</label>
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            className="form-control"
            placeholder="กรุณาใส่รหัสผ่าน"
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-5 text-center">
        <h4 style={{ color: 'red' }}>{error ? error : ''}</h4>
          <button type="button" onClick={handleButtonSubmit} className="mb-3">
            สมัครสมาชิก
          </button>
        </div>
      </div>
    </div>
  );
}
