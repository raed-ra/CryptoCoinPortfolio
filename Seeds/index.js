const connectDb = require('../config/config');
const userSeeder = require('./userSeeder');
// connected to DB
connectDb();

async function seed(){
    // will run all the seeder files

    await userSeeder();
}

seed()

