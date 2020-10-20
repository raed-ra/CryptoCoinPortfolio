import React, { useState, useEffect } from "react";
import DashboardTable from "../../components/DashboardTable.jsx"
import API from './../../utils/API'


function HoldingTable(props) {

    const [holding, setHolding] = useState([])


    const fetchCryptoLogoPrice = async (coin, currency) => {
        try {
            let response = await API.portfolioHoldingOnePrice(coin,currency)
            // console.log(response)
            // console.log(response.data.RAW[coin][currency].PRICE)
            // console.log(response.data.RAW[coin][currency].IMAGEURL)
            let filteredResponse = { "currentPrice": response.data.RAW[coin][currency].PRICE, "imageURL": response.data.RAW[coin][currency].IMAGEURL }
            // console.log(filteredResponse)
            return filteredResponse
        } catch (err) {
            console.log("there is an error here")
            if (err.response === 401) {
                console.log(err.response)
            }
        }
    }


    const fetchcoinDatabase = async () => { 
        try {
            let response = await API.portfolioHoldingsDatabase()
            // console.log(response.data.data)
            let holdingListp1 = response.data.data
            // console.log(holdingListp1)

            const anAsyncFunction = async (coin) => {
                let holdingListp2 = await fetchCryptoLogoPrice(coin.coin, coin.currency)
                let rawData = { ...coin, ...holdingListp2 }
                let initialCost = (rawData.holding_quantity_current * rawData.holding_quantity_current).toFixed(2);
                let totalValue = (rawData.currentPrice * rawData.holding_quantity_current).toFixed(2);
                let profitLoss = (totalValue - initialCost).toFixed(2);
                let change = ((profitLoss / initialCost) * 100).toFixed(0);
                return { ...coin, ...holdingListp2, initialCost, totalValue, profitLoss, change }
            }

            const getData = async holdingListp1 => {
                return Promise.all(holdingListp1.map(coin => anAsyncFunction(coin)))
            }

            getData(holdingListp1).then(data => {
                console.log(data)
                setHolding(data)
            })

        } catch (err) {
            if (err.response.status === 401) {
            }
        }
    }


    // call post api to load all the data in page
    useEffect(() => {
        fetchcoinDatabase()
    }, [])

    console.log(holding)
    return (
        <>
            <DashboardTable data={holding} {...props} />
        </>
    );
}
export default HoldingTable;