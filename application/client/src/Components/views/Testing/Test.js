import React, { useState, useEffect } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";

export default function Test(props) {
  const [productListings, setProductListings] = useState([]);

  useEffect(() => {
    setProductListings(props.location.state.productListings);
    // props.location.state.productListings.map((productListing) => {
    //   const newImage = new Buffer.from(productListing.image.data).toString(
    //     "base64"
    //   );
    //   productListing.image.data = newImage;
    //   return console.log(productListings);
    // });
  }, [props.location.state.productListings, productListings]);

  return (
    <Container style={{ marginTop: "100px" }}>
      <h1>Vertical Prototype Testing Result Home</h1>
      <h3>
        <span style={{ color: "#e67a00" }}>
          {props.location.state.category} {props.location.state.searchTerm}{" "}
        </span>
        results..
      </h3>

      <Row style={{ marginTop: "50px" }}>
        {productListings.map((productListing) => (
          <Col lg={3} key={productListing.id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="holder.js/100px160"
                // src={`data:image/jpeg;base64, ${productListing.image.data}`}
              />
              <Card.Body>
                {/*<span className="card-subtext">{productListing.category}</span>*/}
                <Card.Title>{productListing.title}</Card.Title>
                <Card.Text>{productListing.description}</Card.Text>
                <Card.Text>${productListing.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
