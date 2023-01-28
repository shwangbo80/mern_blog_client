import React from "react";
import {Container} from "react-bootstrap";
import BlogComponent from "../../components/BlogComponent";
import "./home.css";

function Home() {
  return (
    <Container fluid className="headerContainer">
      <div className="header">
        <div>
          <h2>Soo's Blog</h2>
          <p>Tech / Lifestyle / Coding</p>
        </div>
      </div>
      <Container className="mt-5">
        <BlogComponent />
      </Container>
    </Container>
  );
}

export default Home;
