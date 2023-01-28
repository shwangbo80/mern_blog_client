import React from "react";
import {useState, useEffect} from "react";
import "./style.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {Container, Spinner} from "react-bootstrap";
import Moment from "react-moment";
import {useSelector} from "react-redux";

function BlogComponent() {
  const [loaded, setLoaded] = useState(false);
  const [blogdata, setBlogdata] = useState([]);
  const apiUrl = useSelector((state) => state.auth.apiUrl);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get(`${apiUrl}/api/post/all`);
    setLoaded(true);
    setBlogdata(result.data);
  };

  console.log(blogdata);

  const renderBlogData = () => {
    if (!loaded) {
      return (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="primary" />;
        </div>
      );
    } else {
      return blogdata.reverse().map((item) => {
        return (
          <Container key={item._id}>
            <div className="d-flex">
              <Moment format="MM/DD/YYYY">{item.createdAt}</Moment>
              <p className="ms-3">Category: {item.category}</p>
              <p className="ms-4">Author: {item.username}</p>
            </div>
            <Link className="blogLink" to={`/blogdetail/${item._id}`}>
              <h2>{item.title}</h2>
            </Link>
            <hr></hr>
          </Container>
        );
      });
    }
  };

  return <>{renderBlogData()}</>;
}

export default BlogComponent;
