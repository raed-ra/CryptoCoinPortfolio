import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../../../containers/home/Sidebar";
import HomeTable from "../../../containers/home/HomeTable";
import './style/Dashboard.css'


const Dash = props => {


    return (
        <>
            <Container fluid style={{paddingRight: 0}}>
                <Row>
                    <Col xs={3} id="sidebar-wrapper">
                        <Sidebar />
                    </Col>
                    <Col xs={9} id="page-content-wrapper">
                        <HomeTable />
                    </Col>
                </Row>

            </Container>
        </>
    );
};
const Dashboard = withRouter(Dash);
export default Dashboard
