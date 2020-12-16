import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "./css/YG.css";
import placeholder from "../../../assets/yg.png";

export default function YG() {
  return (
    <div className="yg">
      <Container>
        <Row>
          <Image className="yg-img" src={placeholder} roundedCircle />
        </Row>

        <Container className="yg-textbox">
          <Row>
            <Col>
              <h3>Hi, I am YG, nice to meet you!</h3>
            </Col>
          </Row>
          <Row className="text-container">
            <Col lg={{ span: 8, offset: 2 }}>
              I am a senior student majoring in Computer Science at San
              Francisco State University. I was first fascinated by how one’s
              writing (coding languages) can take shape and for people to use
              them in daily life and now I am passionate about learning
              full-stack development. In my free time, I enjoy photography and
              listening to music. My goal is to be a great full-stack developer
              and use my skills to support women and the LGBTQ community into
              STEM fields.
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                className="yg-btn"
                variant="primary"
                href="https://www.linkedin.com/in/yg-lee/"
              >
                Connect with Me
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}
