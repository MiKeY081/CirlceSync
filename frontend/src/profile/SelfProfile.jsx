import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Profile from "./Profile";

const SelfProfile = () => {
  const { user } = useContext(UserContext);

  console.log(user);
  return (
    user && (
      <div className='min-h-screen min-w-2/3'>
        <Profile owner={user} />
      </div>
    )
  );
};

export default SelfProfile;
