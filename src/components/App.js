import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import N from "./N";
import N2 from "./N copy";
import Addp from "./addp";
import Home from "./Home";
import Layout from "./Layout";
import Root from "./search";
import Profile from "./Profile";
function App() {
  return (
    <>
      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/addp" element={<Addp />}></Route>

              <Route path="/Home" element={<Home />}></Route>
              <Route path="/N" element={<N />}></Route>
              <Route path="/search" element={<Root />}></Route>
              <Route path="/N2" element={<N2 />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
