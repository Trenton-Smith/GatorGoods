import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "./ListingCard.css";
import { useHistory } from "react-router-dom";

export default function ListingCard(props) {
  const history = useHistory();
  function handleClick(e) {
    e.preventDefault()
    history.push("/productlisting", {
      productListing: props
    });
  }

  // console.log(props)
  const newImage = new Buffer.from(props.image_blob.data).toString(
      "base64"
    );

  return (
    <Card
      onClick={handleClick}
      className="listingcard"
      style={{ height: "30rem", width: "15rem" }}
    >
      {/*<Card.Img variant="top" src="holder.js/100px160" />*/}
      <Card.Img variant="top" src={`data:image/jpeg;base64, ${newImage}`} alt="image not found" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          <Row className="price-condition">
            <Col>${props.price}</Col>
          </Row>
        </Card.Text>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

