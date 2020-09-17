import axios from "axios";

import {
  GET_ALL_BOOKS,
  GET_ALL_BOOKS_ERROR,
  GET_ALL_BOOKS_SUCCESS,
} from "../actions";

const API_URL = "http://localhost:5000/books/";

export const getBooks = (params) => {
  return async dispatch => {
    dispatch(getAllBooks());

    try {
      const response = await axios.get(API_URL, {
        params,
      });

      dispatch(getAllBooksSuccess(response.data));

    } catch (error) {
      dispatch(getAllBooksError(error.response.data.message));
    }
  };
};

const getAllBooks = () => ({
  type: GET_ALL_BOOKS,
});

const getAllBooksError = (error) => ({
  type: GET_ALL_BOOKS_ERROR,
  payload: {
    error,
  },
});

const getAllBooksSuccess = (books) => ({
  type: GET_ALL_BOOKS_SUCCESS,
  payload: {
    ...books,
  },
});
