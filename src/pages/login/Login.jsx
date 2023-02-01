import React from "react";
import {useState, useRef} from "react";
import {Container, Button, Form, Row, Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./login.css";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {loginStart, loginSuccess, loginFailure} from "../../slice/authSlice";

function Login() {
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const apiUrl = useSelector((state) => state.auth.apiUrl);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${apiUrl}/api/auth/login`, {
      email: email.current.value,
      password: password.current.value,
    });
    window.localStorage.setItem("user", JSON.stringify(response.data));
    dispatch(loginSuccess({user: response.data}));
    console.log(response.data);
    // const userData = localStorage.getItem("user");
    // console.log(window.localStorage.getItem("user"));
    navigate("/");
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col md={6}>
          <div className="loginContainer">
            <Form className="formContainer">
              <h3 className="mb-5 text-center">LOGIN</h3>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={email}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={password}
                />
              </Form.Group>
              <Button
                className="mt-3"
                variant="primary"
                type="submit"
                onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default Login;
