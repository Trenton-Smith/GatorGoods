import React from "react";
import Alert from "react-bootstrap/Alert";

export default function WarningBanner() {
    return (
        <Alert variant="warning" style={{ paddingBottom: "0px", marginBottom: "0px", paddingTop: "10px"}}>
            <p style={{textAlign: "center"}}>
                SFSU Software Engineering Project CSC 648-848, Fall 2020. For Demonstration Only
            </p>
        </Alert>
    );
}
