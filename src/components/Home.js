import React, { Component } from "react";
import "../components/Home.css";
import logo from "../Images/0x0-removebg-preview.png";
import "../components/Home.css";

const TodoComponent = {
  width: "800px",
  margin: "30px auto",
  color: "black",
  minHeight: "200px",
  boxSizing: "border-box",
};
const Home = () => {
  return (
    <div className="home-container">
      <div className="content-heading">
        <div className="heading-div">
          <h1 className="product-heading">Welcome to Meta Market</h1>
          <p>You can buy and sell your products here</p>
          <button class="custom-btn btn-7"><span>Explore</span></button>
        </div>
      </div>
      <div className="landing-logo">
        <img src={logo} alt = "Landing-page-img" />
      </div>
    </div>
  );
};
export default Home;
