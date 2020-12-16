import React from "react";
import { Jumbotron, Container, Row } from "react-bootstrap";
import "./Individual/css/About.css";
import placeholder from "../../assets/Stock_img.png";
import keith from "../../assets/Keith.png";
import joy from "../../assets/Joy.png";
import yg from "../../assets/ygphoto.jpg";
import bln from "../../assets/blnvrf.jpg";

//import axios from "axios";
import AboutCard from "../UI/AboutCard/AboutCard";

export default function About() {
  const developers = [
    {
      role: "Team Lead",
      name: "Keith Eastman",
      img: keith,
      description:
        "I'm a student veteran with a passion for moving fast and breaking things",
      url: "/about/keith",
    },
    {
      role: "Back-end Lead",
      name: "Yugyeong (YG) Lee",
      img: yg,
      description:
        "I am a senior student majoring in Computer Science at San Francisco State University.",
      url: "/about/yg",
    },
    {
      role: "Front-end Lead",
      name: "Zhuozhuo (Joy) Liu",
      img: joy,
      description:
        "I am a master student majoring in Computer Science at SFSU. I love my cat.",
      url: "/about/joy",
    },
    {
      role: "Github Master | Editor",
      name: "Trenton Smith",
      img: placeholder,
      description:
        "I'm a military veteran, Computer Science major, and avid learner devoted to personal growth.",
      url: "/about/trenton",
    },
    {
      role: "Software Developer",
      name: "Blin Varfi",
      img: bln,
      description:
        "Master student at Hochschule Fulda. Growing 1% by each day!",
      url: "/about/blin",
    },
    {
      role: "Software Developer",
      name: "Hesham",
      img: placeholder,
      description:
        "Master student at Hochschule Fulda.",
      url: "/about/hesham",
    },
  ];

  // const allDevs = [];

  // React.useEffect(() => {
  //   fetchDevs();
  // }, []);

  // const fetchDevs = () => {
  //   axios.get("/api/developer").then((res) => {
  //     for (let i = 0; i < res.data.length; i++) {
  //       allDevs.push(res.data[i]);
  //     }
  //     console.log(allDevs);
  //   });
  // };

  return (
    <div>
      <Jumbotron className="about-banner">
        <h2>Software Engineering class SFSU</h2>
        <br />
        <h5>Fall 2020</h5>
        <h5>Team 8</h5>
      </Jumbotron>

      <Container>
        <Row>
          {developers.map((dev, i) => (
            <AboutCard key={i} {...dev} />
          ))}
        </Row>
      </Container>
    </div>
  );
}