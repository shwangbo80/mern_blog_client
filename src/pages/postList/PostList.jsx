import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import {Link, useParams, useNavigate} from "react-router-dom";
import {Container, Button, Spinner} from "react-bootstrap";
import "./postlist.css";
import Moment from "react-moment";
import {useSelector} from "react-redux";

function PostList() {
  const {id} = useParams();
  const [loaded, setLoaded] = useState(false);
  const [blogdata, setBlogdata] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const apiUrl = useSelector((state) => state.auth.apiUrl);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get(`${apiUrl}/api/post/all`);
    setLoaded(true);
    setBlogdata(result.data);
  };

  //   const handleDelete = async () => {
  //     const confirmDelete = window.confirm(
  //       "Are you sure you want to delete the post?"
  //     );
  //     if (confirmDelete) {
  //       await axios.delete(`http://localhost:8800/api/post/${id}`, {
  //         userId: user._id,
  //       });
  //       navigate("/");
  //     }
  //   };

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
          <Container key={item._id} className="mb-3">
            <div className="mb-2">
              <Moment format="MM/DD/YYYY">{item.createdAt}</Moment>
              <Link to={`/dashboard/edit/${item._id}`}>
                <Button className="btn-primary ms-3 btn-sm">Edit</Button>
              </Link>
            </div>
            <Link className="blogLink" to={`blogdetail/${item._id}`}>
              <h5>{item.title}</h5>
            </Link>
            <div className="d-flex">
              <p>Category: {item.category}</p>
              <p className="ms-4">Author: {item.username}</p>
            </div>
          </Container>
        );
      });
    }
  };

  return <div className="postList">{renderBlogData()}</div>;
}

export default PostList;
