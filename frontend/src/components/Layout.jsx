import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Outlet className=' min-h-screen' />
      <Footer />
    </>
  );
};

export default Layout;
