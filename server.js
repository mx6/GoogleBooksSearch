const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3333;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

mongoose.connect("mongodb://localhost/reactreadinglist", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
const db = mongoose.connection; //create db variable
db.on("error", console.error.bind(console, "Connection error:")); //if any error occurs


// Start the API server
// app.listen(PORT, function() {
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });

db.once("open", function () {
  console.log("Connected to MongoDB");
  app.listen(PORT, function () {
    console.log(`App running on port http://localhost:${PORT}`);
  });
})
