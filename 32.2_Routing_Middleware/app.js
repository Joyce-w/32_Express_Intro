const express = require("express")
const ExpressError = require("./expressError");

const app = express();

app.use(express.json());

const itemsRoutes = require("./routes/itemsRoutes")
app.use("/items", itemsRoutes);



module.exports = app

