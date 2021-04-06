const express = require("express")
const ExpressError = require("./expressError");
const itemsRoutes = require("./routes/itemsRoutes")

const app = express();

app.use(express.json());
app.use("/items", itemsRoutes);

/** 404 handler */

app.use(function(req, res, next) {
  return new ExpressError("Not Found", 404);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.code || 500);

  return res.json({
    error: err.msg
  });
});

module.exports = app;