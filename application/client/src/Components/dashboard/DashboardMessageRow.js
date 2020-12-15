import React from "react";
import "./Dashboard.css";


/**
 * File name: DashboardMessageRow.js
 * Purpose: This simple component is used for populating the rows of message data on a user's unique dashboard. It is
 *          part of a table in DashboardMessages.js and is built there.
 * Author: Trenton
 */

export default function DashboardListingCard(props) {
    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.contact}</td>
            <td>{props.message}</td>
        </tr>
    );
}
