// const express = require("express");
// const session = require("express-session");
// const bodyParser = require("body-parser"); // form data
// const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");
// const cors = require("cors");
// //const corsConfig = require('./config/cors');
// const passport = require("passport");
// //const connectDb = require("./config/database");

// const MongoStore = require("connect-mongo")(session);
// //const routes = require("./routes");
// dotenv.config({ path: ".env" });


// const app = express();

// connectDb();

// // Configure body parsing for AJAX requests
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser(process.env.SESSION_SECRET));

// app.use(cors(corsConfig));

// const PORT = process.env.PORT || 3001;

// // Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }


// app.use(
//   session({
//       resave: true,
//       saveUninitialized: true,
//       secret: process.env.SESSION_SECRET,
//       cookie: {
//           secure: false, // not using https
//           maxAge: 1209600000,
//       }, // two weeks in milliseconds
//       store: new MongoStore({
//           url: process.env.MONGODB_URI,
//           autoReconnect: true,
//       }),
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// // Define API routes here
// //app.use('/api',  routes);

// // Send every other request to the React app
// // Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`🌎 ==> API server now on port ${PORT}!`);
// });

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsConfig = require('./config/cors');
const passport = require("passport");
const connectDb = require("./config/config");
const MongoStore = require("connect-mongo")(session);
// const routes = require("./routes/router");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

connectDb();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(cors(corsConfig));
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

// Define API routes here
// app.use('/api',  routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
