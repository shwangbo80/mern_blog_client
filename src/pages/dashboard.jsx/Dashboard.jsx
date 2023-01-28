import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";

function Dashboard() {
  return (
    <Container fluid className="rowContainer">
      <Row>
        <Col md={2} className="mt-5">
          <p>
            <Link to="/dashboard" className="navLink">
              Dashboard
            </Link>
          </p>
          <p>
            <Link to="/dashboard/add" className="navLink">
              Add Post
            </Link>
          </p>
        </Col>
        <Col md={8} lg={6}>
          <Outlet />
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
