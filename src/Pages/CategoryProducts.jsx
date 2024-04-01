import { React, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import SingleCardComponent from "../components/SingleCardComponent";
import Pagination from "../components/Pagination";

const CategoryProducts = () => {
  const params = useParams();

  const [currPage, setCurrPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const lastPageIndex = currPage * postsPerPage;
  const startPageIndex = lastPageIndex - postsPerPage;
  const currProducts = products.slice(startPageIndex, lastPageIndex);

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/api/v1/product/product-category/${params.slug.toString()}`
      );
      if (data?.success) {
        setProducts(data?.products);
        setCategory(data?.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error while getting the Products by Category");
    }
  };
  useEffect(() => {
    if (params?.slug) {
      getProductsByCategory();
    }
  }, [params?.slug]);
  return (
    <Layout>
      <div className="container mt-3">
        <h3 className="text-center">Category - {category?.name}</h3>
        <h4 className="text-center mt-4">{products.length} Results Found</h4>
        <div className="d-flex flex-wrap col-md-9">
          {currProducts?.map((item) => {
            return <SingleCardComponent info={item} cart={true} />;
          })}
        </div>
        <Pagination totalPosts={products.length} perPagePosts={postsPerPage} setPage={setCurrPage}/>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
