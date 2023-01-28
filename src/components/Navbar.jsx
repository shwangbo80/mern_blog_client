import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {redirect, Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {loggedOut} from "../slice/authSlice";

function NavbarComponent() {
  const loggedIn = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(loggedOut());
    localStorage.removeItem("user");
    return redirect("/");
  };

  return (
    <Container>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="navContainer my-3">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="navLink">
              Soo_Hwangbo
            </Link>
            <Link to="/about" className="navLink">
              About
            </Link>
          </Nav>
          <Nav>
            {!loggedIn ? (
              <Link to="/login" className="navLink">
                Login
              </Link>
            ) : (
              <>
                <Link to="/dashboard" className="navLink">
                  Dashboard
                </Link>
                <Link to="/login" onClick={handleLogout} className="navLink">
                  Logout
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default NavbarComponent;
