import React, { useContext } from "react";
import ProfileForm from "./ProfileForm";
import { UserContext } from "../Context/UserContext";

const EditProfile = () => {
  const { user } = useContext(UserContext);
  return (
    user && (
      <>
        <ProfileForm user={user} />
      </>
    )
  );
};

export default EditProfile;
