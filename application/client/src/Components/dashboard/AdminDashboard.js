import React, { useState, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import AdminDashboardListings from "./AdminDashboardListings";

export default function AdminDashboard(props) {
    const [status, setStatus] = useState(false);

    useEffect(() => {}, [status]);

    const refresh = () => {
        setStatus(!status);
    }

    return (
        <>
            <h3>Admin Dashboard</h3>
            <Container style={{ paddingTop: "2rem" }}>
                <Tabs
                    defaultActiveKey="pending"
                    transition={false}
                    id="noanim-tab-example"
                >
                    <Tab eventKey="pending" title="Pending" >
                        <AdminDashboardListings status="pending" refresh={refresh} />
                    </Tab>
                    <Tab eventKey="approved" title="Approved" >
                        <AdminDashboardListings status="approved" refresh={refresh} />
                    </Tab>
                    <Tab eventKey="rejected" title="Rejected" >
                        <AdminDashboardListings status="rejected" refresh={refresh} />
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
}