import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import API from './../../../utils/API'

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



export const NavigationBar = () => {

  const history = useHistory();
  const [errors, setErrors] = useState([]);

  const logout = async (event) => {
    event.preventDefault();
    // call api to login
    try {
      const response = await API.logout()
      history.push("/");
    } catch (err) {
      // not authenticated
      console.log(err.response);
      if (err.response.data.errors) {
        const errorMsg = err.response.data.errors.map(
          (err) => err.msg
        );
        // failed to register
        setErrors([...errorMsg]);
      } else {
        setErrors(['error in log out']);
      }
    };
  };

  return (
    <Styles>
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="#home">Portfolio Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>

            <Nav.Item><Nav.Link onClick={logout}>Logout</Nav.Link></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  )
}