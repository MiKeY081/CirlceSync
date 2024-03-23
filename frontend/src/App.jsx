import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Home";
import Posts from "./posts/Posts";
import Post from "./posts/Post";
import EditPost from "./posts/EditPost";
import EditProfile from "./profile/EditProfile";
import Login from "./login/Login";
import Register from "./login/Register";
import NotFound from "./NotFound";
import PostForm from "./posts/PostForm";
import LoadProfile from "./profile/LoadProfile";
import SelfProfile from "./profile/SelfProfile";
import { UserContext } from "./Context/UserContext";

const App = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Posts />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/post/:postId' element={<Post />} />
          {user ? (
            <>
              <Route path='/post/create' element={<PostForm />} />
              <Route path='/post/edit/:id' element={<EditPost />} />
              <Route path='/profile' element={<SelfProfile />} />
              <Route path='/profile/edit' element={<EditProfile />} />
            </>
          ) : (
            <Route path='/user/login' element={<Login />} />
          )}
          <Route path='/profile/:id' element={<LoadProfile />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
