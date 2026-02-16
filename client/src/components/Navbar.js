import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/navbar.css";

export default function AppNavbar() {
  const location = useLocation();

  return (
    <Navbar
      expand="lg"
      variant="dark"
      className="navbar navbar-expand-lg shadow p-3"
      style={{
        backgroundColor: "#970747",
        width: "100%",
        zIndex: 1000,
      }}
    >
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold"
          style={{
            letterSpacing: "2px",
            fontFamily: "'Segoe UI', sans-serif",
             
            color: "#ffffff",
             
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
              className="text-white px-3 py-2 rounded nav-btn "
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

      {/* Extra Styles */}
      <style>
        {`
          .nav-btn {
            transition: all 0.3s ease;
            background-color: #c12b86;
          }
            .fw-bold{
            margin-left:20px;
            font-size:2.1rem;
            }

          .nav-btn:hover {
            background-color: #ad1e70;
          }

          /* 📱 Mobile adjustments */
          @media (max-width: 768px) {
            .nav-btn {
              width: 35%;
              text-align: left;
               
            }
              .fw-bold{
              margin-left:0px;
              font-size:1.8rem}
          }
        `}
      </style>
    </Navbar>
  );
}
