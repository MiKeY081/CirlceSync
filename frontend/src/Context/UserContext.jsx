import React, { useState } from "react";
import { createContext, useEffect } from "react";

import { handleUserProfile } from "../Api/ApiReqest";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const fetechUserProfile = async () => {
      const data = await handleUserProfile();
      if (data.success) {
        setUser(data.user);
      } else {
        console.log(data.message);
      }
    };
    fetechUserProfile();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
