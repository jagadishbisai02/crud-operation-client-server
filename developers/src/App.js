import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/form";

import "./App.css";

axios.defaults.baseURL = "http://localhost:8080/";

const App = () => {
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [formEditData, setFormEditData] = useState({
    name: "",
    email: "",
    mobile: "",
    id: "",
  });

  const [dataList, setDataList] = useState([]);

  const handleonChange = (event) => {
    const { value, name } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleOnEdit = async (event) => {
    const { value, name } = event.target;
    setFormEditData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);
    if (data.data.success) {
      setAddForm(false);
      alert(data.data.message);
    }
  };

  const formUpdate = async (event) => {
    event.preventDefault();
    const data = await axios.put(`/update`, formEditData);
    if (data.data.success) {
      getFetchData();
      setEditForm(false);
      alert(data.data.message);
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    setDataList(data.data.data);
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete(`/delete/${id}`);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleEdit = (each) => {
    setEditForm(true);
    setFormEditData(each);
  };

  return (
    <>
      <div className="container">
        <button
          type="button"
          className="add-btn btn-adds"
          onClick={() => setAddForm(true)}
        >
          <span>Add</span>
        </button>
        {addForm && (
          <Form
            formSubmit={formSubmit}
            handleonChange={handleonChange}
            handleClose={() => setAddForm(false)}
            rest={formData}
          />
        )}
        {editForm && (
          <Form
            formSubmit={formUpdate}
            handleonChange={handleOnEdit}
            handleClose={() => setEditForm(false)}
            rest={formEditData}
          />
        )}

        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th></th>
              </tr>
            </thead>

            {dataList.length > 0 ? (
              <tbody>
                {dataList.map((each) => {
                  return (
                    <tr>
                      <td>{each.name}</td>
                      <td>{each.email}</td>
                      <td>{each.mobile}</td>
                      <td>
                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() => handleEdit(each)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => handleDelete(each._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <>
                <p>No Data</p>
              </>
            )}
          </table>
        </div>
      </div>
    </>
  );
};
export default App;
