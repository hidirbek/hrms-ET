import React from "react";
import { Layout } from "../../components";
import UsersList from "../../components/usersList/UsersList";
import "./Users.css";

const Users = () => {
  return (
    <Layout>
      <div className="users_page-wrapper">
        <h1 className="page_title">Users</h1>
        <UsersList />
      </div>
    </Layout>
  );
};

export default Users;
