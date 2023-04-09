const { Router } = require("express");
const {
  getDogsHandler,
  getDogHandler,
  postDogHandler,
} = require("../handlers/dogHandlers");

const dogsRouter = Router();

dogsRouter.get("/", getDogsHandler);

dogsRouter.get("/:idRaza", getDogHandler);

dogsRouter.post("/", postDogHandler);

module.exports = dogsRouter;
