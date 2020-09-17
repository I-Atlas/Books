import {
  GET_ONE_BOOK,
  GET_ONE_BOOK_ERROR,
  GET_ONE_BOOK_SUCCESS
} from "../actions";

const initialState = {
  id: 0,
  name: "",
  description: "",
  price: "",
  example: "",
  author_id: null,
  author: "",
  image: null,
  rating: null,
  category: "",
  loading: false,
  error: "",
};

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ONE_BOOK:
      return {
        ...state,
        loading: true,
      };
    case GET_ONE_BOOK_SUCCESS:
      return {
        ...state,
        id: action.data.book.id,
        name: action.data.book.name,
        description: action.data.book.description,
        price: action.data.book.price,
        example: action.data.book.example,
        author_id: action.data.book.author_id,
        author: action.data.book.author,
        image: action.data.book.image,
        rating: action.data.book.rating,
        category: action.data.book.category,
        loading: false,
      };
    case GET_ONE_BOOK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.data.error,
      };
    default:
      return state;
  }
};
