import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import UserContextProvider from "./Context/UserContext.jsx";
import SearchContextProvider from "./Context/SearchContext.jsx";
axios.defaults.baseURL = "https://sync-in-circle-backend.vercel.app/api/v1";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <SearchContextProvider>
        <BrowserRouter>
          <ToastContainer />
          <App />
        </BrowserRouter>
      </SearchContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
