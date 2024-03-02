import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Home";
import Posts from "./posts/Posts";
import Post from "./posts/Post";
import EditPost from "./posts/EditPost";
import Profile from "./profile/Profile";
import EditProfile from "./profile/EditProfile";
import Login from "./login/Login";
import Register from "./login/Register";
import NotFound from "./NotFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/post/:postId' element={<Post />} />
          <Route path='/post/edit:id' element={<EditPost />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/edit' element={<EditProfile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
