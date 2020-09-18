import {
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_ERROR,
  GET_ALL_CATEGORIES_SUCCESS
} from "../actions";

const initialState = {
  categories: [],
  total: 0,
  loading: false,
  error: "",
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        total: action.payload.total,
        loading: false,
      };
    case GET_ALL_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};