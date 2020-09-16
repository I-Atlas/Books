import {
  GET_ONE_BOOK,
  GET_ONE_BOOK_ERROR,
  GET_ONE_BOOK_SUCCESS
} from "./";

export const requestBook = () => {
  return { type: GET_ONE_BOOK };
};

export const requestBookSuccess = (data) => {
  return { type: GET_ONE_BOOK_SUCCESS, data };
};

export const requestBookError = (data) => {
  return { type: GET_ONE_BOOK_ERROR, data };
};
