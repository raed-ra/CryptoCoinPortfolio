const mongoose = require("mongoose");
require('dotenv').config()

// Connect to the Mongo DB

function connectDb(){
    mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/crypto",
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            // useUnifiedTopology: true,
            useFindAndModify: false
        }
    );
}

module.exports = connectDb;