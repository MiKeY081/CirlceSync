import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profile from "./Profile";
import axios from "axios";
import { HashLoader } from "react-spinners";

const LoadProfile = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    fetchProfileById();
  }, []);

  const fetchProfileById = async () => {
    try {
      if (id) {
        const { data } = await axios.get(`/user/getuser/${id}`);
        if (data.success) {
          setIsLoading(false);
          setUser(data.user);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return !isLoading ? (
    <div className='min-h-screen min-w-2/3'>
      <Profile owner={user} profileParamsId={id} />
    </div>
  ) : (
    <div className='min-w-screen min-h-screen flex justify-center items-center'>
      <HashLoader color='#999' />
    </div>
  );
};

export default LoadProfile;
