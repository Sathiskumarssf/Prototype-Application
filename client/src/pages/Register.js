import axios from "axios";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import BeforeLoginNavbar from "../components/BeforeLoginNavbar";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "danger"

  const register = async () => {
    if (!username || !email || !password) {
      setMessage("All fields are required");
      setMessageType("danger");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("Registration successful! You can now login.");
      setMessageType("success");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Registration failed. Email may already exist."
      );
      setMessageType("danger");
    }
  };

  return (
    <div>
      {/* Styled Navbar */}
      <BeforeLoginNavbar />

      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div
          className="card shadow-lg p-4"
          style={{
            maxWidth: "400px",
            width: "100%",
            borderRadius: "15px",
            border: "none",
          }}
        >
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: "'Segoe UI', sans-serif",
              fontStyle: "italic",
              letterSpacing: "1px",
              color: "#970747",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            Register
          </h2>

          {message && (
            <div className={`alert alert-${messageType}`} role="alert">
              {message}
            </div>
          )}

          {/* Username */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control custom-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control pe-5 custom-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "50%",
                right: "15px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#6c757d",
              }}
            ></i>
          </div>

          {/* Styled Register Button */}
          <button
            className="w-100 mb-3"
            onClick={register}
            style={{
              backgroundColor: "#970747",
              color: "#fff",
              borderRadius: "10px",
              border: "none",
              fontWeight: "bold",
              padding: "10px",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ad1e70")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#970747")}
          >
            Register
          </button>

          <div className="text-center">
            <span>Already have an account? </span>
            <a
              href="/"
              style={{
                color: "#970747",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Custom input styles */}
      <style>
        {`
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
        `}
      </style>
    </div>
  );
}
