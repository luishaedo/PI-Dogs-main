const axios = require("axios");
const { Dogs, Temperaments } = require("../db");
const URL = `https://api.thedogapi.com/v1/breeds`;

//FN concatenadora de info de Api + DB
async function getAllData(name, id) {
  const dataApi = await getDataApi();
  const dataDb = await getDataDB();
  const allData = dataApi.concat(dataDb);
  if (name) return filterDataName(allData, name);
  else if (id) return filterDataId(allData, id);
  else return allData;
}

// FN para filtrar por name
function filterDataName(allData, name) {
  const filteredDataName = allData.filter((e) =>
    e.name.toLowerCase().includes(name.toLowerCase())
  );
  return filteredDataName.length ? filteredDataName : [];
}

//FN para filtrar por ID
function filterDataId(allData, id) {
  const idString = id.toString();
  const filteredDataId = allData.filter((e) => e.id.toString() === idString);
  return filteredDataId.length ? filteredDataId : [];
}

// FN busca info de API y nos devuelve en el formato necesario
async function getDataApi() {
  let response = await axios.get(URL);
  let resultsApi = response.data.map((perro) => {
    const heightMetric = perro.height.metric;
    const weightMetric = perro.weight.metric;
    const imageUrl = perro.image.url;
    const created = false;
    return {
      id: perro.id,
      name: perro.name,
      image: imageUrl,
      height: heightMetric,
      weight: weightMetric,
      origin: perro.origin,
      life_span: perro.life_span,
      temperament: perro.temperament,
      created,
    };
  });
  return resultsApi;
}

// FN busca info DB y nos la devuelve en el mismo formato!
async function getDataDB() {
  const response = await Dogs.findAll({
    include: Temperaments,
  });
  const resultsDB = response.map((perro) => {
    const { id, name, image, height, weight, life_span } = perro;
    return {
      id,
      name,
      image,
      height,
      weight,
      life_span,
    };
  });
  return resultsDB;
}

async function postDogDB(newDog, temperament) {
  const dogCreate = await Dogs.create(newDog);
  const temperamentsArray = temperament.split(",").map((t) => t.trim());
  const temperamentsId = [];
  for (const temperament of temperamentsArray) {
    const temperametOfDog = await Temperaments.findOne({
      where: {
        name: temperament,
      },
    });
    if (temperametOfDog) {
      temperamentsId.push(temperametOfDog.id);
    }
  }
  await dogCreate.addTemperament(temperamentsId);

  return await Dogs.findByPk(dogCreate.id, { include: Temperaments });
}

async function getAllTemperaments() {
  let response = await axios.get(URL);
  let resultsApiTemp = response.data.map((perro) =>
    perro.temperament?.split(", ")
  );
  const arrTemperaments = [].concat(...resultsApiTemp);

  const borrarDuplicados = new Set(arrTemperaments);
  borrarDuplicados.forEach(async (temp) => {
    if (temp) {
      await Temperaments.findOrCreate({
        where: { name: temp },
      });
    }
  });
  const allTemperamentsDB = await Temperaments.findAll();
  return allTemperamentsDB;
}

module.exports = {
  getAllData,
  postDogDB,
  getAllTemperaments,
};
