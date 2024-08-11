import React, { useState } from "react";
import { Layout } from "../../components";
import "./Company.css";
import CompanyDropdown from "../../components/companyDropdown/CompanyDropdown";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Box, Tabs, Tab } from "@mui/material";

const Company = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { t } = useTranslation();
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const role = decoded.role;

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // const response = await apiRequest.post(`/events/create`, formData);
    // alert(response.message);

    // handleClose();
  };

  return (
    <Layout>
      <div className="company_pg">
        <div className="page_title company-title">Company</div>
        <div className="company_content-wrapper">
          <div className="company_content">
            <div className="">
              <CompanyDropdown />

              {/* <CompanyTree /> */}
            </div>
            <div className="company_add-btn">
              {role === "admin" ? (
                <button
                  onClick={handleClickOpen}
                  className="add-btn compadd_btn"
                >
                  {t("add-btn")}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className="card-title">
            Change Company Structure
          </DialogTitle>
          <form onSubmit={handleSubmit} action="">
            <DialogContent>
              <Box>
                <Tabs
                  value={selectedTab}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  <Tab
                    onClick={() => setSelectedTab(0)}
                    label="Add Department"
                  />
                  <Tab onClick={() => setSelectedTab(1)} label="Add Division" />
                  <Tab onClick={() => setSelectedTab(2)} label="Add Team" />
                </Tabs>
                {selectedTab === 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "10px",
                    }}
                  >
                    <input
                      name="dep_name"
                      className="modal_input"
                      placeholder="Add Department"
                      type="text"
                    />
                  </div>
                )}
                {selectedTab === 1 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <select className="modal_input" name="" id="">
                      <option value="">Department</option>
                    </select>
                    <input
                      name="dep_name"
                      className="modal_input"
                      placeholder="Add Department"
                      type="text"
                    />
                  </div>
                )}
                {selectedTab === 2 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <select className="modal_input" name="" id="">
                      <option value="">Department</option>
                    </select>
                    <select className="modal_input" name="" id="">
                      <option value="">Division</option>
                    </select>
                    <input
                      name="dep_name"
                      className="modal_input"
                      placeholder="Add Department"
                      type="text"
                    />
                  </div>
                )}
              </Box>
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
    </Layout>
  );
};

export default Company;
