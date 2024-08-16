import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import DateTimePicker from "react-datetime-picker";
import "./TrainingModal.css";
import "react-datetime-picker/dist/DateTimePicker.css";

import apiRequest from "../../service/request";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const TrainingEditModal = ({
  id,
  tr_title,
  department,
  division,
  floor,
  time,
  refetchData,
}) => {
  const [formData, setFormData] = useState({
    tr_title: tr_title,
    department: department,
    division: division,
    floor: floor,
    time: time,
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(time);
  // console.log(time);

  useEffect(() => {
    setFormData({
      tr_title: tr_title,
      department: department,
      division: division,
      floor: floor,
      time: new Date(value).toISOString(),
    });
  }, [tr_title, department, division, floor, time, value]);
  // console.log(time, "time");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(new Date(value).toISOString());

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // console.log(formData);
  const handleSubmit = async () => {
    const updatedFormData = {
      ...formData,
      time: new Date(value).toISOString(), // Update time directly from state
    };
    console.log(updatedFormData);

    const response = await apiRequest.put(
      `/trainings/edit/${id}`,
      updatedFormData
    );
    alert(response.message);

    handleClose();
    refetchData();
  };

  // console.log(value, "val");

  return (
    <div>
      <Button className="edit_btn" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="site_modal">
            <h1 className="modal_title">Edit Training</h1>
            <form className="tr_modal-form">
              <div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Training Title</span>
                  <input
                    className="modal_input"
                    name="tr_title"
                    type="text"
                    value={formData.tr_title}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Department</span>
                  {/* <input
                    className="modal_input"
                    name="department"
                    type="text"
                    value={formData.department}
                    onChange={handleChange}
                  /> */}
                  <select className="modal_input" name="department" id="">
                    <option value={formData.division}>
                      {formData.department}
                    </option>
                  </select>
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Division</span>
                  {/* <input
                    className="modal_input"
                    name="division"
                    type="text"
                    value={formData.division}
                    onChange={handleChange}
                  /> */}
                  <select className="modal_input" name="division" id="">
                    <option value={formData.division}>
                      {formData.division}
                    </option>
                  </select>
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Select Floor</span>
                  <input
                    className="modal_input"
                    name="floor"
                    type="text"
                    value={formData.floor}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal_inp-wrapper date_time-wrapper">
                <span className="modal_inp-title">Select Date</span>
                <DateTimePicker
                  className="date-time-picker"
                  onChange={setValue}
                  value={value}
                  disableClock={true}
                  minDate={new Date(2024, 0, 1)}
                  // maxDate={new Date(2024, 11, 31)}
                  locale="uz"
                />
              </div>
            </form>
            <button className="modal_save-btn" onClick={handleSubmit}>
              Save
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export const AddTrainingModal = ({ refetchData }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const updatedFormData = {
      ...formData,
      time: new Date(value).toISOString(),
    };
    // console.log(formData, "Data");
    const response = await apiRequest.post(
      `/trainings/create`,
      updatedFormData
    );
    alert(response.message);

    refetchData();
    handleClose();
  };

  return (
    <div>
      <Button className="add-btn" onClick={handleOpen}>
        {t("add-btn")}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="site_modal">
            <h1 className="modal_title">Add Training</h1>
            <form className="tr_modal-form">
              <div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Training Title</span>
                  <input
                    className="modal_input"
                    name="tr_title"
                    type="text"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Department</span>
                  {/* <input
                    className="modal_input"
                    name="department"
                    type="text"
                    onChange={handleChange}
                    required
                  /> */}
                  <select
                    onChange={handleChange}
                    className="modal_input"
                    name="department"
                    id=""
                  >
                    <option value="New Business dep">New Business dep</option>
                  </select>
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Division</span>
                  {/* <input
                    className="modal_input"
                    name="division"
                    type="text"
                    onChange={handleChange}
                    required
                  /> */}
                  <select
                    onChange={handleChange}
                    className="modal_input"
                    name="division"
                    id=""
                  >
                    <option value="SW development">SW development</option>
                  </select>
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Select Floor</span>
                  <input
                    className="modal_input"
                    name="floor"
                    type="text"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="modal_inp-wrapper">
                <span className="modal_inp-title">Select Date</span>
                <DateTimePicker
                  className="date-time-picker"
                  onChange={setValue}
                  value={value}
                  disableClock={true}
                  minDate={new Date(2024, 0, 1)}
                  // maxDate={new Date(2024, 11, 31)}
                  locale="uz"
                  required
                  // onChange={handleChange}
                />
              </div>
            </form>
            <button className="modal_save-btn" onClick={handleSubmit}>
              Add
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
