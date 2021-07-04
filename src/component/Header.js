import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
} from "reactstrap";

import { Link } from "react-router-dom";

import cart from "../images/Nav/cart.png";
import profile from "../images/Nav/profile.png";
import order from "../images/Nav/order.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const renderNav = () => {
    if (localStorage.getItem("access-token")) {
      return (
        <div>
          <Nav className="mr-auto" navbar>
            <NavLink id="cart">
              <Link to="/cart">
                <img src={cart} height="40px"></img>
              </Link>
            </NavLink>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <img src={profile} height="40px"></img>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/postproduct">ลงสินค้า</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/yourproduct">สินค้าของคุณ</Link>
                </DropdownItem>
                <DropdownItem onClick={Logout}>ออกจากระบบ</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/login">
            <button className="button-login">เข้าสู่ระบบ</button>
          </Link>
        </div>
      );
    }
  };
  const Logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("access-token");
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div className="header">
      <div className="container">
        <Navbar expand="md">
          <NavbarBrand href="/">Books</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} className="justify-content-between" navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink>
                  <Link to="/topproduct">สินค้าลดราคา</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to="/discountproduct">สินค้าแนะนำ</Link>
                </NavLink>
              </NavItem>
            </Nav>
            {renderNav()}
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
}
