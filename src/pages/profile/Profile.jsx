import React from "react";
import { Layout } from "../../components";
import "./Profile.css";
const Profile = () => {
  return (
    <Layout>
      <div className="profile_page-wrapper">
        <h1 className="page_title">Profile</h1>
        <div className="profile_page-content">
          <div className="user_image-wrapper"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
