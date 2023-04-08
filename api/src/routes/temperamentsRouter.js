const { Router } = require("express");
const router = Router();
const {
  getTemperamentsHandler,
} = require("../handlers/temperamentsHandlers.js");

//GET | /temperaments
//router.get("/temperaments", getTemperamentsHandler);

module.exports = router;
