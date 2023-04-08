const axios = require("axios");
const { Dogs, Temperaments } = require("../db");
//require("dotenv").config();
const API_KEY =
  "live_tIBjsLRSGkfr5JDdY7EwzuEjQMni6bG1ImlD1VZ7wXDfAZrhfaraBmrpJudm2Lce";
//process.env.API_KEY;

/* 
infoDog solo necesitaremos para el front estas prop
id
name
image
height
weight
life_span
temperaments
&?api_key=${API_KEY}
*/

//FN concatenadora de info de Api + DB
async function getAllData(name) {
  const URL = `https://api.thedogapi.com/v1/breeds`;
  let dataApi = await getDataApi();
  let dataDb = await getDataDB();
  let allData = dataApi.concat(dataDb);
  // if (name)
  //   Alldatafilter = allData.filter((e) =>
  //     e.name.toLowerCase().includes(name.toLowerCase())
  //   );
  return allData.length ? allData : [];
}

// FN busca info de API y nos devuelve en el formato necesario
async function getDataApi() {
  let response = await axios.get(URL);
  let resultsApi = response.data.map((perro) => {
    const heightMetric = perro.height.metric;
    const weightMetric = perro.weight.metric;
    const imageUrl = perro.image.url;
    return {
      id: perro.id,
      name: perro.name,
      image: imageUrl,
      height: heightMetric,
      weight: weightMetric,
      life_span: perro.life_span,
      temperament: perro.temperament,
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
    const { id, name, image, height, weight, life_span, temperament } = perro;
    return {
      id,
      name,
      image,
      height,
      weight,
      life_span,
      temperament: temperament.name,
    };
  });
  return resultsDB;
}

module.exports = { getDataApi, getDataDB, getAllData };
