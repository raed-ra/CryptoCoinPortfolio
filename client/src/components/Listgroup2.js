import React from "react";
import { Card, ListGroup } from "react-bootstrap";


const Listgroup2 = ({ Title, Data }) => {

    
    let outputData
    if (typeof Data == 'number') {
        console.log('line 8 = ' + Data);
        outputData = Math.round( Data * 1e2 ) / 1e2
        outputData = "$" + outputData.toLocaleString();
        console.log('line 10 = ' + outputData);
    } else {
        outputData = Data
        console.log('line 13 = ' + outputData);
    }
    return (

        <ListGroup variant="flush" >
            <ListGroup.Item>{Title}</ListGroup.Item>
            <ListGroup.Item>{outputData}</ListGroup.Item>
        </ListGroup>
    );
};
export default Listgroup2