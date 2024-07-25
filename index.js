const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
var cors = require('cors')

require("dotenv").config();

const app = express();

const bodyParser = require("body-parser");

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

const port = process.env.PORT || 9000;

app.use("/Public", express.static(path.join(__dirname, "Public")));


// Connect to MongoDB
mongoose.connect(process.env.DBURL);

// Check connection status
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
  process.exit(0);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});


const UserRouter = require('./src/Routes/users')
const TradeContriRouter = require('./src/Routes/tradecontri')
const StallRouter = require('./src/Routes/stall')
const HallsRouter = require('./src/Routes/halls')
const EventsRouter = require('./src/Routes/event')
const AdminRouter = require('./src/Routes/admin')










app.use("/user", UserRouter);
app.use("/trade", TradeContriRouter);
app.use("/stall", StallRouter);

app.use('/hall', HallsRouter)

app.use('/events', EventsRouter)

app.use('/admin', AdminRouter)










app.listen(port, () => {
  console.log(`port has been up at ${port}`);
});
