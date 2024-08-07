import React from "react";
import "./UsersList.css";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const UsersList = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const role = decoded.role;

  const EmployeeData = [
    {
      id: 1,
      fullname: "Name Surname",
      mail: "Khidirbek049@gmail.com",
      tel: "+998901234567",
      department: "Departmnent",
      division: "Division",
      job: "Emloyee",
      role: "user",
      status: true,
    },
    {
      id: 2,
      fullname: "Name Surname",
      mail: "Khidirbek049@gmail.com",
      tel: "+998901234567",
      department: "Departmnent",
      division: "Division",
      job: "Emloyee",
      role: "admin",
      status: false,
    },
  ];

  return (
    <div className="user_list-wrapper">
      <div className="search-add-wrapper">
        <div>
          {role === "admin" ? (
            <button className="add-btn">{t("add-btn")}</button>
          ) : null}
        </div>
        <form className="search-form">
          <input className="search-input" type="text" placeholder="Search" />
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
          <div>Actions</div>
        </div>
        {EmployeeData.map((emp) => {
          return (
            <div key={uuidv4()} className="user_list">
              <div className="user_id">{emp.id}</div>
              <div className="user_fullname">{emp.fullname}</div>
              <div>
                <p className="user_email">{emp.mail}</p>
                <p className="user_tel">{emp.tel}</p>
              </div>
              <div>
                <p className="user_dep">{emp.department}</p>
                <p className="user_div">{emp.division}</p>
              </div>
              <div>{emp.job}</div>
              <div className="user_level">{emp.role}</div>
              <div>
                {emp.status === true ? (
                  <div className="online"></div>
                ) : (
                  <div className="offline"></div>
                )}
              </div>
              <div className="actions-wrapper">
                <EditIcon className="edit_icon" />
                <DeleteOutlineIcon className="del_icon" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersList;
