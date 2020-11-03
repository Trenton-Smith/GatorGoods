import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "./ListingCard.css";
import { useHistory } from "react-router-dom";

export default function ListingCard(props) {
  const history = useHistory();
  function handleClick() {
    history.push("/productlisting");
    // history.push("/{props.name}");
  }

  return (
    <Card onClick={handleClick} className="listingcard">
      <Card.Img variant="top" src="holder.js/100px160" />
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
