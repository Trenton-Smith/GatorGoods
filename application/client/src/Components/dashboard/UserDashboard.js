import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import DashboardListings from "./DashboardListings";
import DashboardMessages from "./DashboardMessages";

export default function UserDashboard(props) {
  
  return (
      <>
        <h3>My Dashboard</h3>
        <Container style={{ paddingTop: "2rem" }}>
            <Tabs
                defaultActiveKey="listings"
                transition={false}
                id="noanim-tab-example"
            >
                <Tab eventKey="listings" title="Listings">
                <DashboardListings user={props.user} />
                </Tab>
                <Tab eventKey="messages" title="Messages">
                <DashboardMessages user={props.user} />
                </Tab>
            </Tabs>
        </Container>
      </>
  );
}