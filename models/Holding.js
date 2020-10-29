const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const holdingSchema = new Schema(
    {
        coin: { type: String, required: true },
        currency: { type: String, required: true },
        user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
        holding_quantity_current: { type: Number, required: true},
        holding_average_cost: { type: Number, required: true}, 
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
holdingSchema.virtual('user', {
    ref: "User",
    localField: 'user_id',
    foreignField: '_id',
    justOne: true
})


const Holding = mongoose.model("Holdings", holdingSchema);
module.exports = Holding;

// few relation (embbed) 

// array of Object ID (quite a bit)

// Reference ( A LOT )  -- more robust
