import React, { useState } from "react";
import { Tabs } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";
import { TabPanel } from "@mui/base/TabPanel";
import { Tab } from "@mui/base/Tab";
import "./DocumentTabs.css";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { v4 as uuidv4 } from "uuid";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
// import apiRequest from "../../service/request";

export default function DocumentTabs() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState();
  const [fileStatus, setFileStatus] = useState("No file chosen");
  const [file, setFile] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const openFilter = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClickFilter = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

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
    const data = { ...formData, file };

    // const response = await apiRequest.post(`/events/create`, formData);
    // alert(response.message);

    // handleClose();
  };

  const doc_categories = [
    {
      ctg_id: 1,
      title: "Company Documents (Positions)",
    },
    {
      ctg_id: 2,
      title: "Report Samples",
    },
    {
      ctg_id: 3,
      title: "Statement Samples",
    },
    {
      ctg_id: 4,
      title: "Job Descriptions",
    },
  ];
  const docs = [
    {
      id: 1,
      doc_title: "Lorem ipsum comp docs",
      ctg_id: 1,
    },
    {
      id: 2,
      doc_title: "Lorem ipsum comp docs",
      ctg_id: 1,
    },
    {
      id: 2,
      doc_title: "Lorem ipsum Report",
      ctg_id: 2,
    },
    {
      id: 3,
      doc_title: "Lorem ipsum 3 ",
      ctg_id: 3,
    },
    {
      id: 4,
      doc_title: "Lorem ipsum 4",
      ctg_id: 4,
    },
  ];
  const { t } = useTranslation();
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const role = decoded.role;

  const searchTraining = (e) => {
    e.preventDefault();
  };

  return (
    <Tabs defaultValue={1}>
      <TabsList>
        {doc_categories.map((ctg) => {
          return (
            <Tab key={ctg.ctg_id} value={ctg.ctg_id}>
              {ctg.title}
            </Tab>
          );
        })}
      </TabsList>
      <div className="docs_tabs-wrapper">
        <div className="search-add-wrapper">
          <div>
            {role === "admin" ? (
              <button onClick={handleClickOpen} className="add-btn">
                {t("add-btn")}
              </button>
            ) : null}
          </div>
          <div className="filter_search-wrp">
            <button
              aria-describedby={id}
              type="button"
              onClick={handleClickFilter}
              className="filter-wrapper"
            >
              {t("filter-btn")}
              <FilterAltIcon className="filter_icon" />
            </button>
            <Popper
              className="filter_poper"
              id={id}
              open={openFilter}
              anchorEl={anchorEl}
            >
              <button className="filter_btns">Department1</button>
              <button className="filter_btns">Department2</button>
              <button className="filter_btns">Department3</button>
              <button className="filter_btns">Department4</button>
            </Popper>
            <form onSubmit={searchTraining} className="search-form">
              <input
                className="search-input"
                type="text"
                placeholder="Search"
              />
              <button type="submit" className="search-btn">
                Search
              </button>
            </form>
          </div>
        </div>
        {docs.map((d) => {
          return (
            <TabPanel key={uuidv4()} value={d.ctg_id}>
              <div className="doc_tab-wrapper">
                <div className="doc_info">
                  <p className="doc_nums">{d.id}</p>
                  <p className="doc-title">{d.doc_title}</p>
                </div>
                <div className="doc_actions">
                  <SimCardDownloadIcon className="doc_download-icon" />
                  {role === "admin" && "hr" ? (
                    <DeleteOutlineIcon className="doc_del-icon" />
                  ) : null}
                </div>
              </div>
            </TabPanel>
          );
        })}
      </div>

      {
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className="card-title">Add Document</DialogTitle>
          <form onSubmit={handleSubmit} action="">
            <DialogContent>
              <div className="">
                <div className="docs_inp-wrapper">
                  <div>
                    <div className="modal_inp-wrapper">
                      <span>Document Title</span>
                      <input
                        required
                        name="title"
                        type="text"
                        onChange={handleChange}
                        className="modal_input"
                      />
                    </div>
                    <div className="modal_inp-wrapper">
                      <span>Document Division</span>
                      <input
                        className="modal_input"
                        required
                        name="doc_div"
                        type="text"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="modal_inp-wrapper">
                      <span>Department</span>
                      <input
                        className="modal_input"
                        name="department"
                        required
                        type="text"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="modal_inp-wrapper">
                      <span>Division</span>
                      <input
                        className="modal_input"
                        name="division"
                        required
                        type="text"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal_inp-wrapper file_picker-div">
                  <input
                    name="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setFileStatus(e.target.files[0].name);
                    }}
                    type="file"
                    id="file"
                    className="file-input"
                  />

                  <label htmlFor="file" className="file-label">
                    Choose a file
                  </label>

                  <span className="file-name">{fileStatus}</span>
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
    </Tabs>
  );
}
