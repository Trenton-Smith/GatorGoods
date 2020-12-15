import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Searchbox from "../../Searchbox";
import logo from "../../assets/logo.png";
import axios from "axios";
import {
  MdAddCircleOutline,
  MdInfoOutline,
  MdAccountCircle,
} from "react-icons/md";
import { FaHome } from 'react-icons/fa';


/**
 * File name: Navigation.js
 * Purpose: Navigation.js is displayed on every view for the app. It is the primary method of interaction between the
 *          user and the app. It houses not only the searchbar and category links, but it also contains the routing and
 *          function calls for allowing users to register, log in, log out, and access specific views only available to
 *          logged-in users.
 * Author: YG, Trenton (functions) | Joy (styling)
 */

export default function Navigation() {
  // state which is used to hide or display buttons for accessing features that require a user to be logged-in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /*
   Automatically detects if a user is logged in by way of a get request to the database on load. This is what we use to
   conditionally render features.
  */
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("/api/auth/authenticate").then(async (response) => {
      await setIsLoggedIn(response.data.loggedIn);
    });
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  /*
   Should a user log out, this handle will make a get request which adjusts the isLoggedIn state to false. In addition,
   the window will redirect to the home view (in case they logged out on a user page e.g. dashboard).
  */
  const handleLogout = () => {
    axios.get("/api/auth/logout").then(async (response) => {
      await setIsLoggedIn(response.data.loggedIn);
      console.log(isLoggedIn);
      window.location = "/";
    });
  }

  /*
   "{isLoggedIn ? ( ..." below is where we conditionally render the logged-in features for users. On true, the nav
   displays the buttons/links for creating a new listing, navigating to a user's dashboard, and changes the "log in"
   icon to purple, indicating a user is now logged in. Additionally, it changes the latter's functionality to "log out"
   on further clicks.
  */
  return (
    <div>
      <Navbar expand="lg" className="navigation-bar" variant="light" style={{width: '100%' }}>
          <Navbar.Brand style={{ marginLeft: "2rem" }} href="/">
            <img src={logo} width="180" height="50" alt="logo" />
          </Navbar.Brand>
          <Nav.Link style={{ marginRight: "2rem", marginTop: "-10px" }} href="/about">
            <OverlayTrigger
                key="bottom"
                placement="bottom"
                overlay={<Tooltip>About Team</Tooltip>}
            >
              <MdInfoOutline size="2rem" style={{ color: "grey" }} />
            </OverlayTrigger>
          </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav.Item style={{ marginTop: "5px"}}>
            <Searchbox />
          </Nav.Item>
          {isLoggedIn ? (
            <Nav className="ml-auto">
              <span></span>
              <Nav.Link style={{ marginRight: "1rem", marginTop: "-10px" }} href="/newListing">
                <OverlayTrigger
                  key="bottom"
                  placement="bottom"
                  overlay={<Tooltip>Post Item</Tooltip>}
                >
                  <MdAddCircleOutline size="2rem" style={{ color: "grey" }} />
                </OverlayTrigger>
              </Nav.Link>
              <Nav.Link style={{ marginRight: "1rem", marginTop: "-10px" }} href="/dashboard">
                <OverlayTrigger
                  key="bottom"
                  placement="bottom"
                  overlay={<Tooltip>My Dashboard</Tooltip>}
                >
                  <FaHome size="2rem" style={{ color: "grey" }} />
                </OverlayTrigger>
              </Nav.Link>
              <Nav.Link style={{marginRight: "2rem", marginTop: "-10px" }} onClick={handleLogout}>
                <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={<Tooltip>Logout</Tooltip>}
                >
                  <MdAccountCircle size="2rem" style={{ color: "#8943f6" }} />
                </OverlayTrigger>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link style={{marginRight: "2rem", marginTop: "-10px" }} href="/login">
                <OverlayTrigger
                  key="bottom"
                  placement="bottom"
                  overlay={<Tooltip>Log in / Sign up</Tooltip>}
                >
                  <MdAccountCircle size="2rem" color="grey" />
                </OverlayTrigger>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
      <Navbar>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link style={{ marginLeft: "2.7rem", marginRight: "40px", marginTop: "-40px" }} href="./books">
              Books
            </Nav.Link>
            <Nav.Link style={{ marginRight: "40px", marginTop: "-40px" }} href="./furniture">
              Furniture
            </Nav.Link>
            <Nav.Link style={{ marginRight: "40px", marginTop: "-40px" }} href="./electronics">
              Electronics
            </Nav.Link>
            <Nav.Link style={{ marginTop: "-40px" }} href="./other">
              Other
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
