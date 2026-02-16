import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/navbar.css";

export default function AppNavbar() {
  const location = useLocation();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      variant="dark"
      className={`navbar navbar-expand-lg shadow p-3 ${sticky ? "sticky-nav" : ""}`}
      style={{
        backgroundColor: "#970747",
        width: "100%",
        zIndex: 1000,
      }}
    >
      {/* Use fluid to stretch full width */}
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold"
          style={{
            letterSpacing: "2px",
            fontFamily: "'Segoe UI', sans-serif",
            fontSize: "2.1rem",
            color: "#ffffff",
            marginLeft:'20px'
          }}
        >
          Prototype App
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
            
            <Nav.Link
              as={Link}
              to="/"
              active={location.pathname === "/"}
              className="text-white px-3 py-2 rounded nav-btn"
            >
              Login
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/register"
              active={location.pathname === "/register"}
              className="text-white px-3 py-2 rounded nav-btn"
            >
              Register
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/dashboard"
              active={location.pathname === "/dashboard"}
              className="text-white px-3 py-2 rounded nav-btn"
            >
              Dashboard
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Extra Style */}
      <style>
        {`
          .nav-btn {
            transition: all 0.3s ease;
            background-color:#c12b86
          }

          .nav-btn:hover {
            background-color: #ad1e70;
          }

          .sticky-nav {
            position: fixed;
            top: 0;
            left: 0;
          }

          /* 📱 Mobile adjustments */
          @media (max-width: 768px) {
            .nav-btn {
              width: 30%;
              text-align: left;
              margin-left:20px
            }
          }
        `}
      </style>
    </Navbar>
  );
}
