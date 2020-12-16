import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Modal, Container, Image } from "react-bootstrap";
import axios from "axios";
import "./Dashboard.css";
import { FaGlobeAmericas, FaRegCalendar, FaCog } from 'react-icons/fa';

/**
 * File name: AdminDashboardListingCard.js
 * Purpose: This is the card used to populate an admin's dashboard with all product listings. It is rendered by
 *          way of AdminDashboardListings.js, which houses an initial post request to the db where we then return the results
 *          to this component for rendering. We need to also create additional state for handling an admin request to
 *          approve/reject a listing, in which case we will make a post request to change the visibility of the listing, then
 *          refresh the view.
 * Authors: Hesham, Blin
 */

export default function AdminDashboardListingCard(props) {
  const [modalState, setModalState] = useState("close");

  const handleShowModalReject = () => {
    setModalState("modal-reject")
  }

  const handleShowModalDetails = () => {
    setModalState("modal-details")
  }

  const handleClose = () => {
    setModalState("close")
  }

  /*
   If we implement thumbnails, we will use these instead of the above values, as we will pull from the image_thumb col
   of our image table for the lower res image files on multi-card views (home, books, furniture... etc.) and save the
   full res images (image_blob col of Product_Listings) for individual productListing views.
  */
  // let newImage = new Buffer.from(props.image_thumb.data).toString();
  // let newImage2 = new Buffer.from(props.image_thumb.data).toString("base64");

  let newImage = new Buffer.from(props.image_blob.data).toString(); //renders base64 data
  let newImage2 = new Buffer.from(props.image_blob.data).toString("base64"); //renders binary data

  const [img, setImg] = useState(newImage2); // state for img (see above)


  /*
   This useEffect is for rendering images tailored to specific product_listings. For product_id's < 33, we render the
   binary data which we manually input into the database for initial testing; and thereafter, we set our image to render
   base64 data which is saved through the application's registered users.
  */
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
      setModalState("close");
      console.log("Product approved", response);
    });

  const rejectProduct = () => axios
    .post("/api/dashboard/rejectProduct", {
      product_id: props.product_id
    }).then((response) => {
      setModalState("close");
      console.log("Product rejected", response);
    });

    const getCondition = (n) => {
      if (n === "1")
        return "Like New"
      else if (n === "2")
        return "Very Good"
      else if (n==="3") 
        return "Good"
      else 
        return " Acceptable"
    }

  return (
    <div>
      <Card style={{ width: "18rem" }} className="dashboard-listing-card">
        <Card.Img className="listing-card-image" variant="top" src={`data:image/jpeg;charset=utf-8;base64, ${img}`}
          onClick={handleShowModalDetails} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>${props.price}</Card.Text>

          {props.status === "pending" &&
            <Row className="justify-content-lg-center">
              <Col lg={{ size: 6 }}>
                <Button variant="primary"
                  className="button"
                  onClick={approveProduct}
                >
                  Approve
                </Button>
              </Col>
              <Col lg={{ size: 6 }}>
                <Button
                  variant="secondary"
                  className="button"
                  onClick={handleShowModalReject}
                >
                  Reject
              </Button>
              </Col>
            </Row>
          }

          {props.status === "approved" &&
            <Row className="justify-content-lg-center">

              <Col lg={{ size: 6 }}>
                <Button
                  variant="secondary"
                  className="button"
                  onClick={handleShowModalReject}
                >
                  Revoke
              </Button>
              </Col>
            </Row>
          }

          {(props.status === "rejected" &&
            <Row className="justify-content-lg-center">

              <Col lg={{ size: 6 }}>
                <Button
                  variant="primary"
                  className="button"
                  onClick={approveProduct}
                >
                  Reapprove
              </Button>
              </Col>
            </Row>
          )}

          <Modal show={modalState === "modal-reject"} onHide={handleClose}>
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

          <Modal show={modalState === "modal-details"} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Product full details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <h2>{props.title}</h2>
                <Row className="image-container">
                  <Col>
                    <Image className="modal-image" src={`data:image/jpeg;charset=utf-8;base64, ${img}`} rounded />
                  </Col>
                </Row>
                <h4>
                  Product description:
                </h4>
                <p>
                  {props.description}
                </p>
                  <hr></hr>
                  <FaGlobeAmericas size="1rem" style={{ color: "grey" }} /> {props.location}
                  <hr></hr>
                  <FaRegCalendar size="1rem" style={{ color: "grey" }} /> {props.time}
                  <hr></hr>
                  <FaCog size="1rem" style={{ color: "grey" }} /> {getCondition(props.condition)} 
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              {(props.status === "pending" || props.status === "rejected") &&
              <Button variant="primary" onClick={approveProduct}>
                Approve
              </Button>
              }
              {(props.status === "pending" || props.status === "accepted") &&
              <Button variant="primary" onClick={rejectProduct}>
                Reject
              </Button>
              }
            </Modal.Footer>
          </Modal>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{props.time}</small>
        </Card.Footer>
      </Card>
    </div >
  );
}