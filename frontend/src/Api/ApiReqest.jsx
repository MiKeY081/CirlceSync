import axios from "axios";
import { toast } from "react-toastify";

const handleRegister = async (name, email, password) => {
  try {
    const { data } = await axios.post("/user/register", {
      name,
      email,
      password,
    });
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleLogin = async (email, password) => {
  try {
    const { data } = await axios.post("/user/login", { email, password });
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleFetchPosts = async (setPosts) => {
  try {
    // setLoading(true);
    const { data } = await axios.get("/post/getposts");
    if (data.success) {
      toast.success;
      setPosts(data.posts);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
  //     finally {
  //     setLoading(false);
  //   }
};
const handleFetchPost = async (id, setPost) => {
  try {
    const { data } = await axios.get(`/post/${id}`);
    if (data.success) {
      toast.success;
      setPost(data.post);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
const handleCreatePost = async (caption, image) => {
  try {
    const { data } = await axios.post("/post/create", { caption, image });
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleEditPost = async (id, caption, image) => {
  try {
    const { data } = await axios.put(`/post/update/${id}`, { caption, image });
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
const handleDeletePost = async (id) => {
  try {
    const { data } = await axios.delete(`/post/delete/${id}`);
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleLike = async (id) => {
  try {
    const { data } = await axios.post(`/post/like/${id}`);
    if (data.success) {
      console.log(data.message);
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleCreateComment = async (postId, comment) => {
  try {
    const { data } = await axios.post(`/comment/create`, { comment, postId });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const editComment = async (id, comment) => {
  try {
    const { data } = await axios.put(`/comment/update/${id}`, {
      comment,
    });
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (id, commentId) => {
  try {
    const { data } = await axios.delete(`/comment/${commentId}`);
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleFetchAllProfiles = async (setUsers) => {
  try {
    const { data } = await axios.get("/user/getUsers");
    if (data.success) {
      setUsers(data.users);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleUserProfile = async () => {
  try {
    const { data } = await axios.get(`/user/getUser`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const handleFetchProfile = async (id, setUser) => {
  try {
    const { data } = await axios.get(`/user/getUser/:${id}`);
    if (data.success) {
      toast.success(data.message);
      setUser(data.user);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleEditProfile = async (name, email, image, phone, address, dob) => {
  try {
    const { data } = await axios.put("/user/profile", {
      name,
      email,
      image,
      phone,
      address,
      dob,
    });
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteProfile = async () => {
  try {
    const { data } = await axios.delete("/user/profile");
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleGetUserById = async (id) => {
  try {
    const { data } = await axios.get("/user/getuser/" + id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const handlelogout = async () => {
  try {
    const { data } = await axios.post("/user/logout");
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    return await data;
  } catch (error) {
    console.log(error);
  }
};

export {
  handleRegister,
  handleLogin,
  handleFetchPosts,
  handleFetchPost,
  handleCreatePost,
  handleEditPost,
  handleDeletePost,
  handleLike,
  handleCreateComment,
  editComment,
  deleteComment,
  handleUserProfile,
  handleFetchProfile,
  handleFetchAllProfiles,
  handleEditProfile,
  handleDeleteProfile,
  handleGetUserById,
  handlelogout,
};
