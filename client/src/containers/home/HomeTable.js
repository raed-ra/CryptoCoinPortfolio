import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Container, Form, Button, Jumbotron, Table } from 'react-bootstrap'
import axios from "axios";
import Chart from "../../components/Chart"
import styled from 'styled-components';
import API from './../../utils/API'

const Styles = styled.div`
.canvas-container {
    position: relative;
    margin: auto;
    height: 10vh;
    width: 5vw;
  }
    `;


function HomeTable() {

    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const [price, setPrice] = useState({})
    const [variant, setVariant] = useState({})
    const [pageLimit, setPageLimit] = useState(10)

    const ccStreamer = useRef()

    const fetchcoin = async (page, limit) => {
        try {
            let response = await API.hometableCryptoData(page, limit)

            setData(response.data.Data)
            let priceInfo = {};
            response.data.Data.forEach((coin) => {
                priceInfo[coin.CoinInfo.Name] = parseFloat((coin.DISPLAY.USD.PRICE).slice(1));

            })
            setPrice(priceInfo)
            console.log('init', priceInfo)
            console.log(Object.keys(priceInfo).map(coin => `2~Coinbase~${coin}~USD`))

            let subRequest = {
                "action": "SubAdd",
                "subs": Object.keys(priceInfo).map(coin => `2~Coinbase~${coin}~USD`)
            };
            ccStreamer.current.send(JSON.stringify(subRequest));
            ccStreamer.current.onmessage = function onStreamMessage(event) {
                console.log({ event })
                let message = JSON.parse(event.data);
                // console.log(message)
                let priceInfo2 = { ...priceInfo }
                let newVar
                let variant = {}
                let newPrice = "NAN"
                if (message.price !== "") {
                    newPrice = message.PRICE
                    if (priceInfo[message.FROMSYMBOL] !== undefined) {
                        newVar = priceInfo[message.FROMSYMBOL]
                    }
                    variant[message.FROMSYMBOL] = ""
                    if (newVar > parseFloat(newPrice)) {
                        variant[message.FROMSYMBOL] = "table-success"
                    }
                    if (newVar < parseFloat(newPrice)) {
                        variant[message.FROMSYMBOL] = "table-danger"
                    }
                }
                priceInfo2[message.FROMSYMBOL] = newPrice
                setPrice(priceInfo2)
                setVariant(variant)
            }
        } catch (err) {
            if (err.response.status === 401) {
            }
        }
        // return ccStreamer
    }
    // call post api to load all the data in page
    useEffect(() => {
        fetchcoin(page, pageLimit)
    }, [page])

    useEffect(() => {
        let apiKey = "f6c04b8c1b5d332df2dc000cf67455fc99d7ca2d00cc1d33a85e818756a85988";
        ccStreamer.current = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);
        return () => ccStreamer.current.close()
    }, [])

    const onClickForward = () => {
        // click on next page
        setPage(page + 1)
    }

    const onClickBackward = () => {
        // click on next page
        setPage(page - 1)
    }

    // text area
    console.log(data)
    return (
        <Styles>
            <Row>.</Row>
            <Row>
                <Col xs={8}>
                </Col>
                <Col xs={4} >
                    {<Button variant="secondary" type="button" onClick={onClickBackward}>
                        Previous Page
                     </Button>} {" "}
                    {<Button variant="secondary" type="button" onClick={onClickForward}>
                        Next Page >>>
                    </Button>}
                </Col>
            </Row>

            <Table striped bordered hover variant="light">
                <tr></tr>
                <thead>
                    <tr>
                        <th className="align-middle">#</th>
                        <th className="align-middle">Coin</th>
                        <th className="align-middle">Price</th>
                        <th className="align-middle">Market Capital</th>
                        <th className="align-middle">Rating</th>
                        <th className="align-middle">Chart</th>
                        <th className="align-middle">Chg. 24H</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={row.RAW.USD.FROMSYMBOL}>
                            <td className="align-middle">{pageLimit * page + index + 1}</td>
                            <td className="align-middle"><img className="image" width="25" height="15" src={`https://cryptocompare.com${row.RAW.USD.IMAGEURL}`} />{"  " + row.CoinInfo.FullName}</td>
                            {/* <td className="align-middle">{row.DISPLAY.USD.PRICE}</td> */}
                            <td className={`${variant[row.CoinInfo.Name]} align-middle`}>{price[row.CoinInfo.Name]}</td>
                            <td className="align-middle">{row.DISPLAY.USD.MKTCAP}</td>
                            <td className="align-middle">{row.CoinInfo.Rating.Weiss.Rating}</td>
                            <td className="align-middle" className="canvas-container"><Chart index={row.CoinInfo.Internal} /></td>
                            <td className="align-middle">{row.DISPLAY.USD.CHANGEPCT24HOUR}%</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Styles>
    );
}
export default HomeTable;