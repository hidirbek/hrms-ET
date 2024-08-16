import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
// import apiRequest from "../../service/request";
import EditIcon from "@mui/icons-material/Edit";

const CompanyModal = ({ title, head }) => {
  // console.log(title);
  // console.log(head);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState();
  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    // e.stopPropagation();
    setOpen(false);
  };
  const handleChange = (event) => {
    event.stopPropagation();
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // e.stopPropagation();
    console.log(formData);

    // const response = await apiRequest.post(`/events/create`, formData);
    // alert(response.message);

    // getAnnouncements();
    // handleClose();
  };
  return (
    <>
      <EditIcon onClick={handleClickOpen} className="edit_icon" />
      {
        <Dialog
          open={open}
          onClose={handleClose}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DialogTitle className="comp_card-title">
            Edit Company Structure
          </DialogTitle>
          <form onSubmit={handleSubmit} action="">
            <DialogContent>
              <div className="">
                <div className="modal_inp-wrapper">
                  <span>Title</span>
                  <input
                    required
                    name="title"
                    type="text"
                    value={title}
                    onChange={handleChange}
                    className="modal_input"
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span>Head</span>
                  <input
                    className="modal_input"
                    required
                    value={head}
                    name="head"
                    type="text"
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
    </>
  );
};

export default CompanyModal;
