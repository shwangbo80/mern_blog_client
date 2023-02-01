import React from "react";
import {useState, useRef, useEffect} from "react";
import {Container, Button, Form, Row, Col} from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editBlog.css";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function EditBlog() {
  const {id} = useParams();
  console.log("edit blog");
  const loggedIn = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.auth.user);
  const apiUrl = useSelector((state) => state.auth.apiUrl);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [blogDetailData, setBlogDetailData] = useState();
  const [blogCatebory, setBlogCatebory] = useState();
  const [blogTitle, setBlogTitle] = useState();
  const [blogBody, setBlogBody] = useState();

  const modules = {
    toolbar: [
      [{header: [1, 2, 3, 4, 5, 6, false]}],

      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{list: "ordered"}, {list: "bullet"}],
      [{script: "sub"}, {script: "super"}], // superscript/subscript
      [{indent: "-1"}, {indent: "+1"}], // outdent/indent
      [{direction: "rtl"}], // text direction

      [{color: []}, {background: []}], // dropdown with defaults from theme
      [{font: []}],
      [{align: []}],

      ["image", "video"],

      ["clean"], // remove formatting button
    ],
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get(`${apiUrl}/api/post/${id}`);
    setLoaded(true);
    setBlogDetailData(result.data);
    setBlogCatebory(result.data.category);
    setBlogTitle(result.data.title);
    setBlogBody(result.data.body);
  };

  const postBlog = async (e) => {
    e.preventDefault();

    // if (blogBody.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
    //   console.log("Invalid requiest");
    //   return;
    // }

    try {
      const response = await axios.put(`${apiUrl}/api/post/${id}`, {
        userId: user._id,
        category: blogCatebory,
        title: blogTitle,
        body: blogBody,
      });
      console.log(response);
      navigate("/");
    } catch (err) {
      console.log(err);
      return;
    }
  };

  console.log(blogBody);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the post?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(`${apiUrl}/api/post/${id}`, {
          data: {userId: user._id},
        });
        console.log(response);
        navigate("/");
      } catch (err) {
        console.log(err);
        return;
      }
    }
  };

  //   console.log(user._id);
  //   console.log(blogDetailData.userId);

  const renderBlogData = () => {
    if (!loaded) {
      return <h4>Loading</h4>;
    } else {
      return (
        <Form>
          <Form.Group className="mt-5 mb-4" controlId="formGroupEmail">
            <div>
              <h2 className="mb-3">Edit Blog</h2>
              <Button className="btn-danger mb-5" onClick={handleDelete}>
                Delete
              </Button>
            </div>
            <Form.Label>Category</Form.Label>
            <Form.Select
              aria-label="Category"
              value={blogCatebory}
              onChange={(e) => {
                setBlogCatebory(e.target.value);
              }}>
              <option value="Tech">Tech</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Coding">Coding</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-4" controlId="formGroupEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={blogTitle}
              onChange={(e) => {
                setBlogTitle(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-5" controlId="formGroupPassword">
            <Form.Label>Body</Form.Label>
            <ReactQuill
              modules={modules}
              theme="snow"
              value={blogBody}
              onChange={setBlogBody}
              className="blogEditor"
            />
          </Form.Group>
          <Button
            className="my-5"
            variant="secondary"
            type="submit"
            onClick={postBlog}>
            Submit
          </Button>
        </Form>
      );
    }
  };

  return <>{renderBlogData()}</>;
}

export default EditBlog;
