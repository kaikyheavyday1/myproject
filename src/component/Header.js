import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="header">
      <div className="container">
        <Navbar expand="md">
          <NavbarBrand href="/">Books</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} className="justify-content-between" navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink>สินค้าใหม่</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>สินค้าขายดี</NavLink>
              </NavItem>
            </Nav>
            <div>
              <Link to="/register">
                <button className="button-login">เข้าสู่ระบบ</button>
              </Link>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
}
