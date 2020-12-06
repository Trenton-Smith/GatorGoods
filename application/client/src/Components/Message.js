

<Modal
show={show}
onHide={handleClose}
backdrop="static"
keyboard={false}
>
<Modal.Header closeButton>
  <Modal.Title>Contact seller</Modal.Title>
</Modal.Header>
<Modal.Body>
  <Form>
    <Form.Group controlId="formProductName">
      <Form.Label>What are you interested in?</Form.Label>
      <Form.Control
        type="product name"
        placeholder="Enter the name of the product"
      />
    </Form.Group>
    <Form.Group controlId="formContact">
      <Form.Label>How do like to be reached out?</Form.Label>
      <Form.Control
        type="contact"
        placeholder="Enter your email or phone number"
      />
    </Form.Group>
    <Form.Group controlId="formMessage">
      <Form.Label>Message</Form.Label>
      <Form.Control as="textarea" rows={4} />
    </Form.Group>
  </Form>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Close
  </Button>
  <Button variant="primary">Send Message</Button>
</Modal.Footer>
</Modal>