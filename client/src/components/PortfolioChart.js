
import React, { useState, useEffect, Component } from "react";
import { Col, Row, Container, Form, Button, Jumbotron, Table } from 'react-bootstrap'
import axios from "axios";
import { Line } from 'react-chartjs-2';
import moment from 'moment'
import 'moment-timezone';
import ChartHighstock from './ChartHighstock.jsx'
import { useCryptoContext } from '../utils/GlobalStore'
import { GET_ITEMS, LOADING } from '../utils/actions'
import API from './../utils/API'


function PortfolioChart(props) {
    const { state, dispatch } = useCryptoContext();
    const [chartData, setChartData] = useState([])
    const [timeData, setTimeData] = useState([])
    const [chartDisplayData, setChartDisplayData] = useState([])

    const fetchCryptoLogoPrice = async (index, currency) => {
        try {
            let response = await API.componentChart(index)
            return response.data.Data
        } catch (err) {
            console.log("there is an error here")
            if (err.response === 401) {
                console.log(err.response)
            }
        }
    }
    const all_portfolio_data_calcs = async () => {
        try {
            let response = await API.componentPortfolioChartHolding()
            // console.log(response.data.data)
            let holdingListp1 = response.data.data
            console.log(holdingListp1)


            const anAsyncFunction = async (coin) => {
                //console.log(coin)
                let holdingListp2 = await fetchCryptoLogoPrice(coin.coin, coin.currency)
                console.log(holdingListp2)
                let historicalValue = holdingListp2.Data.map(item => parseFloat(coin.holding_quantity_current) * parseFloat(item.close))
                // console.log(Math.max(...historicalValue))
                return {
                    finalClosingValue: holdingListp2.Data[holdingListp2.Data.length - 1].close,
                    closingValue: historicalValue,
                    time: holdingListp2.Data.map(obj => obj.time)
                }
            }

            const getData = async holdingListp1 => {
                return Promise.all(holdingListp1.map(coin => anAsyncFunction(coin)))
            }

            let data = await getData(holdingListp1)
            console.log(data) //<<<<<<<-----------
            // setHolding(data)
            console.log(holdingListp1);//<<<<<--------
            const time = data[0].time;
            //let allHoldingsMasterData = data.map((historicalValue, index) => 
            //)
            // let bestCrypto= 0;
            //caculates the maximum holding value for each coin
            let maxProfitForEachCoin = new Array()
            let mostProfitableArray = new Array()
            let bestCryptoCoinArray = new Array()
            for (let i = 0; i < data.length; i++) {
                data[i].maxReach = Math.max(...data[i].closingValue)
                data[i] = { ...data[i], ...holdingListp1[i] }
                let profitLossArray = new Array(data[i].closingValue.length).fill(data[i].holding_average_cost)
                data[i].profitLossValue = data[i].closingValue.map((item, index) => {
                    return item - profitLossArray[index]
                })
                maxProfitForEachCoin.push(Math.max(...data[i].profitLossValue))
                bestCryptoCoinArray.push(data[i].finalClosingValue - data[i].holding_average_cost)
                mostProfitableArray.push(data[i].profitLossValue[data[i].profitLossValue.length - 1])
            }
            let mostProfitableCoin = data[mostProfitableArray.indexOf(Math.max(...mostProfitableArray))].coin
            console.log((Math.max(...mostProfitableArray)));
            console.log(mostProfitableCoin);
            let BestCoin = data[bestCryptoCoinArray.indexOf(Math.max(...bestCryptoCoinArray))].coin
            console.log(Math.max(...bestCryptoCoinArray));
            console.log(BestCoin);
            let mostProfitableCoinEver = data[maxProfitForEachCoin.indexOf(Math.max(...maxProfitForEachCoin))].coin
            console.log(mostProfitableCoinEver);
            let totalHistoricalData = new Array(data[0].closingValue.length).fill(0)
            // total.map(item => )

            //Adds up holding value of each coin and puts that in an array
            totalHistoricalData = totalHistoricalData.map((_, index) => {
                let total = 0;
                for (let i = 0; i < data.length; i++) {
                    total += data[i].closingValue[index];
                }
                return total;
            }
            )
            data.push(totalHistoricalData)
            //calculates the maximum of total value of total portfolio
            let maxPortfolioValue = Math.max(...totalHistoricalData)
            console.log(maxPortfolioValue)   //<<<<<--------
            let totalData = { maxPortfolioValue, mostProfitableCoin, BestCoin, mostProfitableCoinEver, maxPortfolioValue }
            data.push(totalData)
            console.log(totalData);
            console.log(data); //<<<<<<<-----------
            dispatch({
                type: GET_ITEMS,
                items: data
            });
            setTimeData(time)
            chooseData(data, time)
        } catch (err) {
            console.log(err);
            // if (err.response.status === 401) {
            // }
        }
    }
    const chooseData = async (data, time) => {
        console.log(props.index);
        if (props.index === 'all') {
            await prep_for_graph_data_function(data[data.length - 2], time);
        } else {
            let splicedData = [...data];
            splicedData.splice(splicedData.length-2)
            let chosen_array = splicedData.filter(dataObj => dataObj.coin === props.index)
            console.log(chosen_array);
            await prep_for_graph_data_function(chosen_array[0].closingValue, time);
        }
    }

    const prep_for_graph_data_function = (totalHistoricalData, time) => {
        let hobstock_data = [];
        //console.log(totalHistoricalData)
        for (let i = 0; i < time.length; i++) {
            // console.log(time[i] ,moment(time[i]).format())
            hobstock_data.push({
                'Date': moment.unix(time[i]).format("DD/MM/YY"),
                'Close': totalHistoricalData[i]
            })
        }
        console.log(hobstock_data)
        let chartdata = hobstock_data.reverse()
        setChartDisplayData(chartdata)
    }

    useEffect(() => {
        // console.log(props.index);
        // setChosenIndex(props.index)
        if (props.index === 'all') {
            all_portfolio_data_calcs();
        } else {
            chooseData(state.items, timeData);
        }
    }, [props.index])

    return (
        <ChartHighstock data={chartDisplayData} title={"Portfolio Historical Status"} />
    );
}
export default PortfolioChart;