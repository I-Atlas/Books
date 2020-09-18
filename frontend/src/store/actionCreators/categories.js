import axios from "axios";

import {
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_ERROR,
  GET_ALL_CATEGORIES_SUCCESS
} from "../actions";

const API_URL = "http://localhost:5000/categories";

export const getCategories = () => {
  return async (dispatch) => {
    dispatch(getAllCategories());

    try {
      const response = await axios.get(API_URL, {});

      dispatch(getAllCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(getAllCategoriesError(error.response.data.message));
    }
  };
};

const getAllCategories = () => ({
  type: GET_ALL_CATEGORIES,
});

const getAllCategoriesError = (error) => ({
  type: GET_ALL_CATEGORIES_ERROR,
  payload: {
    error,
  },
});

const getAllCategoriesSuccess = (categories) => ({
  type: GET_ALL_CATEGORIES_SUCCESS,
  payload: {
    ...categories,
  },
});