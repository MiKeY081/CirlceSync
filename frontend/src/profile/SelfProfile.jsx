import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { handleUserProfile } from "../Api/ApiReqest";

const SelfProfile = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    handleUserProfile(setUser);
  }, []);
  return (
    user && (
      <div className='min-h-screen min-w-2/3'>
        <Profile owner={user} />
      </div>
    )
  );
};

export default SelfProfile;
