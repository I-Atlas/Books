import {
  GET_ALL_BOOKS,
  GET_ALL_BOOKS_ERROR,
  GET_ALL_BOOKS_SUCCESS
} from "../actions";

const initialState = {
  books: [],
  currentPage: 0,
  totalBooks: 0,
  totalPages: 0,
  loading: false,
  error: "",
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BOOKS:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.data.books.books,
        currentPage: action.data.books.count,
        totalBooks: action.data.books.totalBooks,
        totalPages: action.data.books.totalPages,
        loading: false,
      };
    case GET_ALL_BOOKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.data.message,
      };
    default:
      return state;
  }
};
