import React, { useState } from "react";
import { Card, Col, Row, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "./Dashboard.css";

export default function AdminDashboardListingCard(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const approveProduct = () => axios
    .post("/api/dashboard/approveProduct", {
        product_id : props.product_id
    }).then((response) => {
        console.log("Product approved", response);
    });

  const rejectProduct = () => axios
    .post("/api/dashboard/rejectProduct", {
        product_id : props.product_id
    }).then((response) => {
        setShow(false);
        console.log("Product rejected", response);
    });

  return (
    <div>
      <Card style={{ width: "18rem" }} className="dashboard-listing-card">
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.price}</Card.Text>
          <Row className="justify-content-lg-center">
            <Col lg={5}>
              <Button
                variant="btn btn-outline-secondary"
                className="button"
                onClick={approveProduct}
              >
                Approve
              </Button>
            </Col>
            <Col lg={5}>
              <Button
                variant="secondary"
                className="button"
                onClick={handleShow}
              >
                Reject
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Reject a Listing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  After rejecting, it will not be visible on the website. Are you sure you want to reject it?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={rejectProduct}>
                    Reject
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{props.time}</small>
        </Card.Footer>
      </Card>
    </div>
  );
}