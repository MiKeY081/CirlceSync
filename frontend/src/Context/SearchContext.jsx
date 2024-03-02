import React, { createContext, useState } from "react";

// Create the SearchContext
export const SearchContext = createContext();

// Create the SearchContextProvider component
export const SearchContextProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to update the search query
  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, updateSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
