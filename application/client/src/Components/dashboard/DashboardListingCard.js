import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Modal } from "react-bootstrap";
import "./Dashboard.css";

export default function DashboardListingCard() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Card style={{ width: '18rem' }} className="dashboard-listing-card">    
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                    <Card.Title>Ikea Lamp</Card.Title>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Card.Text>
                    <Row className="justify-content-lg-center">
                        <Col lg="4">
                            <Button variant="btn btn-outline-secondary" href="/newListing">Edit</Button>
                        </Col>
                        <Col lg="4">
                            <Button variant="secondary" onClick={handleShow}>Delete</Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Delete a Listing</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>After deleting, it will not be visible to anyone including yourself. Are you sure you want to delete it?</Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Delete
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Published on Oct 15, 2020</small>
                </Card.Footer>
            </Card>
        </div>
    )
}
