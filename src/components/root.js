import React, { Component } from "react";
import { Outlet, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Route, Redirect } from "react-router";
import Web3 from "web3";
import "../components/Home.css";

import Style from "./App.css";
import { useNavigate } from "react-router-dom";
import mark from "../abis/market.json";
import N from "./N";
import { useState } from "react";
const TodoComponent = {
  width: "800px",
  margin: "30px auto",
  color: "black",
  minHeight: "200px",
  boxSizing: "border-box",
};
const Header = {
  padding: "px 10px",
  textAlign: "center",
  color: "white",
  fontSize: "16px",
};
const n = {
  textAlign: "center",
  margin: "0px auto",
};
const m = {
  textAlign: "center",
  margin: "0px auto",
};

class root extends Component {
  async componentWillMount() {
    await this.loadweb3();
    await this.loadBlockchainData();
  }
  async loadweb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const networkData = mark.networks[networkId];
    this.setState({ account: accounts[0] });
  }
  constructor(props) {
    super(props);

    this.state = {
      account: "",
      N: "",
      value: "",
    };
    this.name = this.name.bind(this);
  }
  name(e) {
    this.setState({
      N: e.target.value,
    });
  }
  render() {
    return (
      <div className="main-search-div">
      <div className="content search-content">
        {/* <div className="container search-container"> */}
          <h1 style={n}> Search </h1>
          <br></br>
          <div style={m}>
            <input
              type="text"
              onChange={this.name}
              className="form-control"
              id="name"
              placeholder="Product Id or Name"
            ></input>
          </div>
          <br></br>

          <br></br>

          <div>
            <div style={Header}>
              <h2>Products</h2>
              <table className="table" style={Header}>
                <thead className="search-thead">
                  <tr className="search-tr">
                    <th scope="col"># Product Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Description</th>
                    <th scope="col">Image</th>
                    <th> Buy </th>
                  </tr>
                </thead>
                <tbody className="search-tbody" id="productList">
                  {this.props.products.map((product, key) => {
                    if (
                      this.state.N == product.name ||
                      this.state.N == product.id + ""
                    ) {
                      return (
                        <tr className="search-tr" key={key}>
                          <th className="product-table" scope="row">
                            {product.id.toString()}
                          </th>
                          <td className="search-td">{product.name}</td>
                          <td className="search-td">
                            {window.web3.utils.fromWei(
                              product.price.toString(),
                              "Ether"
                            )}{" "}
                            ETH
                          </td>
                          <td className="search-td">{product.owner}</td>
                          <td className="search-td">{product.desc}</td>
                          <div className="search-div-img">
                          <img
                            src={product.img}
                            style={{ height: "5rem" }}
                            alt=""
                            srcset=""
                            className="product-buy-img"
                          />
                          </div>
                          <td className="search-td">
                            {!product.purchased ? (
                              <button
                                name={product.id}
                                value={product.price}
                                onClick={(event) => {
                                  this.props.purchaseproduct(
                                    event.target.name,
                                    event.target.value
                                  );
                                }}
                                className="product-buy-button"
                              >
                                Buy
                              </button>
                            ) : (
                              <td className="search-td">Sold out</td>
                            )}
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        {/* </div> */}
      </div>
      </div>
    );
  }
}
export default root;
