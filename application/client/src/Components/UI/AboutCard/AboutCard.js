import React from "react";
import { Button, Card, Col } from "react-bootstrap";

export default function AboutCard(props) {
  return (
    <Col lg={3}>
      <Card>
        <Card.Img variant="top" src={props.img} />
        <Card.Body>
          <span className="card-subtext">{props.role}</span>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
            <Button variant="outline-dark" href={props.url}>
            Learn more
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
