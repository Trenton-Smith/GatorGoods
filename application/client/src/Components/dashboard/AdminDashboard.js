import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import AdminDashboardListings from "./AdminDashboardListings";

export default function AdminDashboard(props) {
  
  return (
      <>
        <h3>Admin Dashboard</h3>
        <Container style={{ paddingTop: "2rem" }}>
            <Tabs
                defaultActiveKey="pending"
                transition={false}
                id="noanim-tab-example"
            >
                <Tab eventKey="pending" title="Pending">
                    <AdminDashboardListings status="pending"/>
                </Tab>
                <Tab eventKey="approved" title="Approved">
                    <AdminDashboardListings status="approved"/>
                </Tab>
                <Tab eventKey="rejected" title="Rejected">
                    <AdminDashboardListings status="rejected"/>
                </Tab>
            </Tabs>
        </Container>
      </>
  );
}