import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

const SingleCardComponent = ({ cart, info }) => {
  info = { ...info, currQuan: 1 };
  const [carts, setCarts] = useCart();
  return (
    <div className="col">
      <div className="card m-2" style={{ width: "18rem", height: "30rem" }}>
        <div className="card-img-top">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${info._id}`}
            className="card-img-top img-fluid"
            style={{ height: "16rem", width: "18rem", objectFit: "cover" }}
            alt={"Product_Photo"}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{info.name.split(" ", 7).join(" ")}...</h5>
          <p className="card-text">
            {info.description.split(" ", 10).join(" ")}...
          </p>
          <p className="card-text">
            <strong>Price:</strong> ₹ {info.price}
          </p>
          {cart ? (
            <>
              <Link
                to={`/product/${info.slug}`}
                className="btn btn-primary ms-3"
              >
                See Details
              </Link>
              <Link
                onClick={(e) => {
                  if (
                    !carts.some((item) => {
                      return item._id === info._id;
                    })
                  ) {
                    setCarts([...carts, info]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...carts, info])
                    );
                    toast.success("Product Added to Cart");
                  } else toast.success("Product Already Exist in Cart");
                }}
                className="btn btn-secondary ms-3"
              >
                Add To Cart
              </Link>
            </>
          ) : (
            <Link
              to={`/dashboard/admin/product/${info.slug}`}
              className="btn btn-primary"
            >
              Update & Delete
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCardComponent;
