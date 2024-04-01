import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message, {
          duration: 4000,
          position: "top-center",
        });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
            <label htmlFor="exampleInputPassword">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <div className="mb-3">
              <Link to="/forgot-password">
                <p>Forgot Password?</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
