import React from "react";
import { useSearch } from "../../context/searchContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-search/${values.keyword}`
      );
      if (data?.success) {
        setValues({ ...values, results: data });
        navigate(`/search`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error while searching the products");
    }
  };
  return (
    <form
      className="form-inline d-flex flex-row my-2 my-lg-0"
      onSubmit={handleSubmit}
    >
      <input
        className="form-control mr-sm-2 "
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={values.keyword}
        onChange={(e) => {
          setValues({ ...values, keyword: e.target.value });
        }}
      />
      <button
        className="btn btn-outline-success my-2 mx-2 my-sm-0"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
