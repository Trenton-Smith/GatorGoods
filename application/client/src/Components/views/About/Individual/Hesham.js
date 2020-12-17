import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "./css/YG.css";

import hesham from "../../../assets/hesham.jpg";


export default function Hesham() {
    return (
      <div className="yg">
        <Container>
          <Row>
            <Image className="yg-img" src={hesham} roundedCircle />
          </Row>
  
          <Container className="yg-textbox">
            <Row>
              <Col>
                <h3>Hi, this is Hesham!</h3>
              </Col>
            </Row>
            <Row className="text-container" >
                <Col lg={{ span: 8, offset: 2 }}>
                    Graduated with a Computer Engineering Bachelor's degree in Alexandria, Egypt, now studying for my master's degree at Hochschule Fulda. Have interned last summer with American Express in the UK.
                </Col>
            </Row>
  
            <Row>
              <Col>
                <Button
                    className="yg-btn"
                    variant="primary"
                    href="https://www.linkedin.com/in/etchsaleh/"
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