import React, { useEffect, useState } from "react";
import "./UsersList.css";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AddUserModal, EditUserModal } from "../userModal/UserModal";
import apiRequest from "../../service/request";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const UsersList = () => {
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const role = decoded.role;

  const [users, setUsers] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const searchUser = async (e) => {
    e.preventDefault();
    // console.log(e.target.value);

    try {
      // setLoading(true);
      const response = await apiRequest.get("/users/search", {
        headers: { fullname: searchValue },
      });
      // console.log(response, "resp");
      setUsers(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUsers = async () => {
    try {
      // setLoading(true);
      const response = await apiRequest.get("/users/get_all");
      // console.log(response, "resp");
      setUsers(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // setLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    const response = await apiRequest.delete(`/users/delete/${id}`);
    alert(response.message);

    getUsers();
  };

  let currentId = 0;

  function generateId() {
    return ++currentId;
  }

  if (!users) {
    // console.log(departments);
    return <div>Loading...</div>;
  }

  return (
    <div className="user_list-wrapper">
      <div className="search-add-wrapper">
        <div>
          {role === "admin" ? <AddUserModal refetchData={getUsers} /> : null}
        </div>
        <form onSubmit={searchUser} className="search-form">
          <input
            name="user_search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-input"
            type="text"
            placeholder="Search"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div>
      <div className="user_list-content">
        <div className="user_list-headers user_list">
          <div>ID</div>
          <div>Full Name</div>
          <div>Contacts</div>
          <div>Departmnent</div>
          <div>Job Title</div>
          <div>User Level</div>
          <div>Status</div>
          {role === "admin" && "hr" ? <div>Actions</div> : null}
        </div>
        {users.map((u) => {
          return (
            <div key={uuidv4()} className="user_list">
              <div className="user_id">{generateId()}</div>
              <div onClick={() => handleClickOpen(u)} className="user_fullname">
                {u.fullname}
              </div>
              <div>
                <p className="user_email">{u.email}</p>
                <p className="user_tel">{u.tel}</p>
              </div>
              <div>
                <p className="user_dep">{u.department}</p>
                <p className="user_div">{u.division}</p>
              </div>
              <div>{u.job_title}</div>
              <div className="user_level">{u.role}</div>
              <div>
                {u.online === true ? (
                  <div className="online"></div>
                ) : (
                  <div className="offline"></div>
                )}
              </div>

              {role === "admin" && "hr" ? (
                <div className="actions-wrapper">
                  <EditUserModal
                    id={u.id}
                    fullname={u.fullname}
                    tel={u.tel}
                    d_birth={u.d_birth}
                    gender={u.gender}
                    nation={u.nation}
                    marriage={u.marriage}
                    work_tel={u.work_tel}
                    address={u.address}
                    city={u.city}
                    country={u.country}
                    email={u.email}
                    job_title={u.job_title}
                    department={u.department}
                    emp_status={u.emp_status}
                    division={u.division}
                    username={u.username}
                    role={u.role}
                    password={u.password}
                    refetchData={getUsers}
                  />
                  <DeleteOutlineIcon
                    onClick={() => deleteUser(u.id)}
                    className="del_icon"
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {selectedUser && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className="card-title">User Card</DialogTitle>
          <DialogContent>
            <div className="user_card-wrapper">
              <div className="user_img-wrapper">
                <div></div>
              </div>
              <div className="user_card-content">
                <p className="user_card_fn">{selectedUser.fullname}</p>
                <p className="user_card-info">
                  <strong className="user_card-headings">Email:</strong>{" "}
                  {selectedUser.email}
                </p>
                <p className="user_card-info">
                  <strong className="user_card-headings">Phone:</strong>{" "}
                  {selectedUser.tel}
                </p>
                <p className="user_card-info">
                  <strong className="user_card-headings">Department:</strong>{" "}
                  {selectedUser.department}
                </p>
                <p className="user_card-info">
                  <strong className="user_card-headings">Division:</strong>{" "}
                  {selectedUser.division}
                </p>
              </div>
              <div className="user_card-status-wrapper">
                <div className="user_status">{selectedUser.feel_status}</div>
                <div className="user_status">{selectedUser.pr_status}</div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default UsersList;
