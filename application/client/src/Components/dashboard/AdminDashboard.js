import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import AdminDashboardListings from "./AdminDashboardListings";

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

export default function AdminDashboard(props) {

    const forceUpdate = useForceUpdate();

  return ( 
      <>
        <h3>Admin Dashboard</h3>
        <Container style={{ paddingTop: "2rem" }}>
            <Tabs
                defaultActiveKey="pending"
                transition={false}
                id="noanim-tab-example"
            >
                <Tab eventKey="pending" title="Pending" onClick={forceUpdate}>
                    <AdminDashboardListings status="pending"/>
                </Tab>
                <Tab eventKey="approved" title="Approved" onClick={forceUpdate}>
                    <AdminDashboardListings status="approved"/>
                </Tab>
                <Tab eventKey="rejected" title="Rejected" onClick={forceUpdate}>
                    <AdminDashboardListings status="rejected"/>
                </Tab>
            </Tabs>
        </Container>
      </>
  );
}