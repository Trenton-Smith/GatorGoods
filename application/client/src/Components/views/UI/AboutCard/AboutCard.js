import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AboutCard(props) {
  return (
    <Col lg={3}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.img} />
        <Card.Body>
          <span className="card-subtext">{props.role}</span>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Link to={`/about/${props.name}`}>
            <Button variant="outline-dark">
              Learn more
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
