import React, { useState, useEffect } from "react";
import { Modal, Button, Col, Row, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function AuthModal() {
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setModalShow(true);
  }, []);

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

  /*
    Testing account:
      email: admin@sfsu.edu
      password: Team8Admin
  */

  // ****** Sign Up ****** //
  const handleRegister = (e) => {
    e.preventDefault();
    if (email.includes("sfsu.edu") === false) {
      alert("Email MUST be sfsu email address.");
    } else if (password !== passwordCheck) {
      alert("Passwords do not match. Try again.");
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
    } else {
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
        });
    }
  };

  // ****** Login ****** //
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
          history.push("/");
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
                  {/* <a href="#">forgot your password?</a> */}
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
                  label="Agree to terms and conditions"
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
