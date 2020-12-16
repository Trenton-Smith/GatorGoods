import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "./css/YG.css";

import placeholder from "../../../assets/blnvrf.jpg";


export default function Blin() {
    return (
      <div className="yg">
        <Container>
          <Row>
            <Image className="yg-img" src={placeholder} roundedCircle />
          </Row>
  
          <Container className="yg-textbox">
            <Row>
              <Col>
                <h3>Hi, this is Blin!</h3>
              </Col>
            </Row>
            <Row className="text-container" >
                <Col lg={{ span: 8, offset: 2 }}>
                    Finished my Computer Science Bachelor's degree in Tirana, Albania, now studying for my master's degree at Hochschule Fulda. Have worked in the past as a freelance graphic designer. Currently doing my internship with a German company. I love football, chess and philosophy.
                </Col>
            </Row>
  
            <Row>
              <Col>
                <Button
                    className="yg-btn"
                    variant="primary"
                    href="https://www.linkedin.com/in/blinvarfi/"
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