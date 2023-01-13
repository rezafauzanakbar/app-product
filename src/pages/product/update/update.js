import React from "react";
//import hook useState dan useEffect from react
import { useState, useEffect } from "react";

import {
  Card,
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
} from "react-bootstrap";

import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  //state
  const [form, setForm] = useState({
    product_id: "",
    name: "",
    price: "",
  });

  const { id } = useParams();

  //hook useEffect
  useEffect(() => {
    getDetailProduct();
  }, []);

  const getDetailProduct = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/product/show?product_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        setForm(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //function "updatePost"
  const updatePost = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    if (form.name == "" || form.price == "") {
      alert("Please input all field");
    } else {
      const body = {
        product_id: form.id,
        name: form.name,
        price: form.price,
      };
      //send data to server
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/product/update`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          alert(response.data.message);
          return navigate("/home");
        })
        .catch((error) => {
          //assign validation on state
          console.log(error);
        });
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md="{12}">
            <Card className="border-0 rounded shadow-sm">
              <Card.Body>
                <Form onSubmit={(e) => updatePost(e)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder={form.name}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      placeholder={form.price}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    UPDATE
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Update;
