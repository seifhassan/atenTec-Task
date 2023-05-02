const express = require("express")
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
const diverRouter = require('../routes/diverRouter')
const diveRouter = require('../routes/diveRouter')

app.use("/diver",diverRouter)
app.use("/dive",diveRouter)

module.exports = app;