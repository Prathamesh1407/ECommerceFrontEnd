import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Policy from "./Pages/Policy";
import ContactUs from "./Pages/ContactUs";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/user/Dashboard";
import PrivateRoutes from "./Routes/PrivateRoutes";
import ForgetPasswordPage from "./Pages/Auth/ForgotPasswordPage";
import AdminRoutes from "./Routes/AdminRoutes";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Users from "./Pages/Admin/Users";
import Profile from "./Pages/user/Profile";
import Orders from "./Pages/user/Orders";
import Products from "./Pages/Admin/Products";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import Search from "./Pages/Search";
import ProductDetails from "./Pages/ProductDetails";
import Categories from "./Pages/Categories";
import CategoryProducts from "./Pages/CategoryProducts";
import CartPage from "./Pages/CartPage";
import AdminOrders from "./Pages/Admin/AdminOrders";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProducts />} />
        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/all-products" element={<Products />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
