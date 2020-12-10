import React, {useEffect, useState} from "react";
import { Card, Col, Row, Button, Modal } from "react-bootstrap";
import "./Dashboard.css";
import axios from "axios";

export default function DashboardListingCard(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let newImage = new Buffer.from(props.image_blob.data).toString(); //renders base64 data
  let newImage2 = new Buffer.from(props.image_blob.data).toString("base64"); //renders binary data

  console.log(props);

  /*
   If we implement thumbnails, we will use these instead of the above values, as we will pull from the image_thumb col
   of our image table for the lower res image files on multi-card views (home, books, furniture... etc.) and save the
   full res images (image_blob col of Product_Listings) for individual productListing views.
  */
  // let newImage = new Buffer.from(props.image_thumb.data).toString();
  // let newImage2 = new Buffer.from(props.image_thumb.data).toString("base64");

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


  const handleDelete = () => {
    axios
        .post("/api/dashboard/deleteMyProduct", {
          product_id: props.product_id
        })
        .then((response) => {
          setShow(false)
          window.location.reload()
        });
  }




  return (
    <div>
      <Card style={{ width: "18rem" }} className="dashboard-listing-card">
        <Card.Img variant="top" src={`data:image/jpeg;charset=utf-8;base64, ${img}`}/>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Card.Text>{props.price}</Card.Text>
          <Row className="justify-content-lg-center">
            {/*<Col lg={5}>*/}
            {/*  <Button*/}
            {/*    variant="btn btn-outline-secondary"*/}
            {/*    className="button"*/}
            {/*    href="/newListing"*/}
            {/*  >*/}
            {/*    Edit*/}
            {/*  </Button>*/}
            {/*</Col>*/}
            <Col lg={5}>
              <Button
                variant="secondary"
                className="button"
                onClick={handleShow}
              >
                Delete
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete a Listing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  After deleting, it will not be visible to anyone including
                  yourself. Are you sure you want to delete it?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleDelete}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Card.Body>
        {/*<Card.Footer>*/}
          {/*<small className="text-muted">{props.time}</small>*/}
        {/*</Card.Footer>*/}
      </Card>
    </div>
  );
}
