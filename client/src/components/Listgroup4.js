import React from "react";
import { Card, ListGroup } from "react-bootstrap";

import Listgroup2 from "../components/Listgroup2";

const Listgroup4 = props => {
    console.log(props.Title3)
    let allData = {...props.Data}
    console.log(allData.maxPortfolioValue);

    return (

        <ListGroup variant="flush" style={{ width: "14rem" }}>
            <ListGroup.Item><Listgroup2 Title={props.Title1} Data={allData.maxPortfolioValue} /></ListGroup.Item>
            <ListGroup.Item><Listgroup2 Title={props.Title2} Data={allData.mostProfitableCoin}/></ListGroup.Item>
            <ListGroup.Item><Listgroup2 Title={props.Title3} Data={allData.BestCoin}/></ListGroup.Item>
        </ListGroup>

    );
};
export default Listgroup4
//maxPortfolioValue, mostProfitableCoin, BestCoin, mostProfitableCoinEver  Data={props.Data}