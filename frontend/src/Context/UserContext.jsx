import React, { useState } from "react";
import { createContext, useEffect } from "react";

import { handleUserProfile } from "../Api/ApiReqest";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    handleUserProfile(setUser);
  }, []);
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
