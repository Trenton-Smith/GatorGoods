import React from "react";
import { Container } from "react-bootstrap";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard(props) {
  return (
    <Container className="dashboard container" style={{ marginTop: "2rem" }}>
      {props.admin === "1" ? <AdminDashboard user={props.user}/> : <UserDashboard user={props.user}/>}
    </Container>
  );
}
