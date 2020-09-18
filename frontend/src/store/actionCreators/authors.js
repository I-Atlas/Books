import axios from "axios";

import {
  GET_ALL_AUTHORS,
  GET_ALL_AUTHORS_ERROR,
  GET_ALL_AUTHORS_SUCCESS,
} from "../actions";

const API_URL = "http://localhost:5000/authors";

export const getAuthors = () => {
  return async (dispatch) => {
    dispatch(getAllAuthors());

    try {
      const response = await axios.get(API_URL, {});

      dispatch(getAllAuthorsSuccess(response.data));
    } catch (error) {
      dispatch(getAllAuthorsError(error.response.data.message));
    }
  };
};

const getAllAuthors = () => ({
  type: GET_ALL_AUTHORS,
});

const getAllAuthorsError = (error) => ({
  type: GET_ALL_AUTHORS_ERROR,
  payload: {
    error,
  },
});

const getAllAuthorsSuccess = (authors) => ({
  type: GET_ALL_AUTHORS_SUCCESS,
  payload: {
    ...authors,
  },
});
