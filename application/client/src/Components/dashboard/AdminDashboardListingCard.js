import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "./Dashboard.css";

export default function AdminDashboardListingCard(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let newImage = new Buffer.from(props.image_blob.data).toString(); //renders base64 data
  let newImage2 = new Buffer.from(props.image_blob.data).toString("base64"); //renders binary data

  const [img, setImg] = useState(newImage2); // state for img (see above)

  useEffect(() => {
    if (props.product_id < 33) {
      setImg(newImage2);
    } else {
      setImg(newImage);
    }
  }, [props, img]);

  const approveProduct = () => axios
    .post("/api/dashboard/approveProduct", {
      product_id: props.product_id
    }).then((response) => {
      console.log("Product approved", response);
      props.reload();
    });

  const rejectProduct = () => axios
    .post("/api/dashboard/rejectProduct", {
      product_id: props.product_id
    }).then((response) => {
      setShow(false);
      console.log("Product rejected", response);
      props.reload();
    });

  return (
    <div>
      <Card style={{ width: "18rem" }} className="dashboard-listing-card">
        <Card.Img variant="top" src={`data:image/jpeg;charset=utf-8;base64, ${img}`} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.price}</Card.Text>
          <Row className="justify-content-lg-center">
            <Col lg={5}>
              {(props.status === "pending" || props.status === "rejected") &&
                <Button variant="primary"
                  className="button"
                  onClick={approveProduct}
                >
                  Approve
              </Button>
              }
            </Col>
            <Col lg={5}>
            {(props.status === "pending" || props.status === "approved") &&
              <Button
                variant="secondary"
                className="button"
                onClick={handleShow}
              >
                Reject
              </Button>
              }
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
    </div >
  );
}