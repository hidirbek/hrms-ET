import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import apiRequest from "../../service/request";

const Announcement = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const role = decoded.role;

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState();

  const [announcements, setAnnouncements] = useState(null);
  // console.log(announcements);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getAnnouncements = async () => {
    const response = await apiRequest.get(`/events/get_all`);
    // console.log(response);
    setAnnouncements(response);
  };
  useEffect(() => {
    getAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const response = await apiRequest.post(`/events/create`, formData);
    alert(response.message);

    getAnnouncements();
    handleClose();
  };

  // console.log(dayjs(eventDate));
  // console.log(eventDate);
  // console.log(new Date("2024-08-22"));

  // console.log(role);
  // const announcements = [
  //   { title: t("db_ann-title"), new: true },
  //   { title: t("db_ann-title"), new: true },
  //   { title: t("db_ann-title"), new: false },
  // ];
  return (
    <div className="dash_announcement">
      <div className="announcement-head">
        <h4>{t("db_announcement")}</h4>
        {role === "admin" ? (
          <button onClick={handleClickOpen} className="add-btn">
            {t("add-btn")}
          </button>
        ) : null}
      </div>

      {announcements &&
        announcements.map((an) => {
          return (
            <div key={uuidv4()}>
              <p className="anc_title">{an.name}</p>
              {an.new === true ? (
                <span className="new_an">{t("db_ann-new")}</span>
              ) : null}
            </div>
          );
        })}

      {
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className="card-title">Add Announcement</DialogTitle>
          <form onSubmit={handleSubmit} action="">
            <DialogContent>
              <div className="">
                <div className="modal_inp-wrapper">
                  <span>Announcement Title</span>
                  <input
                    required
                    name="name"
                    type="text"
                    onChange={handleChange}
                    className="modal_input"
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span>Announcement Description</span>
                  <input
                    className="modal_input"
                    required
                    name="description"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span>Select Start Date</span>
                  <input
                    className="modal_input"
                    name="start"
                    required
                    type="date"
                    onChange={handleChange}
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span>Select End Date</span>
                  <input
                    className="modal_input"
                    name="end"
                    required
                    type="date"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Add
              </Button>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      }
    </div>
  );
};

export default Announcement;
