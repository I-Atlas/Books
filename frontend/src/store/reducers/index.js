import { combineReducers } from "redux";
import { booksReducer } from "./books";
import { bookReducer } from "./book";
import { authorsReducer } from "./authors";
import { categoriesReducer } from "./categories";
import { registerReducer } from "./register";

export const rootReducer = combineReducers({
  books: booksReducer,
  book: bookReducer,
  authors: authorsReducer,
  categories: categoriesReducer,
  register: registerReducer
});