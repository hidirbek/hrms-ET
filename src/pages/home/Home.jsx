import React from "react";

const Home = () => {
  if (localStorage.getItem("token")) {
    window.location = "/v1/dashboard";
  } else {
    window.location = "/v1/login";
  }
  return <></>;
};

export default Home;
