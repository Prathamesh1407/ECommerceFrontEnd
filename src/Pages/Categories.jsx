import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout>
      <div className="container">
      <div className="row">
          {categories.map((item) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={item._id}>
              <Link to={`/category/${item.slug}`}>
                <Button info={item}/>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
