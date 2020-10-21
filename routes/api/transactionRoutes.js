const express = require("express");
const db = require("../../models");
const router = express.Router();


router.get("/transactions/addcoin", (req, res) => {
    db.Transaction.find({ user_id: req.user.id }).then((results) => {
        res.json({
            data: results,
        })
    })
});



router.patch("/transactions/edtcoin", async (req, res) => {
        // console.log(req.body)
        try {
            // let query = {
            //     user_id: req.user.id,
            //     coin: req.body.coin
            // }
            let update = {
                coin: req.body.coin,
                quantity: parseFloat(req.body.quantity),
                buyPrice: parseFloat(req.body.buyPrice),
                currency: req.body.currency,
                startDate: req.body.startDate
            }
            const transaction = await db.Transaction.findByIdAndUpdate(req.body.id, update)
            console.log(transaction)
            // Setup stuff
            let query = {
                user_id: req.user.id,
                coin: req.body.coin
            }
            let newHolding = {
                coin: req.body.coin,
                currency: req.body.currency,
                user_id: req.user.id,
                holding_quantity_current: parseFloat(req.body.quantity),
                holding_average_cost: parseFloat(req.body.buyPrice)
            }
            // console.log(parseFloat(req.body.quantity))
            // console.log(newHolding)
            // Find the document
            const holding = await db.Holding.findOne(query);
            console.log(holding)
            if (!holding) {
                console.log('we are here')
                holding = await db.Holding.create(newHolding)
                console.log(holding)
            } else {
                console.log("1" + holding.holding_quantity_current)
                console.log("2" + req.body.quantity)
                console.log("3" + holding.holding_average_cost)
                console.log("4" + req.body.buyPrice)


                holding_quantity_current = parseFloat(holding.holding_quantity_current) + parseFloat(req.body.changeQuantity);
                holding_average_cost = ((parseFloat(holding.holding_average_cost) * parseFloat(holding.holding_quantity_current)) +
                    (parseFloat(req.body.changeSellPrice) * parseFloat(req.body.changeQuantity))) / holding_quantity_current
                newHoldingUpdated = {
                    holding_quantity_current: parseFloat(holding_quantity_current),
                    holding_average_cost: parseFloat(holding_average_cost),
                }
                console.log("we are there after")
                console.log(query)
                console.log(newHoldingUpdated)
                let option = { new: true, runValidators: true }
                console.log(option)
                holding = await db.Holding.findOneAndUpdate(query, newHoldingUpdated, option)
            }
            console.log(holding)
            return res.json(holding)
        } catch (err) {
            return res.json(err);
        }
    });

router.post("/transactions/addcoin", async (req, res) => {
    // console.log(req.body)
    try {
        const transaction = await db.Transaction.create({
            coin: req.body.coin,
            quantity: parseFloat(req.body.quantity),
            user_id: req.user.id,
            buyPrice: parseFloat(req.body.buyPrice),
            currency: req.body.currency,
            startDate: req.body.startDate
        })
        console.log(transaction)
        // Setup stuff
        let query = {
            user_id: req.user.id,
            coin: req.body.coin
        }
        let newHolding = {
            coin: req.body.coin,
            currency: req.body.currency,
            user_id: req.user.id,
            holding_quantity_current: parseFloat(req.body.quantity),
            holding_average_cost: parseFloat(req.body.buyPrice)
        }
        // console.log(parseFloat(req.body.quantity))
        // console.log(newHolding)
        // Find the document
        const holding = await db.Holding.findOne(query);
        console.log(holding)
        if (!holding) {
            console.log('we are here')
            holding = await db.Holding.create(newHolding)
            console.log(holding)
        } else {
            console.log("1" + holding.holding_quantity_current)
            console.log("2" + req.body.quantity)
            console.log("3" + holding.holding_average_cost)
            console.log("4" + req.body.buyPrice)


            holding_quantity_current = parseFloat(holding.holding_quantity_current) + parseFloat(req.body.quantity);
            holding_average_cost = ((parseFloat(holding.holding_average_cost) * parseFloat(holding.holding_quantity_current)) +
                (parseFloat(req.body.buyPrice) * parseFloat(req.body.quantity))) / holding_quantity_current
            newHoldingUpdated = {
                holding_quantity_current: parseFloat(holding_quantity_current),
                holding_average_cost: parseFloat(holding_average_cost),
            }
            console.log("we are there after")
            console.log(query)
            console.log(newHoldingUpdated)
            let option = { new: true, runValidators: true }
            console.log(option)
            holding = await db.Holding.findOneAndUpdate(query, newHoldingUpdated, option)

        }
        console.log(holding)
        return res.json(holding)
    } catch (err) {
        return res.json(err)
    }
});


// router.patch("/holding/:id", ({ body, params }, res) => {
//     db.Holding.findByIdAndUpdate(
//         params.id,
//         {
//             $set: { "holding_current": name },
//             $push: { "holding_history": body.transaction }
//         },
//         { new: true, runValidators: true }
//     ).then((updated) => {
//         res.json({
//             data: updated,
//         });
//     });
// });


// router.delete("/holding/:id", (req, res) => {
//     db.Holding.findByIdAndDelete(req.params.id).then((deleted) => {
//         res.json({
//             data: true,
//         });
//     });
// });


module.exports = router
