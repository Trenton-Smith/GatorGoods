import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "./css/Member.css";
import placeholder from "../../../Components/assets/Stock_img.png";
import keith from "../../../Components/assets/Keith.png"

export default function Member(props) {

  const params = props.match.params;

  const developers = [
    {
      name: "Keith Eastman",
      caption: "Hey I'm Keith, thanks for stopping by!",
      bio:
        "I am a senior at San Francisco State finishing my final semester before I graduate with a degree in Computer Science. I wrote my first scrap of code in visual basic in a forward aid station in Afhganistan to help manage medication inventory and reduce the workload for my squad. Since then I have gained ever deeper appreciation for what a powerful force multiplier the right software can be. In my free time I enjoy brewing beer and painting.",
      linkedIn: "https://www.linkedin.com/in/eastmankeith/",
      img: keith,
    },
    {
      name: "Yugyeong (YG) Lee",
      caption: "Hi, I am YG, nice to meet you!",
      bio: "I am a senior student majoring in Computer Science at San Francisco State University. I was first fascinated by how one’s writing (coding languages) can take shape and for people to use them in daily life and now I am passionate about learning full-stack development. In my free time, I enjoy photography and listening to music. My goal is to be a great full-stack developer and use my skills to support women and the LGBTQ community into STEM fields.",
      linkedIn: "https://www.linkedin.com/in/yg-lee/",
      img: placeholder,
    },
    {
      name: "Zhuozhuo (Joy) Liu",
      caption: "Hi, I am Joy, nice to meet you!",
      bio: "I graduated with a Master's degree in Education at the University of Pennsylvania. Before that, I studied psychology at Tsinghua University in China. This is my 6th year here in the U.S. Now my major is CS and this is my first semester. My skills lie in UX research, design, and front-end programming (still learning!). I'm interested in playing board-game, solving math puzzles, shooting videos about my cat, and Chinese watercolor painting.",
      linkedIn: "https://www.linkedin.com/in/zhuozhuo/",
      img: placeholder,
    },
    {
      name: "Trenton Smith",
      caption: "Hey I'm Trenton Smith, thanks for stopping by!",
      bio: "I'm a United States Air Force veteran who spent six years forecasting weather and leading highly specialized and diverse teams around the country. After separating from the military, I became a full-time student at San Francisco State University where I'm currently studying computer science. I have a passion for software development and solving real-world problems with technology. When I'm not coding however, you can find me pursuing my other interests: art, music, fitness, sports, sustainable living, and science to name a few. I strive for self-improvement, and fully embrace lifelong learning! Stay kind, love life, and be well!",
      linkedIn: "https://www.linkedin.com/in/trenton-smith/",
      img: placeholder,
    },
  ];

  return (
    <div className="member">
      <Container>
        <Row>
          <Image className="member-img" src={developers.find(dev => dev.name == params.name).img} roundedCircle />
        </Row>

        <Container className="member-textbox">
          <Row>
            <Col>
                <h3>
                    {developers.find(dev => dev.name == params.name).caption}
                </h3>
            </Col>
          </Row>
          <Row className="text-container">
            <Col lg={{ span: 8, offset: 2 }}>
              {developers.find(dev => dev.name == params.name).bio}
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                className="member-btn"
                variant="primary"
                href={developers.find(dev => dev.name == params.name).linkedIn}
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