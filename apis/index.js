const { config } =require ("dotenv-flow");
const diverApiObject = require ("./diverApi");
const diveApiObject = require ("./diveApi");

config();

const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    version: "0.0.1",
    title: "API Explorer diving system",
    description:
      "diving system mange dive logs",
  },
  servers: [
    {
      url: process.env.URL,
    },
  ],
  paths: { ...diverApiObject ,...diveApiObject},
};


module.exports = swaggerConfig;
