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
    include: {
      model: Temperaments,
      attributes: ["name"], //atributos que quiero traer del modelo Temperament
      through: {
        attributes: [], //traer mediante los atributos del modelo
      },
    },
  });
  const resultsDB = response.map((perro) => {
    const {
      id,
      name,
      image,
      height,
      weight,
      life_span,
      created,
      temperaments,
    } = perro;

    const temperamentArr = perro.temperaments.map((t) => t.name);
    const temperament = temperamentArr.join(", ");
    return {
      id,
      name,
      image,
      height,
      weight,
      life_span,
      created,
      temperament,
    };
  });
  return resultsDB;
}

async function postDogDB(newDog, temperament) {
  //se utiliza create (seq) para crear un nuevo reg de perro en la tabla Dogs
  const dogCreate = await Dogs.create(newDog);
  const temperamentsArray = temperament.split(",").map((t) => t.trim());
  const temperamentsId = [];
  // se busca en la tabla Temperaments el registro correspondiente al temp en cuestion con FindOne

  for (const temperament of temperamentsArray) {
    const temperametOfDog = await Temperaments.findOne({
      where: {
        name: temperament,
      },
    });
    // se agrega el id del temperamento al array
    if (temperametOfDog) {
      temperamentsId.push(temperametOfDog.id);
    }
  }
  //se asocia los temp seleccionado al dog nuevo
  await dogCreate.addTemperament(temperamentsId);

  return dogCreate;
}

async function getAllTemperaments() {
  let response = await axios.get(URL);
  //se extraen los temp con map y se los separa
  let resultsApiTemp = response.data.map((perro) =>
    perro.temperament?.split(", ")
  );
  //se junta los temp con spreed
  const arrTemperaments = [].concat(...resultsApiTemp);

  // se utiliza set para eliminar duplicados  y se verifica su con forEach si ya existen
  const borrarDuplicados = new Set(arrTemperaments);
  borrarDuplicados.forEach(async (temp) => {
    if (temp) {
      await Temperaments.findOrCreate({
        where: { name: temp },
      });
    }
  });
  // se obtienen todos los resultados de db y se devuleven
  const allTemperamentsDB = await Temperaments.findAll();
  return allTemperamentsDB;
}

module.exports = {
  getAllData,
  postDogDB,
  getAllTemperaments,
};
