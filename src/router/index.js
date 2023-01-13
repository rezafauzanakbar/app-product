import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/login";
import swal from "sweetalert";
import Home from "../pages/home/home";
import Detail from "../pages/product/detail/detail";
import Tambah from "../pages/product/tambah/tambah";
import Update from "../pages/product/update/update";

const Auth = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    swal({
      title: "Denied!",
      text: `Access Denied, Please Login!`,
      icon: "error",
    });
    return <Navigate to="/" replace />;
  }
  return children;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route
            path="/home"
            element={
              <Auth>
                <Home />
              </Auth>
            }
          />
          <Route
            path="/Detail/:id"
            element={
              <Auth>
                <Detail />
              </Auth>
            }
          />
          <Route
            path="/Tambah"
            element={
              <Auth>
                <Tambah />
              </Auth>
            }
          />
          <Route
            path="/Update/:id"
            element={
              <Auth>
                <Update />
              </Auth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
