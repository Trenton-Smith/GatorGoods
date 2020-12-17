import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "./css/YG.css";
import joyImg from "../../../assets/Joy.png";


export default function Joy() {
  return (
    <div className="yg">
      <Container>
        <Row>
          <Image className="yg-img" src={joyImg} roundedCircle />
        </Row>

        <Container className="yg-textbox">
          <Row>
            <Col>
              <h3>Hi, I am Joy, nice to meet you!</h3>
            </Col>
          </Row>
          <Row className="text-container" >
              <Col lg={{ span: 8, offset: 2 }}>
              I graduated with a Master's degree in Education at the University of Pennsylvania. Before that, I
                studied psychology at Tsinghua University in China. This is my 6th year here in the U.S. Now my
                major is CS and this is my first semester. My skills lie in UX research, design, and front-end
                programming (still learning!). I'm interested in playing board-game, solving math puzzles,
                shooting videos about my cat, and Chinese watercolor painting.
              </Col>
          </Row>

          <Row>
            <Col>
              <Button
                  className="yg-btn"
                  variant="primary"
                  href="https://www.linkedin.com/in/zhuozhuo/"
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