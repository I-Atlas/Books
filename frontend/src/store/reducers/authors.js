import {
  GET_ALL_AUTHORS,
  GET_ALL_AUTHORS_ERROR,
  GET_ALL_AUTHORS_SUCCESS,
} from "../actions";

const initialState = {
  authors: [],
  total: 0,
  loading: false,
  error: "",
};

export const authorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_AUTHORS:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_AUTHORS_SUCCESS:
      return {
        ...state,
        authors: action.payload.authors,
        total: action.payload.total,
        loading: false,
      };
    case GET_ALL_AUTHORS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
