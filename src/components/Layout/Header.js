import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/CartContext";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
const Header = () => {
  const [carts, setcarts] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand pl-3" to="/">
          🛒 Market Ease
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {<SearchInput />}
            <li className="nav-item ">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/category">
                Category
              </NavLink>
            </li> */}

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"/categories"}
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/categories"}>
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    SignUp
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link">{auth?.user?.name}</NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link"
                    to="/login"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink className="nav-link fs-large mt-[10]" to="/cart">
                <Badge count={carts.length} offset={[2,-5]}>
                  {/* <ShoppingCartOutlined /> */}
                  <h6>CART</h6>
                </Badge>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;

{
  /* <li className="nav-item">
  <NavLink
  className="nav-link"
  to="/login"
  onClick={handleLogout}
  >
  Logout
  </NavLink>
  </li> */
}

{
  /* <li className="nav-item dropdown">
  <NavLink
    className="nav-link dropdown-toggle"
    id="navbarDropdown"
    role="button"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
  >
    {auth?.user?.name}
  </NavLink>
  <ul
    className="dropdown-menu"
    aria-labelledby="navbarDropdown"
  >
    <li>
      <NavLink className="dropdown-item" to="/dashboard">
        Dashboard
      </NavLink>
    </li>
    <NavLink
      className="nav-link"
      to="/login"
      onClick={handleLogout}
    >
      Logout
    </NavLink>
  </ul>
</li> */
}
