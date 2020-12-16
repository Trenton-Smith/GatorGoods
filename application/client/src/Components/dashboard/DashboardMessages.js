import React, { useEffect, useState } from "react";
import { Tab, Table, ListGroup, Row, Col, Container } from "react-bootstrap";
import "./Dashboard.css";
import axios from "axios";
import DashboardMessageRow from "./DashboardMessageRow";

/**
 * File name: DashboardMessages.js
 * Purpose: This is used to pull in messages and corresponding data fields into a user's dashboard (should they have
 *          any prospective buyers). It is called in Dashboard.js where the results are returned as a table for easy
 *          viewing. The rows of the table are built by calling another component (DashboardMessageRow.js) which pulls
 *          props from here to populate its fields.
 * Author: Trenton
 */

export default function DashboardMessages(props) {
  /*
     State and method for populating the messages and corresponding data routed through dashboardController.js.
    */
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    axios
      .post("/api/dashboard/getMyOffers", {
        user_id: props.user,
      })
      .then((response) => {
        setOffers(response.data);
      });
  }, [props]);

  console.log(offers);

  /*
     The return below has two versions for formatting. The table is currently implemented per M3 feedback; however, the
     Tab Container is potentially more useful in scenarios where users post longer messages. Ultimately, the styling
     would need to be determined after user feedback and analytics.
    */
  return (
    // -- Table implementation --
    <Container style={{ paddingTop: "2rem" }}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Product Title</th>
            <th>Contact Info</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, i) => (
            <DashboardMessageRow key={i} {...offer} />
          ))}
        </tbody>
      </Table>
    </Container>

    // -- Tab Container implementation --
    // <Tab.Container id="list-group-tabs-example" defaultActiveKey="#offer1">
    //     <Container style={{paddingTop: "2.5rem"}}>
    //         <Row>
    //         <Col lg={3} >
    //             <ListGroup className="list-group list-group-flush">
    //                 <ListGroup.Item action href="#offer1" className="message-list">
    //                     Ikea Lamp · user001
    //                 </ListGroup.Item>
    //                 <ListGroup.Item action href="#offer2" className="message-list" >
    //                     Ikea Lamp · user002
    //                 </ListGroup.Item>
    //                 <ListGroup.Item action href="#offer3" className="message-list" >
    //                     Algorithm CLRS 5th edition (textbook) · user003
    //                 </ListGroup.Item>
    //             </ListGroup>
    //         </Col>
    //         <Col sm={8}>
    //             <Tab.Content>
    //                 <Tab.Pane eventKey="#offer1">
    //                     <h4>Ikea Lamp</h4>
    //                     <p>
    //                         Mauris commodo quis imperdiet massa tincidunt nunc. Id ornare arcu odio ut sem nulla pharetra diam sit. Amet aliquam id diam maecenas ultricies mi eget mauris. Aliquam ultrices sagittis orci a scelerisque purus semper eget duis. Ipsum suspendisse ultrices gravida dictum fusce. Quis blandit turpis cursus in hac habitasse platea dictumst quisque. Fermentum dui faucibus in ornare quam viverra orci sagittis eu. Aliquam id diam maecenas ultricies mi. Varius quam quisque id diam vel quam elementum pulvinar. Quis imperdiet massa tincidunt nunc. Porttitor rhoncus dolor purus non enim praesent. Dignissim enim sit amet venenatis urna cursus eget. Augue ut lectus arcu bibendum at varius.
    //                     </p>
    //                     <p>Contact me: (408)-666-6666</p>
    //                     <p>Sent from: user001</p>
    //                 </Tab.Pane>
    //                 <Tab.Pane eventKey="#offer2">
    //                     <h4>Ikea Lamp</h4>
    //                     <p>
    //                         Cursus sit amet dictum sit amet. Vulputate mi sit amet mauris commodo quis. Amet volutpat consequat mauris nunc. Neque viverra justo nec ultrices dui sapien. Vitae elementum curabitur vitae nunc sed velit dignissim sodales. Donec ultrices tincidunt arcu non. Bibendum ut tristique et egestas quis ipsum. Ut faucibus pulvinar elementum integer enim neque volutpat. Faucibus scelerisque eleifend donec pretium vulputate sapien nec. Iaculis nunc sed augue lacus viverra vitae. Mattis molestie a iaculis at erat pellentesque.
    //                     </p>
    //                     <p>Contact me: user002@gmail.com</p>
    //                     <p>Sent from: user002</p>
    //                 </Tab.Pane>
    //                 <Tab.Pane eventKey="#offer3">
    //                     <h4>Algorithm CLRS 5th edition(textbook)</h4>
    //                     <p>
    //                         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    //                     </p>
    //                     <p>Contact me: (408)-777-7777</p>
    //                     <p>Sent from: user003</p>
    //                 </Tab.Pane>
    //             </Tab.Content>
    //         </Col>
    //         </Row>
    //     </Container>
    // </Tab.Container>
  );
}
