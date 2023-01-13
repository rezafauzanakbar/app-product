import React from "react";
import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();

  useEffect(() => {
    getDetailProduct();
  }, []);

  const [detail, setDetail] = useState([]);
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
        setDetail(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md="{12}">
            <Card className="border-0 rounded shadow-sm">
              <Card.Body>
                <Table striped bordered hover className="mb-1">
                  <thead>
                    <tr className="text-center">
                      <th>Name</th>
                      <th>Email</th>
                      <th>AKSI</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr key={detail.id}>
                      <td>{detail.name}</td>
                      <td>{detail.price}</td>
                      <td className="text-center">
                        <Button
                          as={Link}
                          to={`/Update/${detail.id}`}
                          variant="secondary"
                          size="sm"
                          className="me-2"
                        >
                          EDIT
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Button as={Link} to="/home" variant="primary" className="m-3">
                  KEMBALI
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Detail;
