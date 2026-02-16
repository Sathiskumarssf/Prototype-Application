import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch items from backend
  const fetchItems = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/items`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Add or update item
  const handleSubmit = async () => {
    if (!title || !price || (!file && !editingItemId)) {
      setMessage("All fields including image are required");
      setMessageType("danger");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    if (file) formData.append("image", file);

    try {
      let res;
      if (editingItemId) {
        res = await axios.put(`${API_URL}/api/items/${editingItemId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setItems(items.map(item => (item._id === editingItemId ? res.data : item)));
        setMessage("Item updated successfully!");
      } else {
        res = await axios.post(`${API_URL}/api/items`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setItems([...items, res.data]);
        setMessage("Item added successfully!");
      }

      setTitle("");
      setPrice("");
      setFile(null);
      setEditingItemId(null);
      setMessageType("success");
    } catch (err) {
      console.error(err);
      setMessage("Failed to save item");
      setMessageType("danger");
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/items/${id}`);
      setItems(items.filter(i => i._id !== id));
      setMessage("Item deleted successfully!");
      setMessageType("success");
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete item");
      setMessageType("danger");
    }
  };

  // Edit item
  const editItem = (item) => {
    setEditingItemId(item._id);
    setTitle(item.title);
    setPrice(item.price);
    setFile(null);
  };

 return (
  <div>
    <Navbar/>

    <div className="p-3 my-4">
      <div
        className="card shadow-lg p-4"
        style={{ borderRadius: "15px", border: "none" }}
      >
        {/* Dashboard Title */}
        <h2
          className=" mb-4"
          style={{
            fontFamily: "'Segoe UI', sans-serif",
            fontStyle: "italic",
            letterSpacing: "1px",
            color: "#970747",
            textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          Dashboard
        </h2>

        {/* Alert Messages */}
        {message && (
          <div className={`alert alert-${messageType}`} role="alert">
            {message}
          </div>
        )}

        {/* Add/Edit Item Form */}
        <div className="row g-2 mb-4">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Item Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="file"
              className="form-control custom-input"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="col-md-3">
            <button
              className="btn custom-btn"
              onClick={handleSubmit}
            >
              {editingItemId ? "Update Item" : "Add Item"}
            </button>
          </div>
        </div>

        {/* Items Table */}
        <div className="table-responsive"  >
          <table className="table custom-table text-center align-middle" >
            <thead>
              <tr>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {item.image ? (
                        <img
                          src={`${API_URL}${item.image}`}
                          alt={item.title}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td>{item.title}</td>
                    <td>${item.price}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm  "
                        onClick={() => editItem(item)}
                        style={{width:"100px"}}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-warning btn-sm p-1 m-1"
                        onClick={() => deleteItem(item._id)}
                         style={{width:"100px"}}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No items found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Custom Styles */}
    <style>
      {`
        /* Inputs */
        .card{
        margin:20px;
        }
        .custom-input {
          border-radius: 10px;
          border: 1px solid #970747;
          box-shadow: none;
        }
        .custom-input:focus {
          border-color: #ad1e70;
          outline: none;
          box-shadow: 0 0 0 0.2rem rgba(173,30,112,0.25);
        }

        /* Buttons */
        .custom-btn {
          background-color: #970747;
          color: #fff;
          border-radius: 10px;
          border: none;
          width:120px;
          font-weight: bold;
          padding: 8px;
          transition: all 0.3s;
        }
          @media (max-width: 768px) {
  .custom-btn {
    width: 100%;
  }
    .card{
        margin:5px;
        }
}
        .custom-btn:hover {
          background-color: #ad1e70;
        }

        .btn-warning {
          background-color: #f0ad4e;
          
          border-color: #f0ad4e;
          transition: all 0.3s;
        }
        .btn-warning:hover {
          background-color: #e0a03f;
          border-color: #e0a03f;
        }

        .btn-danger {
          transition: all 0.3s;
        }
        .btn-danger:hover {
          background-color: #c82333;
          border-color: #c82333;
        }

        /* Table Styling */
        .custom-table {
          border-collapse: separate;
          border-spacing: 0;
          border-radius: 10px;
          overflow: hidden;
          width: 100%;
        }
        .custom-table thead {
          background-color: #970747;
          color: #fff;
        }
        .custom-table th, .custom-table td {
          vertical-align: middle;
          padding: 12px;
        }
        .custom-table tbody tr:hover {
          background-color: rgba(151, 7, 71, 0.1);
          transition: background-color 0.3s;
        }
      `}
      
    </style>
  </div>
);

}
