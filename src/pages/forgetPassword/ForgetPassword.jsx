import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../service/AuthService";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      await AuthService.sendEmailResetCode(email);
      alert("Confirmation code sent to your email.");
      setStep(2);
    } catch (error) {
      alert("Failed to send confirmation code: " + error.response.data.message);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      await AuthService.verifyResetCode(email, code);
      alert("Code verified, you can now reset your password.");
      setStep(3);
    } catch (error) {
      alert("Invalid confirmation code: " + error.response.data.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newConfirmPassword !== newPassword) {
      alert("Please Confirm Your Password!!!");
    } else {
      try {
        await AuthService.resetPassword(email, newPassword);
        alert("Password changed successfully!");
        navigate("/v1/login");
      } catch (error) {
        alert("Failed to reset password: " + error.response.data.message);
      }
    }
  };

  return (
    <div className="forget-password-main login-main">
      <div className="logo-wrapper">
        <div className="logo">
          <svg
            viewBox="0 0 102 85"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7402 43.51H46.5802V44.36C46.6041 46.1822 46.2641 47.9908 45.5802 49.68C44.8731 51.3533 43.8358 52.8668 42.5303 54.13C41.2562 55.4191 39.7351 56.4377 38.0581 57.125C36.381 57.8124 34.5825 58.1542 32.7702 58.13H16.6502C17.0271 59.0569 17.4821 59.9501 18.0102 60.8C18.7791 62.0204 19.674 63.1566 20.6802 64.19C22.3639 65.9649 24.3873 67.3831 26.6302 68.36C28.8729 69.293 31.2813 69.7624 33.7102 69.74H39.9802C41.799 69.7173 43.6039 70.0578 45.2894 70.7415C46.9748 71.4253 48.5069 72.4385 49.7958 73.7218C51.0847 75.0051 52.1046 76.5328 52.7956 78.2153C53.4867 79.8977 53.835 81.7012 53.8202 83.52V84.33H33.7102C29.2967 84.3889 24.9167 83.5566 20.8324 81.883C16.7481 80.2094 13.0434 77.7289 9.94023 74.59C6.73967 71.5526 4.20386 67.8843 2.49296 63.8171C0.782066 59.7498 -0.0666964 55.372 0.000256079 50.96C-0.00759545 48.3425 0.280894 45.7326 0.860241 43.18C1.41986 40.7143 2.2796 38.3265 3.42024 36.07L3.51024 35.9L3.66023 35.79C8.98023 31.79 13.8402 31.84 19.5702 31.86C23.1802 31.86 27.2603 31.53 30.8703 31.51L26.7302 33.36C25.6179 33.8378 24.5587 34.4311 23.5702 35.13C22.5316 35.8682 21.5671 36.7054 20.6902 37.63C19.7078 38.6471 18.8331 39.763 18.0802 40.96C17.5652 41.7793 17.1171 42.6387 16.7402 43.53M55.5003 63.53C53.7979 59.4092 52.9409 54.9884 52.9802 50.53V2.9864e-06H53.7803C55.7137 -0.0218741 57.631 0.353863 59.4131 1.10388C61.1953 1.85391 62.8043 2.96221 64.1402 4.36C65.5175 5.72255 66.6178 7.33898 67.3802 9.12C68.109 10.8998 68.4761 12.8069 68.4603 14.73V50.46C68.4401 52.9581 68.9018 55.4367 69.8202 57.76C70.7611 60.0597 72.1438 62.1525 73.8902 63.92C75.5602 65.7231 77.5922 67.1531 79.8531 68.1165C82.1141 69.0798 84.553 69.5547 87.0102 69.51H87.1503C88.9857 69.4825 90.8082 69.8225 92.5102 70.51C94.2078 71.2213 95.75 72.2574 97.0502 73.56C98.3724 74.8404 99.4197 76.3768 100.128 78.0755C100.836 79.7743 101.191 81.5996 101.17 83.44V84.25H87.1703C82.6957 84.3118 78.2546 83.4695 74.1134 81.7735C69.9722 80.0775 66.2161 77.5627 63.0702 74.38C59.8434 71.2894 57.2693 67.583 55.5003 63.48V63.53Z"
              fill="currentColor"
            ></path>
            <path
              d="M76.9798 32.36H78.1398C86.5298 31.69 88.3098 26.97 88.3098 22.07C88.3098 21.27 88.3098 17.92 88.3098 15.07C85.4598 18.42 79.6498 18.31 79.6498 18.31C62.1398 18.31 50.5398 18.31 33.0198 18.25C28.6487 18.188 24.3107 19.0169 20.2705 20.6863C16.2302 22.3557 12.5723 24.8306 9.51984 27.96C6.88253 30.4525 4.70582 33.3909 3.08984 36.64L3.16983 36.58C8.82983 32.42 13.4398 32.36 19.8398 32.33H76.9398"
              fill="#e31e24"
            ></path>
          </svg>
        </div>
        <div className="logo-name">East Telecom</div>
      </div>
      {step === 1 && (
        <form className="forget-password-form" onSubmit={handleSendCode}>
          <span className="fg_psw-title">
            Enter your email to receive a confirmation code
          </span>
          <input
            className="inp"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="send-code-btn login-btn">
            Send Code
          </button>
        </form>
      )}

      {step === 2 && (
        <form
          className="verify-code-form forget-password-form"
          onSubmit={handleVerifyCode}
        >
          <span className="fg_psw-title">
            Enter the confirmation code sent to your email
          </span>
          <input
            className="inp"
            type="text"
            value={code}
            placeholder="Confirmation Code"
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button type="submit" className="verify-code-btn login-btn">
            Verify Code
          </button>
        </form>
      )}

      {step === 3 && (
        <form
          className="reset-password-form forget-password-form"
          onSubmit={handleChangePassword}
        >
          <span className="fg_psw-title">Enter your new password</span>
          <input
            minLength={8}
            className="inp"
            type="password"
            value={newPassword}
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <span className="fg_psw-title">Confirm your password</span>
          <input
            minLength={8}
            className="inp"
            type="password"
            value={newConfirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="reset-password-btn login-btn">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgetPassword;
