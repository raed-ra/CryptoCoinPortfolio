
import React, { useState, useEffect } from "react";

// import { Button } from 'react-native-elements';

import axios from "axios";
import ModalEditSellCoin from "../../components/ModalEditSellCoin"
import DashboardTable from "../../components/DashboardTable.jsx"



function PortfolioTable(props) {

    // const [modalShow, setModalShow] = useState(false);
    const [transaction, setTransaction] = useState([])
    const [currentTransaction, setCurrentTransaction] = useState(0)

    const submitted = () => {
        fetchcoinDatabase()
        setCurrentTransaction(false)
    }

    const fetchCryptoLogoPrice = async (coin, currency) => {
        try {
            let response = await axios.get('http://localhost:3001/api/cryptocompare/oneprice?coin=' + String(coin) + '&currency=' + String(currency), {
                withCredentials: true,
            })
            // console.log(response)
            // console.log(response.data.RAW[coin][currency].PRICE)
            // console.log(response.data.RAW[coin][currency].IMAGEURL)
            let filteredResponse = { "currentPrice": response.data.RAW[coin][currency].PRICE, "imageURL": response.data.RAW[coin][currency].IMAGEURL }
            // console.log(filteredResponse)
            return filteredResponse
        } catch (err) {
            //console.log("there is an error here")
            if (err.response === 401) {
                console.log(err.response)
            }
        }
    }


    const fetchcoinDatabase = async () => {
        try {
            let response = await axios.get('http://localhost:3001/api/transactions/addcoin', {
                withCredentials: true,
            })
            console.log(response.data.data)
            let transactionListp1 = response.data.data
            // console.log(transactionListp1)


            const anAsyncFunction = async (coin) => {
                let transactionListp2 = await fetchCryptoLogoPrice(coin.coin, coin.currency)
                let rawData = { ...coin, ...transactionListp2 }
                let initialCost = (rawData.buyPrice * rawData.quantity).toFixed(2);
                let totalValue = (rawData.currentPrice * rawData.quantity).toFixed(2);
                let profitLoss = (totalValue - initialCost).toFixed(2);
                let change = ((profitLoss / initialCost) * 100).toFixed(0);
                return { ...coin, ...transactionListp2, initialCost, totalValue, profitLoss, change }
            }

            const getData = async transactionListp1 => {
                return Promise.all(transactionListp1.map(coin => anAsyncFunction(coin)))
            }

            getData(transactionListp1).then(data => {
                console.log(data)
                setTransaction(data)
            })
        } catch (err) {
            if (err.response.status === 401) {
            }
        }
    }


    // call post api to load all the data in page
    useEffect( () => {
        fetchcoinDatabase()
    }, [])

    console.log(currentTransaction)
    return (
        <>
            <ModalEditSellCoin submitted={submitted} show={!!currentTransaction} data={transaction.filter(transaction=>transaction._id===currentTransaction)} onHide={() => setCurrentTransaction()} />
            <DashboardTable data={transaction} onRowEdit={(row) => setCurrentTransaction(row._id)} {...props}/>
        </>
    );
}
export default PortfolioTable;