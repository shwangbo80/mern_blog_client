import React, {useEffect, useState, useRef} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import Moment from "react-moment";
import "./dashboardBlogDetail.css";
import {useSelector} from "react-redux";

function BlogDetail() {
  const [loaded, setLoaded] = useState(false);
  const [commentLoaded, setCommentLoaded] = useState(false);
  const [blogDetailData, setBlogDetailData] = useState();
  const [commentDetailData, setCommentDetailData] = useState();
  const {id} = useParams();
  const name = useRef();
  const comment = useRef();
  const apiUrl = useSelector((state) => state.auth.apiUrl);

  useEffect(() => {
    fetchBlogData();
    fetchCommentData();
  }, []);

  const handeAddComment = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${apiUrl}/api/post/${id}/comments`, {
      name: name.current.value,
      comment: comment.current.value,
    });
    console.log(response);
    name.current.value = null;
    comment.current.value = null;
    fetchCommentData();
  };

  const fetchBlogData = async () => {
    const result = await axios.get(`${apiUrl}/api/post/${id}`);
    setLoaded(true);
    setBlogDetailData(result.data);
  };

  const fetchCommentData = async () => {
    const result = await axios.get(`${apiUrl}/api/post/${id}/comments`);
    setCommentLoaded(true);
    setCommentDetailData(result.data);
  };

  console.log(blogDetailData);

  const renderBlogData = () => {
    if (!loaded) {
      return <h4>Loading</h4>;
    } else {
      return (
        <>
          <div className="d-flex">
            <Moment format="MM/DD/YYYY">{blogDetailData.createdAt}</Moment>
            <p className="ms-3">Category: {blogDetailData.category}</p>
          </div>
          <hr></hr>
          <h1>{blogDetailData.title}</h1>
          <div
            className="bodyContainer"
            dangerouslySetInnerHTML={{__html: blogDetailData.body}}></div>
          <hr></hr>
          {/* <Row className="my-5">
            <Col md={8}>
              <p className="fw-bold">Add Comment</p>
              <Form onSubmit={handeAddComment}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    ref={name}
                    required={true}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <textarea
                    ref={comment}
                    placeholder="Enter comment"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    required={true}
                    rows="3"></textarea>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row> */}
          <h4 className="fw-bold my-5">Comments</h4>
          <hr></hr>
          {renderCommentData()}
        </>
      );
    }
  };

  const renderCommentData = () => {
    if (!commentLoaded) {
      return <p>Loading Comments</p>;
    } else {
      return (
        <>
          {commentDetailData.reverse().map((item) => {
            return (
              <div key={item._id}>
                <p className="fw-bold">{item.name}</p>
                <p>"{item.comment}"</p>
                <hr></hr>
              </div>
            );
          })}
        </>
      );
    }
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col md={8}>{renderBlogData()}</Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default BlogDetail;
