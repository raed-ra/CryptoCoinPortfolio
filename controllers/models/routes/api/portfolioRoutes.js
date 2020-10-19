const express = require("express");
const db = require("./../../models");
const router = express.Router();


router.get("/holding", (req, res) => {
    db.Holding.find({ user_id: req.user.id }).then((results) => {
        res.json({
            data: results,
        })
    })
});


router.post("/holding", (req, res) => {
    db.Holding.create({
        user_id: req.user.id,
        game: req.user.game,
        index: req.body.index,
        holding_current: req.body.holding_current,
        holding_history: [{
            quantity: req.body.quantity,
            price: req.body.price,
        }],
    })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
});

router.patch("/holding/:id", ({ body, params }, res) => {
    db.Holding.findByIdAndUpdate(
        params.id,
        {
            $set: { "holding_current": name },
            $push: { "holding_history": body.transaction }
        },
        { new: true, runValidators: true }
    ).then((updated) => {
        res.json({
            data: updated,
        });
    });
});


router.delete("/holding/:id", (req, res) => {
    db.Holding.findByIdAndDelete(req.params.id).then((deleted) => {
        res.json({
            data: true,
        });
    });
});


module.exports = router
