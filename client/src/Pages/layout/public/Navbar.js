import React from "react";
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
 .navbar {
   background -color: #222;
 }

 .navbar-brand, .navbar-nav .nav-link {
   color: #bbb;

   &:hover {
     color: black;
   }
 }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand href="#home">Portfolio Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/login">Login/Register</Nav.Link></Nav.Item>
          {/* <Nav.Item><Nav.Link href="/register">Register</Nav.Link></Nav.Item> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)
