import React from "react";
import "./Sidebar.css";

import GridViewIcon from "@mui/icons-material/GridView";
import BusinessIcon from "@mui/icons-material/Business";

const Sidebar = () => {
  return (
    <div className="site-sidebar">
      <div className="hrm-logo">
        <span className="dark-color">HRM</span>
        SYSTEM
      </div>
      <ul className="sidebar_items-wrapper">
        <li className="sidebar-item">
          <GridViewIcon />
          Dashboard
        </li>
        <li className="sidebar-item">
          <BusinessIcon />
          Company
        </li>
        <li className="sidebar-item">Trainings</li>
        <li className="sidebar-item">People</li>
        <li className="sidebar-item">Documents</li>
        <li className="sidebar-item">Calendar</li>
        <li className="sidebar-item">Users</li>
      </ul>
    </div>
  );
};

export default Sidebar;
