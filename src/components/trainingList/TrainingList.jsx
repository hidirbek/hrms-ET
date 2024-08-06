import React from "react";
import "./TrainingList.css";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";

const TrainingList = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const role = decoded.role;

  const searchTraining = (e) => {
    e.preventDefault();
  };

  const trainingData = [
    {
      id: 1,
      title: "Training title",
      department: "Technical Department",
      division: "Marketing Division",
      floor: "10th",
      time: "16.06.2024 15:00",
    },
    {
      id: 2,
      title: "Training title",
      department: "Technical Department",
      division: "Marketing Division",
      floor: "10th",
      time: "16.06.2024 15:00",
    },
  ];
  return (
    <div className="training_list-wrapper">
      <div className="search-add-wrapper">
        <div>
          {role === "admin" ? (
            <button className="add-btn">{t("add-btn")}</button>
          ) : null}
        </div>
        <form onSubmit={searchTraining} className="search-form">
          <input className="search-input" type="text" placeholder="Search" />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div>
      <div className="training_list training_list-header">
        <div className="">№</div>
        <div className="">Training Title</div>
        <div className="">Department</div>
        <div className="">Floor</div>
        <div className="">Time</div>
        <div className="">Actions</div>
      </div>
      {trainingData.map((train) => {
        return (
          <div key={uuidv4()} className="training_list">
            <div className="training_id">{train.id}</div>
            <div className="training_title">{train.title}</div>
            <div className="training_dep">
              <span>{train.department}</span>
              <span>{train.division}</span>
            </div>
            <div className="tr_floor">{train.floor}</div>
            <div className="tr_time">{train.time}</div>
            <div className="tr_actions">
              <button className="edit_btn">Edit</button>
              <button className="del_btn">Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrainingList;
