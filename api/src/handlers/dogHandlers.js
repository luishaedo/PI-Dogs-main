const { getAllData, postDogDB } = require("../controllers");

const getDogsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    let results = [];
    if (typeof name === "undefined" || !name)
      results = await getAllData(null, null);
    else results = await getAllData(name, null);
    res.status(200).json({ results });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDogHandler = async (req, res) => {
  const id = req.params.idRaza;
  try {
    let resultsId = [];
    resultsId = await getAllData(null, id);
    res.status(200).json({ resultsId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postDogHandler = async (req, res) => {
  const { name, height, weight, life_span, temperament } = req.body;
  if (!name || !height || !weight || !life_span || !temperament)
    return res.status(400).json({ error: "All fields are required" });
  try {
    const newDog = {
      name,
      height,
      weight,
      life_span,
      temperament,
      image: "Default",
    };
    const createdDog = await postDogDB(newDog, temperament);
    res.status(201).json(createdDog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDogsHandler, getDogHandler, postDogHandler };
