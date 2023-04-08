const { getDataApi, getDataDB, getAllData } = require("../controllers");

const getDogsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    let results = name ? await getAllData(name) : await getAllData();
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontraron resultados." });
    }
    res.status(200).json({ results });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDogHandler = (req, res) => {
  const { idRaza } = req.params;
};

const postDogHandler = (req, res) => {
  const { name, image, height, weight, life_span, temperament } = req.body;
};

module.exports = { getDogsHandler, getDogHandler, postDogHandler };
