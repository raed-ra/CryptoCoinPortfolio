//const config = require('./app');

const whitelist = [
    // config.appUrl,
    "*",
    "https://crypto-coins-portfolio.herokuapp.com",
    "http://localhost:3000",
    "localhost:3000",
    "https://min-api.cryptocompare.com/data/",
];

module.exports =  {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};