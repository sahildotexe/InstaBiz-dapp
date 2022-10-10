import { Outlet, Link } from "react-router-dom";
import React, { Component, Fragment } from "react";
import { useEffect, useState } from "react";
import {
  containerStyle,
  buttonStyle,
  leftStatus,
  statusIconConnected,
  statusIconDisconnected,
  rowStyle,
} from "../styles/styles";
import logo from "../Images/logo.png";
import UAuth from "@uauth/js";

// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import "../components/layout.css";
const TodoComponent = {
  width: "800px",
  margin: "30px auto",
  color: "black",
  minHeight: "200px",
  boxSizing: "border-box",
};

//import { Button } from "react-bootstrap"

const uauth = new UAuth({
  clientID: "bbe8f08a-dd77-4a01-b02c-1b30844650b9",
  redirectUri: "http://localhost:3000",
});

const Layout = () => {
  const [walletAccount, setWalletAccount] = useState("");
  const [currentChain, setCurrentChain] = useState("");
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState(null);

  const [Uauth, setUauth] = useState();

  async function Connect() {
    try {
      const authorization = await uauth.loginWithPopup();
      setUauth(JSON.parse(JSON.stringify(authorization))["idToken"]);

      // eslint-disable-next-line no-undef
      await authenticate();
    } catch (error) {
      console.error(error);
    }
  }

  async function logOut() {
    uauth.logout();
    logOut();
  }

  function log() {
    if (Uauth === null || Uauth === undefined) {
      Connect();
    } else {
      logOut();
    }
  }

  // Initialize the application and MetaMask Event Handlers
  useEffect(() => {
    handleConnectWallet();
    // Setup Listen Handlers on MetaMask change events
    if (typeof window.ethereum !== "undefined") {
      // Add Listener when accounts switch
      window.ethereum.on("accountsChanged", (accounts) => {
        console.log("Account changed: ", accounts[0]);
        setWalletAccount(accounts[0]);
      });

      // Do something here when Chain changes
      window.ethereum.on("chainChanged", (chaindId) => {
        console.log("Chain ID changed: ", chaindId);
        setCurrentChain(chaindId);
      });
    } else {
      alert("Please install MetaMask to use this service!");
    }
  }, []);

  // Used to see if the wallet is currently connected to the application
  // If an account has been accessed with MetaMask, then the wallet is connected to the application.
  useEffect(() => {
    setIsConnected(walletAccount ? true : false);
  }, [walletAccount]);

  // Connect the Wallet to the current selected account in MetaMask.
  // Will generate a login request for user if no account is currently connected to the application
  const handleConnectWallet = async () => {
    console.log("Connecting MetaMask...");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    console.log("Account: ", account);
    setWalletAccount(account);
  };

  // Handle Disconnected. Removing the state of the account connected
  // to your app should be enough to handle Disconnect with your application.
  const handleDisconnect = async () => {
    console.log("Disconnecting MetaMask...");
    setIsConnected(false);
    setWalletAccount("");
  };

  // Connect Once and set the account.
  // Can be used to trigger a new account request each time,
  // unlike 'eth_requestAccounts'
  const handleConnectOnce = async () => {
    const accounts = await window.ethereum
      .request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      })
      .then(() => window.ethereum.request({ method: "eth_requestAccounts" }));

    setWalletAccount(accounts[0]);
  };

  // Request the personal signature of the user via MetaMask and deliver a message.
  const handlePersonalSign = async () => {
    console.log("Sign Authentication");

    const message = [
      "This site is requesting your signature to approve login authorization!",
      "I have read and accept the terms and conditions (https://example.org/) of this app.",
      "Please sign me in!",
    ].join("\n\n");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    const sign = await window.ethereum.request({
      method: "personal_sign",
      params: [message, account],
    });
  };

  // Get the Accounts current Balance and convert to Wei and ETH
  const handleGetBalance = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [account, "latest"],
    });

    // // Returns a hex value of Wei
    const wei = parseInt(balance, 16);
    const gwei = wei / Math.pow(10, 9); // parse to Gwei
    const eth = wei / Math.pow(10, 18); // parse to ETH

    setEthBalance({ wei, gwei, eth });
    setShowBalanceModal(true);
  };

  const handleSendTransaction = async (sender, receiver, amount) => {
    const gasPrice = "0x5208"; // 21000 Gas Price
    const amountHex = (amount * Math.pow(10, 18)).toString(16);

    const tx = {
      from: sender,
      to: receiver,
      value: amountHex,
      gas: gasPrice,
    };

    await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [tx],
    });

    setShowTransactionModal(false);
  };

  const handleCloseBalanceModal = () => {
    setShowBalanceModal(false);
  };

  const handleOpenTransactionModal = () => {
    setShowTransactionModal(true);
  };

  const handleCloseTransactionModal = () => {
    setShowTransactionModal(false);
  };
  return (
    <>
      <div className="content">
        <nav>
          <ul className="web-name">
            {" "}
            <a class="active">
              <Link
                to="/Home"
                style={{ color: "black", textDecoration: "none" }}
              >
                <img
                  style={{ height: "50px" }}
                  src={logo}
                  alt="..."
                  srcset=""
                />
              </Link>
            </a>
            <button
              className="UDomain"
              style={{ height: "40px", fontSize: "10px" }}
              onClick={log}
            >
              {Uauth != null ? Uauth["sub"] : "Login with UNSD"}
            </button>
          </ul>

          <ul class="ul">
            {isConnected ? (
              <Fragment>
                <li class="li">
                  <a class="active">
                    <Link to="/addp">Add Products</Link>
                  </a>
                </li>
                <li class="li">
                  <a class="active">
                    <Link to="/N">Buy Products</Link>
                  </a>
                </li>
                <li class="li">
                  <a class="active">
                    <Link to="/N2">Your Products</Link>
                  </a>
                </li>
                <li class="li">
                  <a class="active">
                    <Link to="/profile">My Profile</Link>
                  </a>
                </li>
              </Fragment>
            ) : (
              <p></p>
            )}

            <li class="li search-li">
              <a class="active search-active">
                <Link to="/search">Search</Link>
              </a>
            </li>
            <li>
              <div
                className="connect-button"
                onClick={!isConnected ? handleConnectWallet : handleDisconnect}
                style={{ ...buttonStyle, maxWidth: "130px" }}
              >
                <div className="left-status" style={leftStatus}>
                  {isConnected ? (
                    <div
                      className="status-icon connected"
                      style={statusIconConnected}
                    ></div>
                  ) : (
                    <div
                      className="status-icon disconnected"
                      style={statusIconDisconnected}
                    ></div>
                  )}
                </div>
                {isConnected ? (
                  <div
                    className="right-status"
                    style={{
                      width: "100%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    Logged In As : {walletAccount}
                  </div>
                ) : (
                  <div>
                    <div className="right-status" style={{ width: "100%" }}>
                      Login with Metamask
                    </div>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </nav>

        <Outlet />
      </div>
    </>
  );
};

export default Layout;
