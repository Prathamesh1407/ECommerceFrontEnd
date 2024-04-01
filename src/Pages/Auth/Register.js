import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/register`,
        {
          email,
          phone,
          address,
          name,
          password,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message, {
          duration: 3000,
          position: "top-center",
        });
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(`Something went Wrong`, err.message);
    }
  };
  return (
    <Layout>
      <div className="register">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputText">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="form-control "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Name"
            />
          </div>
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
          <div className="form-group mb-3">
            <label htmlFor="exampleInputNo">Phone No</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="form-control"
              id="exampleInputNo"
              aria-describedby="emailHelp"
              placeholder="Enter Your Contact No."
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInput">What is your Goal?</label>
            <input
              type="password"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              className="form-control"
              id="exampleInputAns"
              aria-describedby="emailHelp"
              placeholder="Forget Password Key"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="exampleInputAddress">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              className="form-control"
              id="exampleInputNo"
              aria-describedby="emailHelp"
              placeholder="Enter Your Address"
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

export default Register;
