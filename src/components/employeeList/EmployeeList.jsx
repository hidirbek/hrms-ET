import React from "react";
import "./EmployeeList.css";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const EmployeeList = () => {
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
    },
    {
      id: 2,
      fullname: "Name Surname",
      mail: "Khidirbek049@gmail.com",
      tel: "+998901234567",
      department: "Departmnent",
      division: "Division",
      job: "Emloyee",
    },
  ];

  return (
    <div className="employee_list-wrapper">
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
      <div className="emp_list-content">
        <div className="emp_list-headers emp_list">
          <div>ID</div>
          <div>Full Name</div>
          <div>Contacts</div>
          <div>Departmnent</div>
          <div>Job Title</div>
          <div>Actions</div>
        </div>
        {EmployeeData.map((emp) => {
          return (
            <div key={uuidv4()} className="emp_list">
              <div className="emp_id">{emp.id}</div>
              <div>{emp.fullname}</div>
              <div>
                <p className="emp_email">{emp.mail}</p>
                <p className="emp_tel">{emp.tel}</p>
              </div>
              <div>
                <p className="emp_dep">{emp.department}</p>
                <p className="emp_div">{emp.division}</p>
              </div>
              <div>{emp.job}</div>
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

export default EmployeeList;
