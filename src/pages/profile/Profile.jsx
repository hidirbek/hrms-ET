import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import "./Profile.css";
import apiRequest from "../../service/request";
import { jwtDecode } from "jwt-decode";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import dayjs from "dayjs";

const Profile = () => {
  // users/get_user/${userId}

  const [userInfo, setUserInfo] = useState("");
  // console.log(userInfo);

  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  const getInfo = async () => {
    try {
      const response = await apiRequest.get(`users/get_user/${userId}`);
      setUserInfo(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <Layout>
      <div className="profile_page-wrapper">
        <h1 className="page_title">Profile</h1>
        <div className="profile_page-content">
          <div className="profile_header-info">
            <div className="user_image-wrapper"></div>
            <div>
              <h2 className="profile_fn">{userInfo.fullname}</h2>
              <p className="profile_info">
                <LocalPhoneIcon className="profile_icon" />
                <span className="profile_info_headers">Tel:</span>
                {userInfo.tel}
              </p>
              <p className="profile_info">
                <MailOutlineIcon className="profile_icon" />
                <span className="profile_info_headers">Email:</span>
                {userInfo.email}
              </p>
              <p className="profile_info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="22"
                  viewBox="0 0 26 22"
                  fill="none"
                >
                  <g clipPath="url(#clip0_369_1341)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 19.474H3.11458V0.305529C3.11458 0.138169 3.26481 0 3.44678 0H13.9966C14.1785 0 14.3288 0.138169 14.3288 0.305529V7.49226H23.6641C23.846 7.49226 23.9963 7.63043 23.9963 7.79779V19.4721H26V22H0V19.474ZM5.7806 2.88403H7.9388C8.00439 2.88403 8.05941 2.93463 8.05941 2.99496V5.40027C8.05941 5.46059 8.00439 5.51119 7.9388 5.51119H5.7806C5.71501 5.51119 5.65999 5.46059 5.65999 5.40027V2.99496C5.65999 2.93463 5.71501 2.88403 5.7806 2.88403ZM9.43685 14.8483H11.5951C11.6606 14.8483 11.7157 14.8989 11.7157 14.9592V17.3645C11.7157 17.4249 11.6606 17.4755 11.5951 17.4755H9.43685C9.37126 17.4755 9.31624 17.4249 9.31624 17.3645V14.9592C9.31624 14.8969 9.37126 14.8483 9.43685 14.8483ZM5.7806 14.8483H7.9388C8.00439 14.8483 8.05941 14.8989 8.05941 14.9592V17.3645C8.05941 17.4249 8.00439 17.4755 7.9388 17.4755H5.7806C5.71501 17.4755 5.65999 17.4249 5.65999 17.3645V14.9592C5.65999 14.8969 5.71501 14.8483 5.7806 14.8483ZM9.43685 10.8589H11.5951C11.6606 10.8589 11.7157 10.9095 11.7157 10.9698V13.3751C11.7157 13.4355 11.6606 13.4861 11.5951 13.4861H9.43685C9.37126 13.4861 9.31624 13.4355 9.31624 13.3751V10.9718C9.31624 10.9095 9.37126 10.8589 9.43685 10.8589ZM5.7806 10.8589H7.9388C8.00439 10.8589 8.05941 10.9095 8.05941 10.9698V13.3751C8.05941 13.4355 8.00439 13.4861 7.9388 13.4861H5.7806C5.71501 13.4861 5.65999 13.4355 5.65999 13.3751V10.9718C5.65999 10.9095 5.71501 10.8589 5.7806 10.8589ZM9.43685 6.87147H11.5951C11.6606 6.87147 11.7157 6.92207 11.7157 6.9824V9.3877C11.7157 9.44803 11.6606 9.49863 11.5951 9.49863H9.43685C9.37126 9.49863 9.31624 9.44803 9.31624 9.3877V6.9824C9.31624 6.92207 9.37126 6.87147 9.43685 6.87147ZM5.7806 6.87147H7.9388C8.00439 6.87147 8.05941 6.92207 8.05941 6.9824V9.3877C8.05941 9.44803 8.00439 9.49863 7.9388 9.49863H5.7806C5.71501 9.49863 5.65999 9.44803 5.65999 9.3877V6.9824C5.65999 6.92207 5.71501 6.87147 5.7806 6.87147ZM9.43685 2.88403H11.5951C11.6606 2.88403 11.7157 2.93463 11.7157 2.99496V5.40027C11.7157 5.46059 11.6606 5.51119 11.5951 5.51119H9.43685C9.37126 5.51119 9.31624 5.46059 9.31624 5.40027V2.99496C9.31624 2.93463 9.37126 2.88403 9.43685 2.88403ZM4.90251 1.4245H12.5028C12.634 1.4245 12.7419 1.54321 12.7419 1.68722V18.3979C12.7419 18.5419 12.634 18.6606 12.5028 18.6606H4.90251C4.77132 18.6606 4.66341 18.5419 4.66341 18.3979V1.68722C4.66341 1.54321 4.77132 1.4245 4.90251 1.4245ZM15.3634 10.3977H17.5216C17.5872 10.3977 17.6423 10.4483 17.6423 10.5086V12.9139C17.6423 12.9743 17.5872 13.0249 17.5216 13.0249H15.3634C15.2979 13.0249 15.2428 12.9743 15.2428 12.9139V10.5086C15.2428 10.4483 15.2979 10.3977 15.3634 10.3977ZM19.0197 14.8483H21.1779C21.2435 14.8483 21.2985 14.8989 21.2985 14.9592V17.3645C21.2985 17.4249 21.2435 17.4755 21.1779 17.4755H19.0197C18.9541 17.4755 18.8991 17.4249 18.8991 17.3645V14.9592C18.8991 14.8969 18.9541 14.8483 19.0197 14.8483ZM15.3634 14.8483H17.5216C17.5872 14.8483 17.6423 14.8989 17.6423 14.9592V17.3645C17.6423 17.4249 17.5872 17.4755 17.5216 17.4755H15.3634C15.2979 17.4755 15.2428 17.4249 15.2428 17.3645V14.9592C15.2428 14.8969 15.2979 14.8483 15.3634 14.8483ZM19.0197 10.3977H21.1779C21.2435 10.3977 21.2985 10.4483 21.2985 10.5086V12.9139C21.2985 12.9743 21.2435 13.0249 21.1779 13.0249H19.0197C18.9541 13.0249 18.8991 12.9743 18.8991 12.9139V10.5086C18.8991 10.4483 18.9541 10.3977 19.0197 10.3977ZM14.57 8.91676H22.1702C22.3014 8.91676 22.4093 9.03547 22.4093 9.17948V18.3979C22.4093 18.5419 22.3014 18.6606 22.1702 18.6606H14.57C14.4388 18.6606 14.3309 18.5419 14.3309 18.3979V9.17948C14.3309 9.03547 14.4388 8.91676 14.57 8.91676Z"
                      fill="#3A356D"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_369_1341">
                      <rect width="26" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="profile_info_headers">Department:</span>
                {userInfo.department}
                {", "}
                {userInfo.division}
              </p>
            </div>
            <div className="status-wrapper">
              <select className="status_select" name="" id="">
                <option value="">No Status Set</option>
                <option value="">Feeling Sad</option>
                <option value="">Not Feeling Well</option>
                <option value="">Feeling Sleepy</option>
                <option value="">Feeling Motivated</option>
                <option value="">Feeling Exhausted</option>
                <option value="">Feeling Happy</option>
              </select>
              <select className="status_select" name="" id="">
                <option value="">No Status Set</option>
                <option value="">Do not Disturb</option>
                <option value="">Busy</option>
                <option value="">Out For Lunch</option>
                <option value="">Away</option>
                <option value="">Available</option>
                <option value="">In a Meeting</option>
              </select>
            </div>
          </div>

          <div className="pr_user_info-wrapper">
            <div>
              <h4 className="pr_info-title">Personal Information</h4>
              <div className="pr_info-wrap">
                <div>
                  <p className="pr_info">
                    <span className="pr_info-heading">Date of Birth:</span>{" "}
                    {userInfo.d_birth}
                  </p>
                  <p className="pr_info">
                    <span className="pr_info-heading">Marital Status:</span>{" "}
                    {userInfo.marriage}
                  </p>
                </div>
                <div>
                  <p className="pr_info">
                    <span className="pr_info-heading">Gender:</span>
                    {userInfo.gender}{" "}
                  </p>
                  <p className="pr_info">
                    <span className="pr_info-heading">Joined Date:</span>{" "}
                    {dayjs(userInfo.join_date).format("DD.MM.YYYY HH:mm")}
                  </p>
                </div>
                <p className="pr_info">
                  <span className="pr_info-heading">Nationality:</span>{" "}
                  {userInfo.nation}
                </p>
              </div>
            </div>
            <div>
              <h4 className="pr_info-title">Contact Information</h4>
              <div className="pr_info-wrap">
                <div>
                  <p className="pr_info">
                    <span className="pr_info-heading">Address:</span>{" "}
                    {userInfo.address}
                  </p>
                  <p className="pr_info">
                    <span className="pr_info-heading">City:</span>{" "}
                    {userInfo.city}
                  </p>
                </div>
                <div>
                  <p className="pr_info">
                    <span className="pr_info-heading">Country:</span>{" "}
                    {userInfo.country}
                  </p>
                  <p className="pr_info">
                    <span className="pr_info-heading">Work Phone:</span>{" "}
                    {userInfo.work_tel}
                  </p>
                </div>
                <p className="pr_info">
                  <span className="pr_info-heading">Private Email:</span>{" "}
                  {userInfo.email}
                </p>
              </div>
            </div>
            <div>
              <h4 className="pr_info-title">Job Details</h4>
              <div className="pr_info-wrap">
                <p className="pr_info">
                  <span className="pr_info-heading">Job Title:</span>{" "}
                  {userInfo.job_title}
                </p>
                <p className="pr_info">
                  <span className="pr_info-heading">Employment Status:</span>{" "}
                  {userInfo.emp_status}
                </p>
                <p className="pr_info">
                  <span className="pr_info-heading">Department:</span>{" "}
                  {userInfo.department}
                </p>
                <p className="pr_info">
                  <span className="pr_info-heading">Division:</span>{" "}
                  {userInfo.division}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
