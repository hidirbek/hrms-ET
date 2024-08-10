import React, { useState, useEffect } from "react";
import "./Header.css";

import { NavLink } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useLanguage } from "../../components/languageSelector/LanguageContext";
import { useTranslation } from "react-i18next";
import AuthService from "../../service/AuthService";
import apiRequest from "../../service/request";

const Header = () => {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState("");
  // console.log(userInfo.fullname);

  const [showButtons, setShowButtons] = useState(false);

  const handleClickProfile = () => {
    setShowButtons(!showButtons);
  };

  const logout = () => {
    AuthService.logout();
  };
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("accessToken");
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    try {
      const response = await apiRequest.get(`/users/get_user/${userId}`);
      setUserInfo(response.fullname);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const messages = [
    { title: "msg title" },
    { title: "msg title" },
    { title: "msg title" },
  ];

  const languages = [
    {
      lang: "En",
      value: "en",
    },
    {
      lang: "Uz",
      value: "uz",
    },
    {
      lang: "Ru",
      value: "ru",
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const { language, changeLanguage } = useLanguage();
  // console.log(changeLanguage);
  // const changeLanguage = (lng) => {
  //   // i18n.changeLanguage(lng);
  // };
  return (
    <header className="site-header">
      <div className="site_logo-wrapper">
        <div className="site-logo">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Site Logo"
            className="site-logo"
          />
        </div>
        <div className="logo_name">
          East <span>Telecom</span>
        </div>
      </div>
      <div className="header_nav-wrapper">
        <div className="msg_wrapper">
          <button
            className="ring-icon"
            aria-describedby={id}
            type="button"
            onClick={handleClick}
          >
            <NotificationsIcon className="ring-icon" />
          </button>
          <Popper id={id} open={open} anchorEl={anchorEl}>
            {messages.map((msg) => {
              return (
                <Box
                  key={uuidv4()}
                  sx={{ border: 1, p: 1, bgcolor: "background.paper" }}
                >
                  {msg.title}
                </Box>
              );
            })}
          </Popper>
        </div>
        <div className="lang_wrapper">
          <div className="lang_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M12.5001 23.9583C18.8282 23.9583 23.9584 18.8281 23.9584 12.5C23.9584 6.17183 18.8282 1.04163 12.5001 1.04163M12.5001 23.9583C6.17196 23.9583 1.04175 18.8281 1.04175 12.5C1.04175 6.17183 6.17196 1.04163 12.5001 1.04163M12.5001 23.9583C15.6251 23.9583 16.6667 18.75 16.6667 12.5C16.6667 6.24996 15.6251 1.04163 12.5001 1.04163M12.5001 23.9583C9.37508 23.9583 8.33341 18.75 8.33341 12.5C8.33341 6.24996 9.37508 1.04163 12.5001 1.04163M2.08341 16.6666H22.9167M2.08341 8.33329H22.9167"
                stroke="white"
                strokeWidth="2.08333"
              />
            </svg>
          </div>
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={language}
            // defaultValue="en"
            className="lang-selector"
          >
            {languages.map((lang) => {
              return (
                <option
                  key={uuidv4()}
                  className="lang-options"
                  value={lang.value}
                >
                  {lang.lang}
                </option>
              );
            })}
          </select>
        </div>
        <div className="hd_profile_info" onClick={handleClickProfile}>
          <div className="user-img"></div>
          <div className="user-fn">
            <p className="user-name">{userInfo && userInfo}</p>
          </div>
          {showButtons && (
            <div className="buttons">
              <NavLink to="/v1/profile">{t("hd_profile")}</NavLink>
              <NavLink to="/v1/login" onClick={logout}>
                {t("hd_logout")}
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
