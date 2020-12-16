import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  OverlayTrigger,
  Tooltip,
  Modal,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import Searchbox from "../../Searchbox";
import logo from "../../assets/logo.png";
import axios from "axios";
import {
  MdAddCircleOutline,
  MdInfoOutline,
  MdAccountCircle,
} from "react-icons/md";
import { FaHome } from "react-icons/fa";

/**
 * File name: Navigation.js
 * Purpose: Navigation.js is displayed on every view for the app. It is the primary method of interaction between the
 *          user and the app. It houses not only the searchbar and category links, but it also contains the routing and
 *          function calls for allowing users to register, log in, log out, and access specific views only available to
 *          logged-in users.
 * Author: YG, Trenton (functions) | Joy (styling)
 * Notes: Currently, the modal is a copy of AuthModal.js (minus history and useEffect) which is against best practice; however, there were issues
 *        with passing state to the component when imported, so for now this method works. In the future, the modal
 *        should be removed from this file and imported.
 */

export default function Navigation() {
  // state which is used to hide or display buttons for accessing features that require a user to be logged-in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [logoutModalShow, setLogoutModalShow] = useState(false);
  const handleLogoutModalClose = () => setLogoutModalShow(false);
  const handleLogoutModalShow = () => setLogoutModalShow(true);

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
  };

  /**
   * Below is the logic related to showing the AuthModal, and logging in existing users or registering new users from
   * that modal. It is a copy of AuthModal.js as noted above, and should be reworked as an import in the future.
   */
  const [modalShow, setModalShow] = useState(false); // state for showing / hiding modal

  /*
   State and update functions for validating / submitting user data into the db
  */
  const initialInputState = {
    username: "",
    email: "",
    password: "",
    passwordCheck: "",
    loginEmail: "",
    loginPassword: "",
  };
  const [eachEntry, setEachEntry] = useState(initialInputState);
  const {
    loginEmail,
    loginPassword,
    username,
    email,
    password,
    passwordCheck,
  } = eachEntry;
  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };

  // state to check if a user has agreed to the ToS - cannot be included in initialInputState in current implementation
  const [terms, setTerms] = useState(false);

  /*
   The logic belows handles registering new users. Prior to post request, it validates the password fields through a
   series of regex' and a match check, then forces a user to accept the ToS before accepting the submission.
   ******* REGISTRATION ********
  */
  const handleRegister = (e) => {
    const letters = /[A-Z]/i;
    const numbers = /[0-9]/;
    const specChars = /[!@#$%^&*/()]/;
    e.preventDefault();
    if (username.length < 1 || username.length > 20) {
      alert("Please enter a username between 1 - 20 characters long.");
    } else if (username.match(specChars)) {
      alert("Username must only contain letters and numbers.");
    } else if (email.includes("sfsu.edu") === false) {
      alert("Email must be sfsu email address.");
    } else if (password !== passwordCheck) {
      alert("Passwords do not match. Try again.");
    } else if (password.length < 8 || password.length > 20) {
      alert("Password must be between 8 - 20 characters long.");
    } else if (!password.match(letters)) {
      alert("Password must contain a letter.");
    } else if (!password.match(numbers)) {
      alert("Password must contain a number.");
    } else if (password.match(specChars)) {
      alert("Password cannot contain special characters.");
    } else if (terms === false) {
      alert("Please indicate that you agree to the Terms and Conditions.");
    } else {
      // user data has passed all previous checks - proceed with attempted entry into the database
      axios
        .post("/api/auth/signup", {
          username: username,
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          alert(response.data.message);
          setModalShow(false);
          window.location
            .reload()
            .then(
              alert(
                "Welcome " +
                  username +
                  "! You're registered and already logged in! Go Gators!"
              )
            );
        });
    }
  };

  /*
   The logic belows handles logging in existing users. On successful connections, it will refresh the page to allow
   user-locked features to populate and/or be accessible.
   ******* LOGIN ********
  */
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/login", {
        email: loginEmail,
        password: loginPassword,
      })
      .then((response) => {
        if (response.data.sucess === false) {
          alert(response.data.message);
        } else {
          console.log("Welcome! You are now logged in");
          setModalShow(false);
          // history.push("/"); // this is not applicable since Navigation is rendered on every view
          window.location.reload();
        }
        console.log(`LOGIN AUTHMODAL => ${JSON.stringify(response.data)}`);
      });
  };

  return (
    <div>
      {/* AUTHENTICATION MODAL - copied from AuthModal.js and needs to be imported in the future */}
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          style={{ marginLeft: "2rem", marginRight: "2rem" }}
          onHide={() => setModalShow(false)}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Please login or register to continue!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            marginLeft: "2rem",
            marginRight: "2rem",
            marginBottom: "2rem",
          }}
        >
          <Row>
            {/* LOGIN EXISTING USERS */}
            <Col className="border-right" style={{ paddingRight: "2.5rem" }}>
              <h4>Login</h4>
              <Form>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="email"
                    name="loginEmail"
                    value={loginEmail}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="loginPassword"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-muted">
                    <a href="#">forgot your password?</a>
                  </Form.Text>
                </Form.Group>
                <div className="text-right">
                  <Button
                    variant="secondary"
                    type="reset"
                    style={{ marginRight: "1rem" }}
                    onClick={() => setModalShow(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" onClick={handleLogin}>
                    Log in
                  </Button>
                </div>
              </Form>
            </Col>

            {/* REGISTER NEW USERS */}
            <Col style={{ paddingLeft: "2.5rem" }}>
              <h4>Register</h4>
              <Form>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-muted">
                    Your username may only contain letters and numbers.
                  </Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter valid SFSU email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleInputChange}
                  />
                  <small
                    id="passwordHelpBlock"
                    className="form-text text-muted"
                  >
                    Your password must be 8-20 characters long, contain letters
                    and numbers, and must not contain spaces, special
                    characters, or emoji.
                  </small>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="passwordCheck"
                    placeholder="Password"
                    value={passwordCheck}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    required
                    type="checkbox"
                    onClick={() => {
                      if (terms === false) {
                        setTerms(true);
                      } else if (terms === true) {
                        setTerms(false);
                      }
                    }}
                    label="Agree to Terms and Conditions"
                    feedback="You must agree before submitting"
                  />
                </Form.Group>
                <div className="text-right">
                  <Button
                    variant="secondary"
                    type="reset"
                    style={{ marginRight: "1rem" }}
                    onClick={() => setModalShow(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleRegister}
                  >
                    Sign up
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* NAVBAR */}
      {/*
      "{isLoggedIn ? ( ..." below is where we conditionally render the logged-in features for users. On true, the nav
      displays the buttons/links for creating a new listing, navigating to a user's dashboard, and changes the "log in"
      icon to purple, indicating a user is now logged in. Additionally, it changes the latter's functionality to "log out"
      on further clicks.
      */}
      <Navbar
        expand="lg"
        className="navigation-bar"
        variant="light"
        style={{ width: "100%" }}
      >
        <Navbar.Brand style={{ marginLeft: "2rem" }} href="/">
          <img src={logo} width="180" height="50" alt="logo" />
        </Navbar.Brand>
        <Nav.Link
          style={{ marginRight: "2rem", marginTop: "-10px" }}
          href="/about"
        >
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
          <Nav.Item style={{ marginTop: "5px" }}>
            <Searchbox />
          </Nav.Item>
          {isLoggedIn ? (
            <Nav className="ml-auto">
              <span></span>
              <Nav.Link
                style={{ marginRight: "1rem", marginTop: "-10px" }}
                href="/newListing"
              >
                <OverlayTrigger
                  key="bottom"
                  placement="bottom"
                  overlay={<Tooltip>Post Item</Tooltip>}
                >
                  <MdAddCircleOutline
                    size="2rem"
                    style={{ color: "#6f42c1" }}
                  />
                </OverlayTrigger>
              </Nav.Link>
              <Nav.Link
                style={{ marginRight: "1rem", marginTop: "-10px" }}
                href="/dashboard"
              >
                <OverlayTrigger
                  key="bottom"
                  placement="bottom"
                  overlay={<Tooltip>My Dashboard</Tooltip>}
                >
                  <FaHome size="2rem" style={{ color: "#6f42c1" }} />
                </OverlayTrigger>
              </Nav.Link>
              <Nav.Link
                style={{ marginRight: "2rem", marginTop: "-10px" }}
                onClick={handleLogoutModalShow}
              >
                <OverlayTrigger
                  key="bottom"
                  placement="bottom"
                  overlay={<Tooltip>Logout</Tooltip>}
                >
                  <MdAccountCircle size="2rem" style={{ color: "#6f42c1" }} />
                </OverlayTrigger>
              </Nav.Link>
              <Modal show={logoutModalShow} onHide={handleLogoutModalClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Log out</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to log out from your GatorGoods account?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleLogoutModalClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleLogout}>
                    Yes, log me out
                  </Button>
                </Modal.Footer>
              </Modal>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link
                style={{ marginRight: "2rem", marginTop: "-10px" }}
                onClick={setModalShow}
              >
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
            <Nav.Link
              style={{
                marginLeft: "2.7rem",
                marginRight: "40px",
                marginTop: "-40px",
              }}
              href="./books"
            >
              Books
            </Nav.Link>
            <Nav.Link
              style={{ marginRight: "40px", marginTop: "-40px" }}
              href="./furniture"
            >
              Furniture
            </Nav.Link>
            <Nav.Link
              style={{ marginRight: "40px", marginTop: "-40px" }}
              href="./electronics"
            >
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
