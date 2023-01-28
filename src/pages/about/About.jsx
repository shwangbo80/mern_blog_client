import React from "react";
import "./about.css";
import { Container, Row, Col, Image } from "react-bootstrap";
function About() {
  return (
    <Container className="aboutContainer">
      <Row>
        <Col></Col>
        <Col md={8}>
          <Row>
            <h2 className="mb-4">Soo Hwangbo</h2>
            <Col md={3}>
              <div className="imgContainer">
                <Image
                  fluid
                  src="https://www.soohwangbo.com/img/soo.jpg"
                  className="profileImg"
                ></Image>
              </div>
            </Col>
            <Col>
              <p>
                Full stack web developer emphasizing in React. I have designed,
                developed, and deployed more than 10 React apps online. I am
                passionate about building Full Stack web applications with great
                looking design and UI. My strong graphic design background
                allows me to visualize and execute complex color, typography,
                and layouts in web apps. I take great pride in my development
                work, and strive on execution and deploying the application
                online. I enjoy learning new language and cutting edge
                technologies, and apply them to my projects.
              </p>
            </Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default About;
