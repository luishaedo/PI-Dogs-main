import {
  GET_DOG_BY_ID,
  GET_DOGS,
  GET_DOG_BY_NAME,
  GET_TEMPERAMENTS,
  TEMPERAMENTS_FILTER,
  CREATED_FILTER,
  LIMPIAR_FILTROS,
  POST_DOG,
  ORDER_RESULT,
  SET_CURRENT_PAGE,
  SEARCHED,
  ERROR,
  CLEAN_DETAIL,
} from "./actionsTypes";
import axios from "axios";

export const getDogs = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/dogs");
      const dogs = response.data;
      dispatch({ type: GET_DOGS, payload: dogs });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const getDogsByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/dogs/?name=${name}`
      );
      const dogs = response.data;
      dispatch({ type: GET_DOG_BY_NAME, payload: dogs });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const getDogById = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/${id}`);
      const dog = response.data;
      dispatch({ type: GET_DOG_BY_ID, payload: dog });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/temperaments`);
      const temperaments = response.data;
      dispatch({
        type: GET_TEMPERAMENTS,
        payload: temperaments,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const postDog = (dog) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/dogs/", dog);
      dispatch({
        type: POST_DOG,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const temperamentsFilter = (selectTemperaments) => {
  return {
    type: TEMPERAMENTS_FILTER,
    payload: selectTemperaments,
  };
};

export const createdFilterAction = (created) => {
  return {
    type: CREATED_FILTER,
    payload: created,
  };
};

export const orderResult = (orderBy, orderType) => {
  return {
    type: ORDER_RESULT,
    payload: {
      orderBy,
      orderType,
    },
  };
};

export const searched = (search) => {
  return {
    type: SEARCHED,
    payload: search,
  };
};

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};

export const limpiarFiltros = () => {
  return {
    type: LIMPIAR_FILTROS,
  };
};

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
  };
};
