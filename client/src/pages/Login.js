import axios from "axios";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import BeforeLoginNavbar from "../components/BeforeLoginNavbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const login = async () => {
    if (!email || !password) {
      setMessage("Both email and password are required");
      setMessageType("danger");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", response.data.token);
      setMessage("Login successful!");
      setMessageType("success");
      window.location.href = "/dashboard";
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
      setMessageType("danger");
    }
  };

  return (
    <div>
      {/* Styled Navbar */}
      <BeforeLoginNavbar />

      <div className="d-flex justify-content-center align-items-center vh-100 bg-light ">
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
            Login
          </h2>

          {message && (
            <div className={`alert alert-${messageType}`} role="alert">
              {message}
            </div>
          )}

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

          {/* Styled Login Button */}
          <button
            className="w-100 mb-3"
            onClick={login}
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
            Login
          </button>

          <div className="text-center">
            <span>Don't have an account? </span>
            <a
              href="/register"
              style={{ color: "#970747", fontWeight: "bold", textDecoration: "underline" }}
            >
              Register
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
