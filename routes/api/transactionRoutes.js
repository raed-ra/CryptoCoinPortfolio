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
    console.log(req.body)
    try {
        let query = {
            user_id: req.user.id,
            _id: req.body.id
        }
        let update = {
            coin: req.body.coin,
            quantity: parseFloat(req.body.quantity),
            buyPrice: parseFloat(req.body.sellPrice),
            currency: req.body.currency,
            startDate: req.body.startDate
        }
        let options = { new: true, runValidators: true }
        const transaction = await db.Transaction.findOneAndUpdate(query, update, options)
        // console.log(transaction)
        // return res.json(transaction)
        // Setup stuff
        let query1 = {
            user_id: req.user.id,
            coin: req.body.coin
        }
        let newHolding = {
            coin: req.body.coin,
            currency: req.body.currency,
            user_id: req.user.id,
            holding_quantity_current: parseFloat(req.body.quantity),
            holding_average_cost: parseFloat(req.body.sellPrice)
        }
        // console.log(parseFloat(req.body.quantity))
        // console.log(newHolding)
        // Find the document
        const holding = await db.Holding.findOne(query1);
        console.log(holding)
        let OldQuantityTransaction = parseFloat(req.body.quantity) - parseFloat(req.body.changeQuantity);
        let OldPriceTransaction = parseFloat(req.body.sellPrice) + parseFloat(req.body.changeSellPrice);
        let Num1 = parseFloat(holding.holding_average_cost) * parseFloat(holding.holding_quantity_current);
        console.log(Num1)
        let Num2 = parseFloat(OldQuantityTransaction) * parseFloat(OldPriceTransaction);
        console.log(Num2)
        let Num3 = parseFloat(req.body.sellPrice) * parseFloat(req.body.quantity);
        console.log(Num3)
        console.log("1." + holding.holding_quantity_current)
        console.log("2." + req.body.quantity)
        console.log("3." + holding.holding_average_cost)
        console.log("4." + req.body.sellPrice)
        console.log("5." + req.body.changeQuantity)
        console.log("6." + req.body.changeSellPrice)

        holding_quantity_current = parseFloat(holding.holding_quantity_current) + parseFloat(req.body.changeQuantity);
        console.log(holding_quantity_current);
        holding_average_cost = (Num1 - Num2 + Num3) / holding_quantity_current;
        console.log(holding_average_cost);
        newHoldingUpdated = {
            holding_quantity_current: parseFloat(holding_quantity_current),
            holding_average_cost: parseFloat(holding_average_cost),
        }
        console.log("we are there after")
        console.log(query1)
        console.log(newHoldingUpdated)
        let option = { new: true, runValidators: true }
        console.log(option)
        holding = await db.Holding.findOneAndUpdate(query1, newHoldingUpdated, option)

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


            let holding_quantity_current = parseFloat(holding.holding_quantity_current) + parseFloat(req.body.quantity);
            console.log(holding_quantity_current);
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
