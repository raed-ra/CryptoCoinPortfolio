import React from "react";
import { Card, ListGroup } from "react-bootstrap";


const Listgroup3 = ({Title,Data}) => {

    return (

            <ListGroup variant="flush" >
                <ListGroup.Item>{Title}</ListGroup.Item>
                <ListGroup.Item>%{Data}</ListGroup.Item>
            </ListGroup>


    );
};
export default Listgroup3