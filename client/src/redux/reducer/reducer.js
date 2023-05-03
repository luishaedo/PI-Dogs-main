import {
  GET_DOGS,
  GET_DOG_BY_ID,
  GET_DOG_BY_NAME,
  POST_DOG,
  GET_TEMPERAMENTS,
  TEMPERAMENTS_FILTER,
  CREATED_FILTER,
  LIMPIAR_FILTROS,
  ORDER_RESULT,
  SET_CURRENT_PAGE,
  SEARCHED,
  ERROR,
} from "../actions/actionsTypes.js";

const initialState = {
  results: [],
  copyResults: [],
  dog: [],
  temperaments: [],
  temperamentsFilter: [],
  createdFilter: "",
  orderBy: "name",
  orderType: "up",
  currentPage: 1,
  cardsPerPage: 8,
  searchDog: "",
  error: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        results: action.payload.results,
        copyResults: action.payload.results,
      };

    case GET_DOG_BY_ID:
      return { ...state, dog: action.payload };

    case GET_DOG_BY_NAME:
      return { ...state, copyResults: action.payload.results };

    case GET_TEMPERAMENTS:
      return { ...state, temperaments: action.payload };

    case POST_DOG:
      return {
        ...state,
        dog: action.payload,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case TEMPERAMENTS_FILTER:
      let filteredBreeds = [];
      if (action.payload.length > 0) {
        if (action.payload.length === 1) {
          filteredBreeds = state.copyResults?.filter((dog) =>
            dog.temperament?.includes(action.payload[0])
          );
        } else {
          filteredBreeds = state.copyResults?.filter((dog) => {
            const temperamentArr = dog.temperament?.split(", ");
            return action.payload.every((temp) =>
              temperamentArr?.includes(temp.trim())
            );
          });
        }
      } else if (action.payload.length === 0) {
        filteredBreeds = state.results;
      }
      return {
        ...state,
        temperamentsFilter: action.payload,
        copyResults: filteredBreeds,
      };

    case CREATED_FILTER:
      let filterOrigin = [];
      if (action.payload === "Default") {
        return {
          ...state,
          copyResults: state.results,
        };
      }
      action.payload === true
        ? (filterOrigin = state.copyResults.filter(
            (dog) => dog.created === true
          ))
        : (filterOrigin = state.copyResults.filter(
            (dog) => dog.created === false
          ));

      return {
        ...state,
        copyResults: filterOrigin,
      };

    case ORDER_RESULT:
      const { orderBy, orderType } = action.payload;
      const sortedResults = [...state.results].sort((a, b) => {
        const order = orderType === "up" ? 1 : -1;

        if (orderBy === "name") {
          if (a[orderBy] > b[orderBy]) {
            return order;
          }
          if (a[orderBy] < b[orderBy]) {
            return -order;
          }
          return 0;
        } else if (orderBy === "weight") {
          if (a[orderBy] > b[orderBy]) {
            return -order;
          }
          if (a[orderBy] < b[orderBy]) {
            return order;
          }
          return 0;
        }
        return 0;
      });
      return {
        ...state,
        copyResults: sortedResults,
        orderBy,
        orderType,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case LIMPIAR_FILTROS:
      return {
        ...state,
        copyResults: state.results,
        temperamentsFilter: [],
        createdFilter: [],
        orderBy: "name",
        orderType: "up",
      };

    case SEARCHED:
      return {
        ...state,
        searchDog: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
