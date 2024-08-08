import React, { useEffect, useState } from "react";
import "./TrainingList.css";
import { v4 as uuidv4 } from "uuid";
import { jwtDecode } from "jwt-decode";
import apiRequest from "../../service/request";
import { TrainingEditModal } from "../TrainingModal/TrainingModal";
import { AddTrainingModal } from "../TrainingModal/TrainingModal";
import dayjs from "dayjs";

const TrainingList = () => {
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const role = decoded.role;
  const [trainings, setTrainings] = useState(null);
  const [loading, setLoading] = useState(false);
  // console.log(trainings);

  const searchTraining = (e) => {
    e.preventDefault();
  };
  const deleteTraining = async (id) => {
    // console.log(id);

    const response = await apiRequest.delete(`/trainings/delete/${id}`);
    alert(response.message);
    // console.log(response.message);

    getTrainings();
  };
  const getTrainings = async () => {
    try {
      setLoading(true);
      const response = await apiRequest.get("/trainings/get_all");
      // console.log(response);
      setTrainings(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };
  useEffect(() => {
    getTrainings();
  }, []);

  let currentId = 0;

  function generateId() {
    return ++currentId;
  }

  if (loading) {
    // console.log(departments);
    return <div>Loading...</div>;
  }

  return (
    <div className="training_list-wrapper">
      <div className="search-add-wrapper">
        <div>
          {role === "admin" ? (
            <AddTrainingModal refetchData={getTrainings} />
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
      {trainings?.map((train) => {
        const convertedTime = dayjs(train.time).format("DD.MM.YYYY HH:mm");
        return (
          <div key={uuidv4()} className="training_list">
            <div className="training_id">{generateId()}</div>
            <div className="training_title">{train.tr_title}</div>
            <div className="training_dep">
              <span>{train.department}</span>
              <span>{train.division}</span>
            </div>
            <div className="tr_floor">{train.floor}</div>
            <div className="tr_time">{convertedTime}</div>
            <div className="tr_actions">
              <TrainingEditModal
                id={train.id}
                tr_title={train.tr_title}
                department={train.department}
                division={train.division}
                time={train.time}
                floor={train.floor}
                refetchData={getTrainings}
              />
              {/* <button className="edit_btn">Edit</button> */}
              <button
                onClick={() => deleteTraining(train.id)}
                className="del_btn"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrainingList;
