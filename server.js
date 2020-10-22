const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const corsConfig = require('./config/cors');
const passport = require("passport");
const connectDb = require("./config/config");
const MongoStore = require("connect-mongo")(session);
const routes = require("./routes/router");
dotenv.config({ path: ".env" });
const path = require("path");
const PORT = process.env.PORT || 3001;
const compression = require('compression')
const app = express();

//use compression 
app.use(compression({}))

connectDb();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.SESSION_SECRET));



// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(
  session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      cookie: {
          secure: false, // not using https
          maxAge: 1209600000,
      }, // two weeks in milliseconds
      store: new MongoStore({
          url: process.env.MONGODB_URI,
          autoReconnect: true,
      }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
// app.get('*', cors(corsOptions), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for only example.com.'})
// })

// Define API routes here
app.use('/api',  routes);



// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
