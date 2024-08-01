import React from "react";
import { v4 as uuidv4 } from "uuid";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

const Announcement = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const role = decoded.role;
  // console.log(role);
  const announcements = [
    { title: t("db_ann-title"), new: true },
    { title: t("db_ann-title"), new: true },
    { title: t("db_ann-title"), new: false },
  ];
  const add_announc = (e) => {
    e.preventDefault();
  };
  return (
    <div className="dash_announcement">
      <div className="announcement-head">
        <h4>{t("db_announcement")}</h4>
        {role === "admin" ? (
          <button onClick={add_announc} className="add-btn">
            {t("db_ann-new")}
          </button>
        ) : null}
      </div>
      {announcements.map((an) => {
        return (
          <div key={uuidv4()}>
            <p className="anc_title">{an.title}</p>
            {an.new === true ? (
              <span className="new_an">{t("db_ann-new")}</span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Announcement;
