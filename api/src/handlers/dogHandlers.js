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
  const { name, image, height, weight, life_span, temperaments } = req.body;
  if (!name || !image || !height || !weight || !life_span || !temperaments)
    return res.status(400).json({ error: "Faltan datos" });
  try {
    const newDog = {
      name,
      image,
      height,
      weight,
      life_span,
    };
    const createdDog = await postDogDB(newDog, temperaments);
    res.status(201).json(createdDog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDogsHandler, getDogHandler, postDogHandler };
