import React from "react";
import { Container } from "react-bootstrap";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard(props) {

  const isAdmin = () => {
    if (props.location.dashProps !== undefined)
      return props.admin === "1" || props.location.dashProps.admin === "1"
    else 
      return props.admin === "1"
  }

  return (
    <Container className="dashboard container" style={{ marginTop: "2rem" }}>
      {props.admin === "1" ? <AdminDashboard user={props.user}/> : <UserDashboard user={props.user}/>}
      {isAdmin() === true ? <AdminDashboard user={props.user}/> : <UserDashboard user={props.user}/>}
    </Container>
  );
}
