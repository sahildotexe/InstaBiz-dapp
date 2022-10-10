// import Style from "./App.css";
import React, { Component } from "react";
import "../components/Main.css";
import logo from "../Images/add.svg";
import { create } from "ipfs-http-client";
import { Cloudinary } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions/resize";

class Main extends Component {
  render() {
    return (
      <div className="addp-content">
        <div className="addp-container">
          <div>
            <h1 className="page-head"> Add Product </h1>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const file = this.productImg.files[0];

                const cld = new Cloudinary({
                  cloud: {
                    cloudName: "demo",
                  },
                  url: {
                    secure: true, // force https, set to false to force http
                  },
                });

                const myImage = cld.image(file);
                myImage.resize(
                  Resize.scale()
                    .width(100)
                    .height(100)
                );
                const url = myImage.toURL();

                const img = url;
                const name = this.productName.value;
                const desc = this.productDesc.value;
                const Web3Utils = require("web3-utils");
                const price = Web3Utils.toWei(
                  this.productPrice.value.toString(),
                  "Ether"
                );
                console.log(desc);
                console.log(img);
                this.props.createproduct(name, price, desc, img);
              }}
            >
              <div className="prod-name-div">
                <label>Product Name</label>
                <input
                  id="productName"
                  type="text"
                  ref={(input) => {
                    this.productName = input;
                  }}
                  className="form-control"
                  placeholder="Product Name"
                  required
                />
              </div>
              <div className="prod-price-div">
                <label>Product Price</label>
                <input
                  id="productPrice"
                  type="text"
                  ref={(input) => {
                    this.productPrice = input;
                  }}
                  className="form-control"
                  placeholder="Product Price"
                  required
                />
              </div>

              <div className="product-desc">
                <label>About the Product</label>
                <textarea
                  type="text"
                  ref={(input) => {
                    this.productDesc = input;
                  }}
                  className="form-control"
                  placeholder="Explain about the product"
                  required
                />
              </div>

              <div className="product-desc">
                <label>Upload Product Image</label>
                <input
                  type="file"
                  className="form-control"
                  ref={(input) => {
                    this.productImg = input;
                  }}
                  placeholder="Explain about the product"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="form-button add-product-button"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="vector-image">
          <img src={logo} style={{ height: "60vh" }} alt="price-img" />
        </div>
      </div>
    );
  }
}

export default Main;
