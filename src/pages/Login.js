import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

let userData ={
  email : "",
  password : ""
}
export default function Login() {
  const [user, setUser] = useState(userData)
  const handleInputChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setUser({ ...user, [id]: value });
  };
  const handleButtonSubmit = async() =>{
    if (user.email !== '' && user.password !== ''){
      const fetch = await axios.post('http://localhost:4000/user/login', user)
      const data = await fetch.data
      console.log(data)
      if (data.status === false){
        swal({
          title: 'Sorry!',
          text: 'ชื่อผู้ใช้หรือรหัสผ่านคุณไม่ถูกต้อง',
          icon: 'warning',
          button: 'OK',
        })
      }else{       
        swal('success!', 'เข้าสู่ระบบสำเร็จ', 'success').then((value) => {
          localStorage.setItem('access-token', data)
          window.location.href = 'http://localhost:3000/'
        })
      }
    }
  }
  return (
    <div className="login container mt-5 mb-5">
      <div className="in-login col-8 mx-auto">
        <h1>เข้าสู่ระบบ</h1>
        <div className="form-group">
          <label>อีเมล</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="อีเมลของคุณ"
            onChange ={handleInputChange}
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
            onChange ={handleInputChange}
          />
        </div>
        <div className="mt-5 text-center">
          <button type="button" onClick={handleButtonSubmit} className="mb-3">
            เข้าสู่ระบบ
          </button>
        </div>
        <div className="text-center pb-3">
          <h3>
            <Link to="/register">สมัครสมาชิก</Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
