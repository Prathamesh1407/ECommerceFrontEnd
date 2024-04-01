import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import SingleCardComponent from "../components/SingleCardComponent";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const [auth] = useAuth();
  const [total, setTotal] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [categories, setCategories] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(false);

  //Pagination Logic
  const lastPageIndex = currPage * postsPerPage;
  const startPageIndex = lastPageIndex - postsPerPage;
  const currProducts = products.slice(startPageIndex, lastPageIndex);
  
  const getAllCategories = async () => {
    try {
      await makeAuthenticatedGETRequest(
        "/api/v1/category/get-categories",
        auth?.token
      )
        .then((response) => {
          if (response?.success) {
            setCategories(response?.allCategories);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      toast.error("Error while getting the Categories ");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, [currPage]);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/get-products`
      );
      setLoading(false);
      if (data?.success) {
        setProducts(data?.allProductDetails);
        setTotal(data?.totalCount);
      }
    } catch (err) {
      console.log("Error While Getting the Products", err);
      toast.error("Error While Getting the Products");
    }
  };

  useEffect(() => {
    if (!checked.length && !radio.length) {
      setCurrPage(1);
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      setCurrPage(1);
      filterProduct();
    }
  }, [checked, radio]);

  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((item) => item !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/filter-products`,
        { checked, radio }
      );

      if (data?.success) {
        setProducts(data?.products);
        setTotal(data?.products?.length);
      } else {
        toast.error("Error while Filtering the Products");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const getTotal = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-count`
  //     );
  //     if (data?.success) {
  //       setTotal(data.total);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Error while Fetching Products");
  //   }
  // };
  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-3">
          <h5 className="text-center">Filter By Categories</h5>
          <div className="d-flex flex-column mx-3 fw-bold">
            {categories?.map((item) => {
              return (
                <Checkbox
                  key={item._id}
                  className="my-2"
                  onChange={(e) => {
                    handleFilter(e.target.checked, item._id);
                  }}
                >
                  {item.name}
                </Checkbox>
              );
            })}
          </div>
          <h5 className="text-center mt-2">Filter By Prices</h5>
          <div className="d-flex flex-column mx-3 fw-bold">
            <Radio.Group
              onChange={(e) => {
                setRadio(e.target.value);
              }}
            >
              {Prices?.map((item) => {
                return (
                  <Radio key={item._id} value={item.array} className="m-2">
                    {item.name}
                  </Radio>
                );
              })}
            </Radio.Group>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {currProducts?.map((item) => {
              return (
                <SingleCardComponent cart={true} info={item} key={item._id} />
              );
            })}
          </div>
          <div className="d-flex justify-content-center ">
            {
              <Pagination
                totalPosts={total}
                perPagePosts={3}
                setPage={setCurrPage}
              ></Pagination>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

// <div className="m-2 p-3">
//   {products && products.length < total && (
//     <button
//       className="btn btn-warning"
//       onClick={(e) => {
//         e.preventDefault();
//         setPage(currPage + 1);
//       }}
//     >
//       {loading ? "Loading..." : "Loadmore"}
//     </button>
//   )}
// </div>
