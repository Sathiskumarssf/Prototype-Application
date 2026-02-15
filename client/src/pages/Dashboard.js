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
    
    <div className=" ">
      <Navbar />
      <div className="card shadow p-4 mb-4">
        <h2 className="text-center mb-4">Dashboard</h2>

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
              className="form-control"
              placeholder="Item Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="file"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100" onClick={handleSubmit}>
              {editingItemId ? "Update Item" : "Add Item"}
            </button>
          </div>
        </div>

        {/* Items Table */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center align-middle">
            <thead className="table-dark">
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
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editItem(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteItem(item._id)}
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
  );
}
