import { React, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import { makeAuthenticatedGETRequest } from "../../utils/ServerHelper";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import axios from "axios";
const { Option } = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");

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
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      console.log(productData);
      const response = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/create-product`,
          productData,
          {
            headers: { Authorization: auth?.token },
          }
        )
        .then((res) => {
          if (!(res?.success)) {
            toast.success("Product Created Successfully");
            navigate("/dashboard/admin/all-products");
          } else {
            toast.error(res?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      toast.error("Error while Creating Product",err);
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
            <h1>Create Product</h1>
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
                {photo && (
                  <div className="text-center fs-4 fw-normal">
                    Preview :
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product photo"
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
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>
              <div className="my-auto text-center">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { Select } from "antd";
// import { useNavigate } from "react-router-dom";
// const { Option } = Select;

// const CreateProduct = () => {
//   const navigate = useNavigate();
//   const [auth, setAuth] = useAuth();
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [shipping, setShipping] = useState("");
//   const [photo, setPhoto] = useState("");

//   const getAllCategories = async () => {
//     try {
//       await makeAuthenticatedGETRequest(
//         "/api/v1/category/get-categories",
//         auth?.token
//       )
//         .then((response) => {
//           if (response?.success) {
//             setCategories(response?.allCategories);
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } catch (err) {
//       console.log(err);
//       toast.error("Error while getting the Categories ");
//     }
//   };
//   useEffect(() => {
//     getAllCategories();
//   }, []);

//   //create product function
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const productData = new FormData();
//       productData.append("name", name);
//       productData.append("description", description);
//       productData.append("price", price);
//       productData.append("quantity", quantity);
//       productData.append("photo", photo);
//       productData.append("category", "65cb70ce6c13b8d6bb7992b7");
//       console.log(productData, photo);
//       const { data } = axios.post(
//         "http://localhost:8000/api/v1/product/create-product",
//         productData,
//         {headers:{Authorization:auth}}
//       );
//       if (!data?.success) {
//         toast.error(data?.message);
//       } else {
//         toast.success("Product Created Successfully");
//         navigate("/dashboard/admin/products");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("something went wrong");
//     }
//   };

//   return (
//     <Layout title={"Dashboard - Create Product"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h1>Create Product</h1>
//             <div className="m-1 w-75">
//               <Select
//                 bordered={false}
//                 placeholder="Select a category"
//                 size="large"
//                 showSearch
//                 className="form-select mb-3"
//                 onChange={(value) => {
//                   setCategory(value);
//                 }}
//               >
//                 {categories?.map((c) => (
//                   <Option key={c._id} value={c._id}>
//                     {c.name}
//                   </Option>
//                 ))}
//               </Select>
//               <div className="mb-3">
//                 <label className="btn btn-outline-secondary col-md-12">
//                   {photo ? photo.name : "Upload Photo"}
//                   <input
//                     type="file"
//                     name="photo"
//                     accept="image/*"
//                     onChange={(e) => setPhoto(e.target.files[0])}
//                     hidden
//                   />
//                 </label>
//               </div>
//               <div className="mb-3">
//                 {photo && (
//                   <div className="text-center">
//                     <img
//                       src={URL.createObjectURL(photo)}
//                       alt="product_photo"
//                       height={"200px"}
//                       className="img img-responsive"
//                     />
//                   </div>
//                 )}
//               </div>
//               <div className="mb-3">
//                 <input
//                   type="text"
//                   value={name}
//                   placeholder="write a name"
//                   className="form-control"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <textarea
//                   type="text"
//                   value={description}
//                   placeholder="write a description"
//                   className="form-control"
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>

//               <div className="mb-3">
//                 <input
//                   type="number"
//                   value={price}
//                   placeholder="write a Price"
//                   className="form-control"
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   type="number"
//                   value={quantity}
//                   placeholder="write a quantity"
//                   className="form-control"
//                   onChange={(e) => setQuantity(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <Select
//                   bordered={false}
//                   placeholder="Select Shipping "
//                   size="large"
//                   showSearch
//                   className="form-select mb-3"
//                   onChange={(value) => {
//                     setShipping(value);
//                   }}
//                 >
//                   <Option value="0">No</Option>
//                   <Option value="1">Yes</Option>
//                 </Select>
//               </div>
//               <div className="mb-3">
//                 <button className="btn btn-primary" onClick={handleCreate}>
//                   CREATE PRODUCT
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CreateProduct;
