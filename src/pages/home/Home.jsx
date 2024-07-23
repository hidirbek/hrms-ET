import React from "react";
import { Layout } from "../../components";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Layout>
        <Link to="/dashboard">Dashboard</Link>
      </Layout>
    </>
  );
};

export default Home;
