import { combineReducers } from "redux";
import { booksReducer } from "./books";
import { bookReducer } from "./book";
import { registerReducer } from "./register";

export const rootReducer = combineReducers({
  books: booksReducer,
  book: bookReducer,
  register: registerReducer
});