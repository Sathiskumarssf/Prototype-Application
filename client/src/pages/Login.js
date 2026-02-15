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
    <BeforeLoginNavbar />
     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4">Login</h2>

        {message && (
          <div className={`alert alert-${messageType}`} role="alert">
            {message}
          </div>
        )}

        {/* Email */}
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password (eye icon inside input, no background) */}
        <div className="mb-4 position-relative">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control pe-5"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <i
            className={`bi ${
              showPassword ? "bi-eye-slash" : "bi-eye"
            }`}
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              top: "50%",
              right: "15px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#6c757d"
            }}
          ></i>
        </div>

        <button className="btn btn-secondary w-100 mb-3" onClick={login}>
          Login
        </button>

        <div className="text-center">
          <span>Don't have an account? </span>
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
   </div>
  );
}
