
const express = require("express");
const axios = require("axios");
require('dotenv').config()
const router = express.Router();
let APIKey = process.env.CRYPTO_API_KEY;

router.get("/cryptocompare/table", async (req, res) => {
    try {
        let limit = 10;
        let page = req.query.page;
        let currency = "USD";

        queryURL = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=" + limit + "&tsym=" + currency + "&page=" + page + "&api_key=" + APIKey;
        const response = await axios(queryURL)
        // console.log("is this running?" + JSON.stringify(response.data))
        return res.json(response.data);
    } catch (err) {
        // console.log(err);
        // console.log(err.response);
        return res.json(err);
    };
})

router.post("/cryptocompare/chart", async (req, res) => {
    try {

        let currency = "USD";
        let limit = 1500;

        let symbol = req.body.index
        console.log(symbol)
        queryURL = "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" + symbol + "&tsym=" + currency + "&limit=" + limit + "&api_key=" + APIKey;
        const response = await axios(queryURL)
        // console.log("is this chart running?" + JSON.stringify(response.data))
        return res.json(response.data);
    } catch (err) {
        // console.log(err);
        // console.log(err.response);
        return res.json(err);
    };
})


router.get("/cryptocompare/news", async (req, res) => {
    try {
        queryURL = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN" + "&api_key=" + APIKey;
        const response = await axios(queryURL)
        //console.log("is this news  running?" + JSON.stringify(response.data))
        return res.json(response.data);
    } catch (err) {
        // console.log(err);
        // console.log(err.response);
        return res.json(err);
    };
})

router.get("/cryptocompare/price", async (req, res) => {
        let currencyUnit = req.query.currency;
        let coin = req.query.coin;
    try {
        queryURL = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + coin + "&tsyms=" + currencyUnit + ",EUR" + "&api_key=" + APIKey;
        const response = await axios(queryURL)
        // console.log("is this news  running?" + JSON.stringify(response.data))
        return res.json(response.data);
    } catch (err) {
        // console.log(err);
        // console.log(err.response);
        return res.json(err);
    };
})

//feeds the portfolio page bottom table
router.get("/cryptocompare/oneprice", async (req, res) => {
    let currencyUnit = req.query.currency;
    let coin = req.query.coin;
    // console.log(currencyUnit)
    // console.log(coin)
try {
    queryURL = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + coin + "&tsyms=" + currencyUnit + "&api_key=" + APIKey;
    const response = await axios(queryURL)
    // console.log("is this oneprice  running?" + JSON.stringify(response.data))
    return res.json(response.data);
} catch (err) {
    // console.log("1-"+err);
    // console.log("2-"+err.response);
    return res.json(err);
};
})


module.exports = router