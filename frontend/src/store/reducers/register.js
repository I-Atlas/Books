import {
  POST_REGISTER,
  POST_REGISTER_ERROR,
  POST_REGISTER_SUCCESS,
} from "../actions";

const initialState = {
  token: "",
  refreshToken: "",
  message: "",
  loading: false,
  error: "",
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REGISTER:
      return {
        ...state,
        loading: true,
      };
    case POST_REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        message: action.payload.message,
        loading: false,
      };
    case POST_REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
