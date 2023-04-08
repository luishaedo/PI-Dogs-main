const { Router } = require("express");
const {
  getDogsHandler,
  getDogHandler,
  postDogHandler,
} = require("../handlers/dogHandlers");

const dogsRouter = Router();

dogsRouter.get("/", getDogsHandler);

//GET | /dogs/:idRaza
dogsRouter.get("/:idRaza", getDogHandler);

//POST | /dogs
dogsRouter.post("/", postDogHandler);

module.exports = dogsRouter;
