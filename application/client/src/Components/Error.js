import React, { useEffect, useState } from "react";
import {
    Container,
    Col,
    Row,
    DropdownButton,
    Dropdown,
    CardColumns,
} from "react-bootstrap";
import "./Category.css"


export default function Error() {



    return (
        <div>
            {/*<Featured />*/}
            <Container style={{ marginTop: "2rem" }}>
                <Col>
                    <Row>
                        <Col style={{ textAlign: "center" }}>
                            <h1>Error 404</h1>
                            <p>The url you are looking for is not valid!</p>
                        </Col>
                    </Row>
                </Col>

            </Container>
        </div>
    );
}