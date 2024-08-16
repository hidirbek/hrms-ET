import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import "react-datetime-picker/dist/DateTimePicker.css";
import EditIcon from "@mui/icons-material/Edit";
// import "./EmployeeModal.css";
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

export const EditUserModal = ({
  id,
  fullname,
  tel,
  d_birth,
  gender,
  nation,
  marriage,
  work_tel,
  address,
  city,
  country,
  email,
  job_title,
  department,
  emp_status,
  division,
  username,
  password,
  role,
  refetchData,
}) => {
  const [formData, setFormData] = useState({
    fullname: fullname,
    tel: tel,
    d_birth: d_birth,
    gender: gender,
    nation: nation,
    marriage: marriage,
    work_tel: work_tel,
    address: address,
    city: city,
    country: country,
    job_title: job_title,
    email: email,
    department: department,
    emp_status: emp_status,
    division: division,
    username: username,
    password: password,
    role: role,
  });
  const [open, setOpen] = useState(false);
  // console.log(time);

  useEffect(() => {
    setFormData({
      fullname: fullname,
      tel: tel,
      d_birth: d_birth,
      gender: gender,
      nation: nation,
      marriage: marriage,
      work_tel: work_tel,
      address: address,
      city: city,
      country: country,
      email: email,
      job_title: job_title,
      department: department,
      emp_status: emp_status,
      division: division,
      username: username,
      password: password,
      role: role,
    });
  }, [
    fullname,
    tel,
    d_birth,
    gender,
    nation,
    marriage,
    work_tel,
    address,
    city,
    country,
    email,
    job_title,
    department,
    emp_status,
    division,
    username,
    password,
    role,
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const response = await apiRequest.put(`/users/edit/${id}`, formData);
    alert(response.message);

    handleClose();
    refetchData();
  };

  return (
    <div>
      <Button className="edit_icon" onClick={handleOpen}>
        <EditIcon />
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
            <h1 className="modal_title">Edit User</h1>
            <form className="emp_modal-form">
              <div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Fullname</span>
                  <input
                    className="modal_input"
                    name="fullname"
                    type="text"
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Telephone Number</span>
                  <input
                    className="modal_input"
                    name="tel"
                    type="text"
                    value={formData.tel}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Date of Birth</span>
                  <input
                    className="modal_input"
                    name="d_birth"
                    type="text"
                    value={formData.d_birth}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Gender</span>
                  {/* <input
                    className="modal_input"
                    name="gender"
                    type="text"
                    value={formData.gender}
                    onChange={handleChange}
                  /> */}
                  <select
                    onChange={handleChange}
                    className="modal_input"
                    name="gender"
                    id=""
                  >
                    <option value={formData.gender}>{formData.gender}</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Nationality</span>
                  <input
                    className="modal_input"
                    name="nation"
                    type="text"
                    value={formData.nation}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Marital Status</span>
                  {/* <input
                    className="modal_input"
                    name="marriage"
                    type="text"
                    value={formData.marriage}
                    onChange={handleChange}
                  /> */}
                  <select
                    onChange={handleChange}
                    className="modal_input"
                    name="marriage"
                    id=""
                  >
                    <option value={formData.marriage}>
                      {formData.marriage}
                    </option>
                    <option value="married">Married</option>
                    <option value="not married">Not Married</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Work Phone</span>
                  <input
                    className="modal_input"
                    name="work_tel"
                    type="text"
                    value={formData.work_tel}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Employment Status</span>
                  <input
                    className="modal_input"
                    name="emp_status"
                    type="text"
                    value={formData.emp_status}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Address</span>
                  <input
                    className="modal_input"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">City</span>
                  <input
                    className="modal_input"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Country</span>
                  <input
                    className="modal_input"
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Email</span>
                  <input
                    className="modal_input"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Job Title</span>
                  <input
                    className="modal_input"
                    name="job_title"
                    type="text"
                    value={formData.job_title}
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
                    <option value={formData.department}>
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
                  <span className="modal_inp-title">Username</span>
                  <input
                    className="modal_input"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">User role</span>
                  <input
                    className="modal_input"
                    name="role"
                    type="text"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal_inp-wrapper">
                  <span className="modal_inp-title">Password</span>
                  <input
                    className="modal_input"
                    name="password"
                    type="text"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
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

export const AddUserModal = ({ refetchData }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log({ name, value });

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData, "data");

    const response = await apiRequest.post(`/users/create`, formData);
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
            <h1 className="modal_title">Add User</h1>
            <form onSubmit={handleSubmit}>
              <div className="emp_modal-form">
                <div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">Fullname</span>
                    <input
                      required
                      className="modal_input"
                      name="fullname"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">Telephone Number</span>
                    <input
                      className="modal_input"
                      name="tel"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">Date of Birth</span>
                    <input
                      className="modal_input"
                      name="d_birth"
                      type="date"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">Gender</span>
                    {/* <input
                      className="modal_input"
                      name="gender"
                      type="text"
                      onChange={handleChange}
                      required
                    /> */}
                    <select
                      onChange={handleChange}
                      className="modal_input"
                      name="gender"
                      id=""
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">Nationality</span>
                    <input
                      className="modal_input"
                      name="nation"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">Marital Status</span>
                    {/* <input
                      className="modal_input"
                      name="marriage"
                      type="text"
                      onChange={handleChange}
                      required
                    /> */}
                    <select
                      onChange={handleChange}
                      className="modal_input"
                      name="marriage"
                      id=""
                    >
                      <option value="married">Married</option>
                      <option value="not married">Not married</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">Work Phone</span>
                    <input
                      className="modal_input"
                      name="work_tel"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">Employment Status</span>
                    <input
                      className="modal_input"
                      name="emp_status"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">Address</span>
                    <input
                      className="modal_input"
                      name="address"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">City</span>
                    <input
                      className="modal_input"
                      name="city"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">Country</span>
                    <input
                      className="modal_input"
                      name="country"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">Email</span>
                    <input
                      className="modal_input"
                      name="email"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">Job Title</span>
                    <input
                      className="modal_input"
                      name="job_title"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">Department</span>
                    <select
                      onChange={handleChange}
                      className="modal_input"
                      name="department"
                      id=""
                    >
                      <option value="Not Selected">Not Selected</option>
                      <option value="New Business dep">New Business dep</option>
                    </select>
                  </div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">Division</span>
                    <select
                      onChange={handleChange}
                      className="modal_input"
                      name="division"
                      id=""
                    >
                      <option value="Not Selected">Not Selected</option>
                      <option value="SW development">SW development</option>
                    </select>
                  </div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">Username</span>
                    <input
                      className="modal_input"
                      name="username"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">User role</span>
                    <input
                      className="modal_input"
                      name="role"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="modal_inp-wrapper">
                    <span className="modal_inp-title">Password</span>
                    <input
                      className="modal_input"
                      name="password"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <button className="modal_save-btn" type="submit">
                Add
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
