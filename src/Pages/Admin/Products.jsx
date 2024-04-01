import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import SingleCardComponent from "../../components/SingleCardComponent";

const Products = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/get-products`
      );
      if (data?.success) {
        setProducts(data.allProductDetails);
      }
    } catch (err) {
      console.log("Error While Getting the Products", err);
      toast.error("Error While Getting the Products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex row-cols-3 flex-wrap">
              {products?.map((item) => {
                return <SingleCardComponent info={item} key={item._id} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;

{
  /* <div className="card-body">
      <h5 className="card-title">Product Name</h5>
      <p className="card-text">
        This is a description of the product. It should be short and
        to the point, highlighting the main features and benefits of
        the product.
      </p>
      <div className="d-flex justify-content-between align-items-center">
        <div className="price">
          <span className="price-regular">$99.99</span>
          <span className="price-sale">$79.99</span>
        </div>
        <button type="button" className="btn btn-primary">
          Add to Cart
        </button>
      </div>
    </div>
  </div> */
}
