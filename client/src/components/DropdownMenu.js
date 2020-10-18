import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";


const DropdownMenu = props => {

    return (
        <DropdownButton style={{ display: 'flex', marginLeft: "auto" }} id="dropdown-basic-button" title="Currency">
            <Dropdown.Item href="USD">USD</Dropdown.Item>
            <Dropdown.Item href="EUR">AUD</Dropdown.Item>
        </DropdownButton>

    );
};
export default DropdownMenu