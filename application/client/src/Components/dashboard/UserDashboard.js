import React, { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import DashboardListings from "./DashboardListings";
import DashboardMessages from "./DashboardMessages";
import axios from "axios";

/**
 * File name: UserDashboard.js
 * Purpose: This is the dashboard view for users. It is unique to each user, and offers the ability for users to view,
 *          delete, or edit (not currently implemented) their listings. It also offers a table for easy viewing of
 *          interested parties' messages. This view is locked behind a validation check, ensuring that users who are
 *          not logged in cannot access it.
 * Author: Trenton (functions) | Joy (styling)
 */

export default function UserDashboard(props) {
  /*
     State and associated method for updating the state in order to render the users' emails on their unique dashboard
     view. It is called automatically prior to user interaction with the view.
    */
  const [email, setEmail] = useState([]);
  useEffect(() => {
    axios
      .post("/api/dashboard/getMyEmail", {
        user_id: props.user,
      })
      .then(async (res) => {
        // this is somewhat redundant as only 1 email is linked per user; however, it works - will change...
        // later if a better method is found
        for (const k of res.data.values()) {
          console.log(k.email);
          setEmail(k.email);
        }
      });
  }, [props]);
  
  return (
      <>
        <h3>
          My Dashboard &ensp;&ensp;{" "}
          <span
            style={{ color: "#6f42c1", fontSize: "1rem", fontWeight: "bolder" }}
          >
            Account: {email}
          </span>
        </h3>
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