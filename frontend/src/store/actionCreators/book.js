import axios from 'axios';

import {
  GET_ONE_BOOK,
  GET_ONE_BOOK_ERROR,
  GET_ONE_BOOK_SUCCESS,
} from "../actions";

const API_URL = "http://localhost:5000/books/book/"

export const getBook = async (id) => {
  return async dispatch => {
    dispatch(getOneBook())

    try {
      const response = await axios
        .get(API_URL + id, {})
        dispatch(getOneBookSuccess(response.data));

    } catch (error) {
      dispatch(getOneBookError(error.response.data.message));
    }
  }
}

const getOneBook = () => ({
  type: GET_ONE_BOOK
})

const getOneBookError = () => ({
  type: GET_ONE_BOOK_ERROR
})

const getOneBookSuccess = () => ({
  type: GET_ONE_BOOK_SUCCESS
})