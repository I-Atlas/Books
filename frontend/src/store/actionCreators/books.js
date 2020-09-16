import axios from 'axios';

import {
  GET_ALL_BOOKS,
  GET_ALL_BOOKS_ERROR,
  GET_ALL_BOOKS_SUCCESS
} from "../actions";

const API_URL = "http://localhost:5000/books/"

export const getBooks = async ({ params }) => {
  return dispatch => {
    dispatch(getAllBooks())

    try {
      const response = await axios
        .get(API_URL, {
          params
      })
      setTimeout(() => {
        dispatch(getAllBooksSuccess(response.data));
      }, 1500);
    
      // if (response.data) {
      //   return response.data
      // }
  
      // if (response.data.message) {
      //   console.log(response.data.message)
      // }

    } catch (error) {
      dispatch(getAllBooksError(error.response.data.message));
    }
  }
}

const getAllBooks = () => ({
  type: GET_ALL_BOOKS
})

const getAllBooksError = () => ({
  type: GET_ALL_BOOKS_ERROR
})

const getAllBooksSuccess = () => ({
  type: GET_ALL_BOOKS_SUCCESS
})
