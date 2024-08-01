import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import { useTranslation } from "react-i18next";

const Card = ({ title, icon, link, style, subtitle }) => {
  const { t } = useTranslation();

  return (
    <div className={`db_cards-wrapper ${style}`}>
      <div className="card_content">
        <div className="card_title-wrapper">
          <p className="card-title">{title}</p>
          <p className="card-subtitle">{subtitle}</p>
        </div>
        <div className="card_icon-wrapper">{icon}</div>
      </div>
      <Link className="card_link" to={link}>
        {t("card_manage")} {title}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="8"
          viewBox="0 0 11 8"
          fill="none"
        >
          <path
            d="M10.3536 4.35355C10.5488 4.15829 10.5488 3.84171 10.3536 3.64645L7.17157 0.464466C6.97631 0.269204 6.65973 0.269204 6.46447 0.464466C6.2692 0.659728 6.2692 0.976311 6.46447 1.17157L9.29289 4L6.46447 6.82843C6.2692 7.02369 6.2692 7.34027 6.46447 7.53553C6.65973 7.7308 6.97631 7.7308 7.17157 7.53553L10.3536 4.35355ZM0 4.5L10 4.5V3.5L0 3.5L0 4.5Z"
            fill="white"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Card;
