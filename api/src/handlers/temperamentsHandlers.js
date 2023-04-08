const { getAllTemperaments } = require("../controllers");

const getTemperamentsHandler = async (req, res) => {
  try {
    let resultsTemperaments = await getAllTemperaments();
    return res.status(200).json(resultsTemperaments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTemperamentsHandler };
