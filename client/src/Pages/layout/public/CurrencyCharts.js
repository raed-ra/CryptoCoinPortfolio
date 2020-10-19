import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import ChartInfoTable from "../../../containers/SingleCurrency/ChartInfoTable";

const CurrencyCharts = (props) => {


    return (
        <>
            <Container fluid style={{paddingRight: 0}}>
                <Row>
                    <Col>
                        <ChartInfoTable />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CurrencyCharts