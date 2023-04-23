import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "./Navbar.css"
// import logo from "./logo.svg";

const navbar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="styles.navbar">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src= {require("./logo.jpg")}
              width="80px" height="70px"
              className="d-inline-block align-top"
            />{" "}
            {/* React Bootstrap */}
          </Navbar.Brand>
          <Button typeof="submit" variant="danger" className="styles.btn">Sign In</Button>{' '}
        </Container>
      </Navbar>
    </div>
  );
};

export default navbar;
