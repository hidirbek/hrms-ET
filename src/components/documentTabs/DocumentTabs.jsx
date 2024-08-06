import * as React from "react";
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

export default function DocumentTabs() {
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
              <button className="add-btn">{t("add-btn")}</button>
            ) : null}
          </div>
          <div className="filter_search-wrp">
            <div className="filter-wrapper">
              {t("filter-btn")}
              <FilterAltIcon className="filter_icon" />
            </div>
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
                  <DeleteOutlineIcon className="doc_del-icon" />
                </div>
              </div>
            </TabPanel>
          );
        })}
      </div>
    </Tabs>
  );
}
