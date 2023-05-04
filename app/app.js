const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const diverRouter = require("../routes/diverRouter");
const diveRouter = require("../routes/diveRouter");
const swaggerUi = require("swagger-ui-express");
const  swaggerDoc  = require("../apis");

app.use("/diver", diverRouter);
app.use("/dive", diveRouter);
app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(swaggerDoc, { explorer: true }));



module.exports = app;
