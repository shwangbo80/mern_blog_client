import React from "react";
import {useState, useRef} from "react";
import {Container, Button, Form, Row, Col} from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./createblog.css";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function CreateBlog() {
  const [value, setValue] = useState();
  const user = useSelector((state) => state.auth.user.user);
  const apiUrl = useSelector((state) => state.auth.apiUrl);

  const category = useRef();
  const title = useRef();
  const navigate = useNavigate();

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

  const postBlog = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      await axios.post(`${apiUrl}/api/post/`, {
        userId: user._id,
        username: user.username,
        category: category.current.value,
        title: title.current.value,
        body: value,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <Form onSubmit={postBlog}>
      <Form.Group className="mt-5 mb-4" controlId="formGroupEmail">
        <Form.Label>Category</Form.Label>
        <Form.Select aria-label="Category" ref={category}>
          <option value="Tech">Tech</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Coding">Coding</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-4" controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter title" ref={title} />
      </Form.Group>
      <Form.Group className="mb-5" controlId="formGroupPassword">
        <Form.Label>Body</Form.Label>
        <ReactQuill
          modules={modules}
          theme="snow"
          value={value}
          onChange={setValue}
          className="blogEditor"
        />
      </Form.Group>
      <Button className="my-5" variant="secondary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CreateBlog;
