import React, { useState, useEffect } from "react";
import { Modal, Button, Col, Row, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";


/**
 * File name: AuthModal.js
 * Purpose: AuthModal.js is accessed through Navigation.js and contains the routing and functions for registering new
 *          users, or logging in existing users.
 * Author: YG, Trenton (functions) | Joy (styling)
 * Notes: Currently, this modal is copied in Navigation.js (without history and useEffect) which is against best practice; however, there were issues
 *        with passing state to the component when imported, so for now that method works. In the future, the modal
 *        should be imported.
 */

export default function AuthModal() {
  const [modalShow, setModalShow] = useState(false); // state for showing / hiding modal

  /*
   useHistory and useEffect are the only two pieces of AuthModal not copied into Navigation.js. This is because Navigation
   handles state differently, and because useEffect is used during initial load - meaning that this modal would populate
   on every load if brought into Navigation.
  */
  const history = useHistory();
  useEffect(() => {
    setModalShow(true);
  }, []);

  /*
   State and update functions for validating / submitting user data into the db
  */
  const initialInputState = {
    username: "",
    email: "",
    password: "",
    passwordCheck: "",
    loginEmail: "",
    loginPassword: ""
  };
  const [eachEntry, setEachEntry] = useState(initialInputState);
  const {
    loginEmail,
    loginPassword,
    username,
    email,
    password,
    passwordCheck
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
      alert("Please enter a username between 1 - 20 characters long.")
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
    } else { // user data has passed all previous checks - proceed with attempted entry into the database
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
            window.location.reload()
                .then(alert("Welcome " + username + "! You're registered and already logged in! Go Gators!"));
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
          history.push("/"); // this is not copied into Navigation.js, but is applicable here as AuthModal.js handles
                             // ...authentication in a unique view
          window.location.reload();
        }
        console.log(`LOGIN AUTHMODAL => ${JSON.stringify(response.data)}`);
      });
  };

  return (
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
          Please login or join us to continue our service!
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
          {/*   Log In    */}
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

          {/*   Sign Up    */}
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
                  placeholder="Enter email"
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
                <small id="passwordHelpBlock" className="form-text text-muted">
                  Your password must be 8-20 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
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
                  onClick={()=>{
                      if(terms === false) {
                          setTerms(true)
                      } else if (terms === true){
                          setTerms(false)
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
  );
}

/*
 Legacy implementation for reference
*/
// export default function LazyModal() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Login | Signup
//       </Button>

//       <AuthModal show={modalShow} onHide={() => setModalShow(false)} />
//     </>
//   );
// }
