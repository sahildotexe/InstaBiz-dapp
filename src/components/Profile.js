// import Style from "./App.css";
import React, { Component } from "react";
import logo from "../Images/profile.svg";
import "../components/Main.css";

class Profile extends Component {
  render() {
    return (
      <div className="addp-content" style={{}}>
        <div className="addp-container">
          <div>
            <h1 className="page-head"> Edit Profile : </h1>
            <form onSubmit={async (event) => {}}>
              <div className="prod-name-div">
                <label>Name</label>
                <input
                  id="Name"
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="prod-price-div">
                <label>Type</label> <br />
                <select className="profile-select" name="type" id="">
                  <option value="Buyer">Buyer</option>
                  <option value="Seller">Seller</option>
                </select>
              </div>

              <div className="prod-name-div">
                <label>Instagram ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="IG id"
                  required
                />
              </div>
              <div className="product-desc">
                <label>Address</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  required
                />
              </div>
              <div className="prod-name-div">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone number"
                  required
                />
              </div>
              <div>
                <button type="submit" className="form-button add-product-button">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="vector-image">
          <img src={logo} style={{ height: "50vh" }} alt="price-img" />
        </div>
      </div>
    );
  }
}

export default Profile;
