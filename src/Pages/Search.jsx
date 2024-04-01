import {React} from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/searchContext";
import SingleCardComponent from "../components/SingleCardComponent";
import Pagination from "../components/Pagination";
import { useState } from "react";


const Search = () => {
  const [values, setValues] = useSearch();
  const [currPage, setCurrPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const lastPageIndex = currPage * postsPerPage;
  const startPageIndex = lastPageIndex - postsPerPage;
  const currProducts = values?.results.products.slice(
    startPageIndex,
    lastPageIndex
  );
  return (
    <Layout>
      <div className="container">
        <h1>Search Results</h1>
        <h6>
          {values?.results.products.length < 1
            ? "No Products Found"
            : `Found ${values?.results.products.length}`}
        </h6>
        <div className="d-flex justify-content-center flex-wrap">
          {currProducts.map((item) => {
            return (
              <SingleCardComponent cart={true} info={item} key={item._id} />
            );
          })}
        </div>
        <div className="d-flex justify-content-center">
            {
              <Pagination
                totalPosts={values?.results.products.length}
                perPagePosts={3}
                setPage={setCurrPage}
              ></Pagination>
            }
          </div>
      </div>
    </Layout>
  );
};

export default Search;
