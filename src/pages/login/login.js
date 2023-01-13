import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import style from "./login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.email == "" || form.password == "") {
      swal({
        title: "Login",
        text: "Please Input Email and Password",
        icon: "error",
        dangerMode: true,
      }).then(async (confirm) => {
        if (confirm) {
        }
      });
    } else {
      let inputForm = new FormData();
      inputForm.append("email", form.email);
      inputForm.append("password", form.password);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, inputForm)
        .then((res) => {
          if (res.data.status == true) {
            swal({
              title: "Login",
              text: "Login Successfully",
              icon: "success",
              dangerMode: true,
            }).then(async (confirm) => {
              if (confirm) {
                localStorage.setItem("data", JSON.stringify(res.data.data));
                localStorage.setItem("token", res.data.data.token);
                return navigate("/home");
              }
            });
          } else {
            swal({
              title: "Login",
              text: "Login Failed",
              icon: "error",
              dangerMode: true,
            }).then(async (confirm) => {
              if (confirm) {
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <section>
      <div className={style.containerCustomLogin}>
        <div className="container">
          <div className={style.containerMainLogin}>
            <div className="text-center">
              <h4 style={{ color: "#7E98DF" }}>Login</h4>
            </div>
            <div className="mt-2">
              <span>Hi, welcome back</span>
            </div>
            <div>
              <form>
                <div className="mb-3 mt-4 form-group">
                  <label className="form-label text-secondary">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="telegram@gmail.com"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3 mt-4 form-group">
                  <label className="form-label text-secondary">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="*******"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                </div>
              </form>
              <div
                className="mt-2"
                style={{ textAlign: "right", color: "#7E98DF" }}
              >
                <Link
                  to={`/ForgotPassword`}
                  style={{ textDecoration: "none", color: "#7E98DF" }}
                >
                  <span>Forgot Password?</span>
                </Link>
              </div>
              <div className="mt-3">
                <button onClick={onSubmit} className={style.btnCustomLogin}>
                  Login
                </button>
              </div>
              <div className="mt-4 mb-4 text-center">
                <span className="text-secondary">
                  --------------- Login with ---------------
                </span>
              </div>
              <div className="mt-3">
                <button className={style.btnCustomGoogle}>
                  <i class="fa fa-google"> Google</i>
                </button>
              </div>
              <div className="mt-4 text-center">
                <span>Don't have account?</span>{" "}
                <Link to={`/register`} style={{ textDecoration: "none" }}>
                  <span style={{ color: "#7E98DF" }}>Sign Up</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
