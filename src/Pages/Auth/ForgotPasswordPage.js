import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/forgot-password`
      );
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message, {
          duration: 4000,
          position: "top-center",
        });
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <Layout>
      <div className="register">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputEmail">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Email"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputNewPassword">Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your New Password"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputSecret">
              What is your Goal ?(Secret Key)
            </label>
            <input
              type="password"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Forgot Password Key"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
