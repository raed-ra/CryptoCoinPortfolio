const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
    {
        coin: { type: String, rquired: true },
        quantity: { type: Number, required: true },
        user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
        buyPrice: { type: Number, required: true },
        currency: { type: String, required: true },
        startDate: {
            type: Date,
            default: () => new Date()
        }

    },

    {
        timestamps: true,
        toJSON: {
            virtuals: true, // to include virtual properties in json response
        }
    }
);

// we want to load the user resource in a virtual field
// to be populated later on
transactionSchema.virtual('user', {
    ref: "User",
    localField: 'user_id',
    foreignField: '_id',
    justOne: true
})


const Transaction = mongoose.model("Transactions", transactionSchema);
module.exports = Transaction;

// few relation (embbed) 

// array of Object ID (quite a bit)

// Reference ( A LOT )  -- more robust
