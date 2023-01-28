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
          <Container key={item._id}>
            <Moment format="MM/DD/YYYY">{item.createdAt}</Moment>
            <Link to={`/dashboard/edit/${item._id}`}>
              <Button className="btn-primary ms-3 btn-sm">Edit</Button>
            </Link>
            <Link className="blogLink" to={`blogdetail/${item._id}`}>
              <h4>{item.title}</h4>
            </Link>
            <p>Category: {item.category}</p>
            <p>Author: {item.username}</p>
            <hr></hr>
          </Container>
        );
      });
    }
  };

  return <div className="postList">{renderBlogData()}</div>;
}

export default PostList;
