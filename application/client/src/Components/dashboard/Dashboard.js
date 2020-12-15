import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import DashboardListings from "./DashboardListings";
import DashboardMessages from "./DashboardMessages";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard(props) {

  return (
    <Container className="dashboard container" style={{ marginTop: "2rem" }}>
      {props.admin === "1" ? <AdminDashboard user={props.user}/> : <UserDashboard user={props.user}/>}
    </Container>
  );
}
