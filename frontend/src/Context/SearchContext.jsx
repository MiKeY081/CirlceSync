import React, { createContext, useEffect, useState } from "react";
import { handleFetchAllProfiles } from "../Api/ApiReqest";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    handleFetchAllProfiles(setUser);
  }, []);
  console.log(user);
  return (
    <SearchContext.Provider value={{ user, setUser }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
