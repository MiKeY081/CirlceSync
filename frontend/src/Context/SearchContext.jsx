import React, { createContext, useEffect, useState } from "react";
import { handleFetchAllProfiles } from "../Api/ApiReqest";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [search, setSearch] = useState();
  useEffect(() => {
    handleFetchAllProfiles(setUser);
  }, []);
  return (
    <SearchContext.Provider value={{ user, setUser, search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
