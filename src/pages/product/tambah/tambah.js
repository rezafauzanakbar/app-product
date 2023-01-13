import React, { useState } from "react";
import axios from "axios";
import { Link, navigate, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Tambah = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
  });

  const onSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    if (form.name == "" || form.price == "") {
      alert("Please input all field");
    } else {
      const body = {
        name: form.name,
        price: form.price,
      };
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/product/store`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          alert(res.data.message);
          return navigate("/home");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <div className="m-5">
        <form>
          <div className="form-group m-1">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="name"
            />
          </div>
          <div className="form-group m-1">
            <input
              type="number"
              className="form-control"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="price"
            />
          </div>

          <div className="form-group m-1">
            <button
              type="submit"
              className="btn btn-success"
              onClick={onSubmit}
            >
              Submit
            </button>
            <Button as={Link} to="/home" variant="primary" className="m-3">
              KEMBALI
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Tambah;
