import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Profile from "./Profile";

const SelfProfile = () => {
  const { user } = useContext(UserContext);

  console.log(user);
  return (
    user && (
      <>
        <Profile user={user} />
      </>
    )
  );
};

export default SelfProfile;
