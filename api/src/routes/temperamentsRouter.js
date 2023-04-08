const { Router } = require("express");
const {
  getTemperamentsHandler,
} = require("../handlers/temperamentsHandlers.js");

const routerTemperaments = Router();
//GET | /temperaments
routerTemperaments.get("/", getTemperamentsHandler);

module.exports = routerTemperaments;
