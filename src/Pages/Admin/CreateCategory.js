import { React, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import { toast } from "react-hot-toast";
import {
  makeAuthenticatedDELETERequest,
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
  makeAuthenticatedPUTRequest,
} from "../../utils/ServerHelper";
import { Modal } from "antd";
import { useAuth } from "../../context/auth";
import CategoryForm from "../../components/Form/CategoryForm";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState(null);
  const [auth, setAuth] = useAuth();
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await makeAuthenticatedPOSTRequest(
        "/api/v1/category/create-category",
        { name },
        auth?.token
      ).then((res) => {
        if (res.success) {
          toast.success(`${name} Category is Created`);
          setName("");
          getAllCategories();
        } else {
          toast.error(res.message);
        }
      });
    } catch (err) {
      console.log("Error in the Category Form", err);
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(updatedName)
      await makeAuthenticatedPUTRequest(
        `/api/v1/category/update-category/${selected._id}`,
        { name:updatedName },
        auth?.token
      ).then((res) => {
        if (res.success) {
          toast.success(`${selected.name} is updated to ${updatedName}`);
          setVisible(false);
          setSelected(null);
          setUpdatedName("");
          getAllCategories();
        } else {
          toast.error(res.message);
        }
      });
    } catch (err) {
      console.log("Error in the Category Form", err);
    }
  };
  const handleDelete= async (cID,cName) => {
    try {
      await makeAuthenticatedDELETERequest(
        `/api/v1/category/delete-category/${cID}`,
        auth?.token
      ).then((res) => {
        if (res.success) {
          toast.success(`${cName} Category is Deleted`);
          getAllCategories();
        } else {
          toast.error(res.message);
        }
      });
    } catch (err) {
      console.log("Error in the Category Form", err);
    }
  };
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

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Categories</h1>
            <div className="p-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((item) => {
                    return (
                      <>
                        <tr>
                          <td key={item._id}>{item.name}</td>
                          <td>
                            <button
                              className="btn btn-primary ms-2"
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(item.name);
                                setSelected(item);
                              }}
                            >
                              Edit
                            </button>
                            <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(item._id,item.name)}}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                handleSubmit={handleUpdate}
                value={updatedName}
                setValue={setUpdatedName}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
