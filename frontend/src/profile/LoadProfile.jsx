import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profile from "./Profile";
import axios from "axios";

const LoadProfile = () => {
  const [user, setUser] = useState();
  const { id } = useParams();
  useEffect(() => {
    fetchProfileById();
  }, []);

  const fetchProfileById = async () => {
    try {
      if (id) {
        const { data } = await axios.get(`/user/getuser/${id}`);
        if (data.success) {
          console.log("id found");
          setUser(data.user);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);
  return (
    user && (
      <div className='min-h-screen min-w-2/3'>
        <Profile user={user} profileParamsId={id} />
      </div>
    )
  );
};

export default LoadProfile;
