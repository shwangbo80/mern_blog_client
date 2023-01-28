// import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import NavbarComponent from "./components/Navbar";
import About from "./pages/about/About";
import CreateBlog from "./pages/createBlog/CreateBlog";
import FooterComponent from "./components/FooterComponent";
import {useSelector} from "react-redux";
import Dashboard from "./pages/dashboard.jsx/Dashboard";
import PostList from "./pages/postList/PostList";
import BlogDetail from "./pages/blogDetail/BlogDetail";
import EditBlog from "./pages/editBlog/EditBlog";
import DashboardBlogDetail from "./pages/dashboardBlogDetail/DashboardBlogDetail";

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="*" element={<Login />} />
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="blogdetail/:id" element={<BlogDetail />} />
        <Route path="dashboard" element={!user ? <Login /> : <Dashboard />}>
          <Route index element={<PostList />} />
          <Route path="blogdetail/:id" element={<DashboardBlogDetail />} />
          <Route path="add" element={<CreateBlog />} />
          <Route path="edit/:id" element={<EditBlog />} />
        </Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
};

export default App;
