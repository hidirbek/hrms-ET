import React from "react";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
