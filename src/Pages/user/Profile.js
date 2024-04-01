import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        },
        {
          headers: { Authorization: auth?.token },
        }
      );
      if (!data?.success) {
        toast.error("Error While Updating the Profile");
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
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
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
