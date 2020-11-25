import React, { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import DashboardListings from "./DashboardListings";
import DashboardMessages from "./DashboardMessages";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard(props) {
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
    <Container className="dashboard container" style={{ marginTop: "2rem" }}>
      {props.admin == "1" ? <AdminDashboard /> : <UserDashboard />}
    </Container>
  );
}
