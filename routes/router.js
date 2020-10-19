const express = require('express');
const auth = require('./api/auth/Auth');
const user = require('./api/userRoutes');
const crypto = require('./api/cryptoRoutes');
const portfolio = require('./api/portfolioRoutes');
const transaction = require('./api/transactionRoutes');
//const game = require('./api/gameRoutes');
const AuthenticatedMiddleware = require("./../config/middleware/isAuthenticated");

const router = express.Router()

// to protect the following routes
router.use(auth);

router.use(AuthenticatedMiddleware)
router.use(user);
router.use(crypto);
router.use(portfolio);
router.use(transaction)
//router.use(game)




module.exports = router;