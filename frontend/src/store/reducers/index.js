import { combineReducers } from "redux";
import { booksReducer } from "./books";
import { bookReducer } from "./book";

export const rootReducer = combineReducers({
  books: booksReducer,
  book: bookReducer,
});