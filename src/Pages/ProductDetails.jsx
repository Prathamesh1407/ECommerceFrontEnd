import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

import SmallSingleCard from "../components/SmallSingleCard";
const ProductDetails = () => {
  const params = useParams();
  let [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [amount, setAmount] = useState(1);
  product = { ...product, currQuan: 1 };
  const [carts, setCarts] = useCart();
  const handleAmountChange = (delta) => {
    const newAmount = amount + delta;
    if (newAmount >= 1 && newAmount <= product.quantity) {
      setAmount(newAmount);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/related-product/${pid}/${cid}`
      );
      setSimilarProducts(data?.products);
    } catch (err) {
      console.log(err);
      toast.error("Error While getting the Similar products");
    }
  };

  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/get-product/${params.slug}`
      );
      if (data?.success) {
        setProduct(data?.product);
        getSimilarProduct(data?.product?._id, data?.product?.category?._id);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error While getting the Details");
    }
  };

  useEffect(() => {
    if (params?.slug) getProductDetails();
  }, [params?.slug]);
  return (
    <Layout>
      <div className="product-detail container">
        <div className="product-images col-md-6">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${product?._id}`}
            className="card-img-top img-fluid"
            style={{ height: "25rem", width: "30rem", objectFit: "contain" }}
            alt={product.name}
          />
        </div>
        {/* ABOUT */}
        <div className="product-info">
          <div>
            <span className="product-type">{product?.category?.name}</span>
            <h1 className="product-name">{product?.name}</h1>
          </div>
          <p className="product-description">{product?.description}</p>
          <h6 className="product-price">₹ {product?.price}</h6>
          <h5 className="product-ship">
            Shippable:{" "}
            <span className="span-ship">
              {product?.shipping ? "YES" : "NO"}
            </span>
          </h5>
          <h5 className="product-ship">
            Available Quantity:{" "}
            <span className="span-ship">{product?.quantity}</span>
          </h5>
          <div>
            <Link
              onClick={(e) => {
                if (
                  !carts.some((item) => {
                    return item._id === product._id;
                  })
                ) {
                  setCarts([...carts, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...carts, product])
                  );
                  toast.success("Product Added to Cart");
                } else toast.success("Product Already Exist in Cart");
              }}
              className="btn btn-secondary ms-3"
            >
              Add To Cart
            </Link>
          </div>
          {/* <div className="product-quantity">
            <div className="quantity-control">
              <button
                className="quantity-button"
                onClick={() => handleAmountChange(-1)}
              >
                -
              </button>
              <span className="quantity">{amount}</span>
              <button
                className="quantity-button"
                onClick={() => handleAmountChange(1)}
              >
                +
              </button>
            </div>
          </div> */}
        </div>
        {/* <div className="row">
          <h4>Similar Products</h4>
          {JSON.stringify(similarProducts,null,4)}
        </div> */}
        <div>
          {similarProducts?.map((item) => {
            return <SmallSingleCard info={item} key={item._id} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

{
  /* <div className="row container">
  <div className="col-md-6">
    <img
      src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${product._id}`}
      className="card-img-top img-fluid"
      style={{ height: "16rem", width: "18rem", objectFit: "cover" }}
      alt={product.name}/>
  </div>
  <div className="col-md-6">
    <div className="product-detail">
      <div className="product-image">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${product._id}`}
          className="card-img-top img-fluid"
          style={{ height: "16rem", width: "18rem", objectFit: "cover" }}
          alt={product.name}
        />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="description">{product.description}</p>
        <p>
          <strong>Category:</strong> {category.name}
        </p>
        <p>
          <strong>Quantity:</strong> {product.quantity}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Shipping:</strong> {product.shipping ? "Yes" : "No"}
        </p>
      </div>
    </div>
  </div>
</div>
<div className="row container">Similar Products</div> */
}
