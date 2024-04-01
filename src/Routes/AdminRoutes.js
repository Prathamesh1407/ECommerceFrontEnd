import { React, useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Pages/Spinner";

const AdminRoutes = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/admin-auth`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      res.data.ok ? setOk(true) : setOk(false);
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoutes;
