import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, ToggleButtonGroup, ToggleButton, ButtonGroup } from "react-bootstrap";
import { withRouter } from "react-router";
import './style/PortfolioDashboard.css'
import DroppdownMenu from "../../../components/DropdownMenu"
import Listgroup2 from "../../../components/Listgroup2"
import Listgroup3 from "../../../components/Listgroup3"
import Listgroup4 from "../../../components/Listgroup4"
import PortfolioChart from "../../../components/PortfolioChart"
import ModalAddCoin from "../../../components/ModalAddCoin"
import TransactionTable from "../../../containers/Portfolio/TransactionTable"
import HoldingTable from "../../../containers/Portfolio/HoldingTable"
import { useCryptoContext } from '../../../utils/GlobalStore'


import axios from "axios";
import { stringify } from "querystring";
import API from "../../../utils/API";

const Dash = props => {
    const [modalShow, setModalShow] = useState(false);
    const [tableType, setTableType] = useState('transaction');
    const [coinForChart, setCoinForChart] = useState('all');
    const [holdings, setHolding] = useState();
    const [totalValueOfHoldings, setTotalValueOfHoldings] = useState()
    const [profitLoss, setProfitLoss] = useState()
    const [acquisitionCost, setAcquisitionCost] = useState()
    const [portfolioChange, setPortfolioChange] = useState()
    const {state, dispatch} = useCryptoContext();
    

    const tableOpts = [
        { name: 'Transaction', value: 'transaction' },
        { name: 'Holding', value: 'holding' },
    ];

    const submitted = () => {
        setModalShow(false)
        window.location.reload(true)
    }


    const chartSelectCoin = (coinSelect) => {
        setCoinForChart(coinSelect.coin)
        console.log(coinForChart)
    }

    const getHoldings = async () => {
        try {
            let response = await API.componentPortfolioChartHolding()
            // console.log(response.data.data)
            let holdingList = response.data.data
            console.log(holdingList)
            setHolding(holdingList)
            totalHolding(holdingList)
        } catch (err) {
            if (err) {
                console.log(err)
            }
        }
    }

    const totalHolding = async (holdingList) => {
        let totalHoldingArray = await holdingList.map(holding => holding.holding_quantity_current)
        console.log(totalHoldingArray)
        let totalHoldingCoinCost = await holdingList.map(holding => holding.holding_quantity_current * holding.holding_average_cost)
        console.log(totalHoldingCoinCost)
        let listOfCryptos = await holdingList.map(holding => holding.coin)
        let stringifyListOfCryptos = listOfCryptos.toString()
        console.log(stringifyListOfCryptos)
        let response = await API.portfolioHoldingOnePrice(stringifyListOfCryptos,"USD")
        console.log(response.data.DISPLAY)
        let listOfPrices = listOfCryptos.map(crypto => {
            console.log(response.data.DISPLAY[crypto]["USD"].PRICE)
            let outString = response.data.DISPLAY[crypto]["USD"].PRICE.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
            console.log(outString)
            return parseFloat(outString)
        })
        console.log(listOfPrices)

        let tValueOfHoldings = 0;
        let listOfProfitArray = []
        let percentageOfChangeForEveryCoin = []
        for (var i = 0; i < totalHoldingArray.length; i++) {
            tValueOfHoldings += totalHoldingArray[i] * listOfPrices[i];
            listOfProfitArray[i] = (totalHoldingArray[i] * listOfPrices[i]) - totalHoldingCoinCost[i]
            percentageOfChangeForEveryCoin[i] = (listOfPrices[i] - holdingList[i].holding_average_cost) / holdingList[i].holding_average_cost
        }
        console.log(tValueOfHoldings)
        console.log(listOfProfitArray)
        console.log(percentageOfChangeForEveryCoin)
        setTotalValueOfHoldings(tValueOfHoldings)

        //------------------------------

        let totalAcquistionCost = 0;
        for (var i = 0; i < totalHoldingArray.length; i++) {
            totalAcquistionCost += totalHoldingArray[i] * totalHoldingCoinCost[i];
        }
        console.log(totalAcquistionCost)
        setAcquisitionCost(totalAcquistionCost)

        //-------------------------------
        setProfitLoss(tValueOfHoldings - totalAcquistionCost)

        //--------------------------------
        setPortfolioChange(((tValueOfHoldings - totalAcquistionCost) * 100 / totalAcquistionCost).toFixed(0))
    }

    useEffect(() => {
        getHoldings()
        setCoinForChart("all")
    }
        , [])

    let individualData = state.items[state.items.length-1]
    console.log(individualData);
    //console.log(state.items.pop());        
    console.log(coinForChart);
    return (

        <Container className='mt-5' >
            <Card >
                <Card >
                    <Button variant="warning" onClick={() => setModalShow(true)}>
                        Coin +
                     </Button>
                </Card>
                <Card className='mt-3' >
                    <Row className='mt-3'>
                        <Col sm={2} style={{ display: 'flex' }}>
                            <DroppdownMenu
                                style={{ display: 'flex' }}
                                size="md"
                            />
                        </Col>
                        <Col sm={3}><Listgroup2 Title={"Acquisition Cost"} Data={acquisitionCost} /></Col>
                        <Col sm={2}><Listgroup2 Title={"Realized P/L"} /></Col>
                        <Col sm={2}><Listgroup2 Title={"Profit / Loss"} Data={profitLoss} /></Col>
                        <Col sm={2}><Listgroup2 Title={"Holdings"} Data={totalValueOfHoldings} /></Col>
                        <Col sm={1}></Col>
                    </Row>
                    <Card className='mt-3'>
                        <Row className='mt-5'>
                            <Col sm={1}></Col>
                            <Col sm={3}>
                                <Listgroup3 Title={"Portfolio Change"} Data={portfolioChange} />
                                <Row><Listgroup4 Title1={"Portfolio MAX"} Title2={"Most Profitable"} Title3={"Best Crypto"} Data={individualData} /></Row>
                            </Col>
                            <Col sm={8}><PortfolioChart index={coinForChart} /></Col>
                            {/* <Col sm={1}></Col> */}
                        </Row>
                    </Card>
                    <Card>
                        <ButtonGroup toggle>
                            {tableOpts.map((opt) => (
                                <ToggleButton
                                    key={opt.value}
                                    type="radio"
                                    variant="secondary"
                                    name="tables"
                                    value={opt.value}
                                    checked={tableType === opt.value}
                                    onChange={(e) => setTableType(e.currentTarget.value)}
                                >
                                    {opt.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Card>
                    <Card>{tableType === "holding" ? <HoldingTable tableType={tableType} chartSelectCoin={chartSelectCoin} /> : <TransactionTable tableType={tableType} chartSelectCoin={chartSelectCoin} />}</Card>
                    <ModalAddCoin submitted={submitted} show={modalShow} onHide={() => setModalShow(false)} />
                </Card>
            </Card>
        </Container>
    );
};
const PortfolioDashboard = withRouter(Dash);
export default PortfolioDashboard