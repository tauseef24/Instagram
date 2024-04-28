import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Login from "./pages/login";
import Contact from "./pages/contact";
import NotFound from "./pages/404";
import Layout from "./layout/index";
import Register from "./pages/register";
import ProtectedRoute from "./utils/ProtectedRoute";
import CreatePost from "./pages/createPost";
import Post from "./pages/post";
import AllPosts from "./pages/allposts";
import MyPosts from "./pages/myposts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/users/:uid" element={<AllPosts />} />
            <Route path="/myposts" element={<MyPosts />} />

            <Route exact path="/contact" element={<ProtectedRoute />}>
              <Route index element={<Contact />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
