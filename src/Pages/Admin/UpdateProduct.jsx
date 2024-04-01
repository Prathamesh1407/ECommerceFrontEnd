import { React, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../context/auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import axios from "axios";
const { Option } = Select;
const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [cname, setCName] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [ID, setID] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/get-product/${params.slug}`,
        { header: { Authorization: auth?.token } }
      );
      if (data.success) {
        setName(data.product.name);
        setCName(data.product.category.name);
        setID(data.product._id);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setShipping(data.product.shipping);
        setCategory(data.product.category._id);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error while getting the Product ");
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/update-product/${ID}`,
        productData,
        {
          headers: { Authorization: auth?.token },
        }
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/all-products");
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error while Updating Product", err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      if (window.confirm("Are You Sure about Deleting the Product ?") == true) {
        const { data } = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/delete-product/${ID}`,
          {
            headers: { Authorization: auth?.token },
          }
        );

        if (data?.success) {
          toast.success("Product Deleted Successfully");
          navigate("/dashboard/admin/all-products");
        } else {
          toast.error(data?.message);
        }
      } else return;
    } catch (err) {
      console.log(err);
      toast.error("Error while Deleting Product", err);
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select A Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={cname}
              >
                {categories?.map((item) => {
                  return (
                    <Select.Option key={item._id} value={item._id}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center fs-4 fw-normal">
                    Preview :
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${ID}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter the Product Name"
                  className="form-control"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder={`Enter the Description of ${name}`}
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder={`Enter the Price of ${name}`}
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder={`Enter the Quantity of ${name}`}
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>
              <div className="my-auto text-center">
                <button className="btn btn-primary mx-3" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
                <button className="btn btn-danger mx-3" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
