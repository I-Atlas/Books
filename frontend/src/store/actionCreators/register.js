import axios from "axios";

import {
  POST_REGISTER,
  POST_REGISTER_ERROR,
  POST_REGISTER_SUCCESS,
} from "../actions";
import { register } from "../../serviceWorker";

const API_URL = "http://localhost:5000/register";

export const registerUser = (username, email, password) => {
  return async (dispatch) => {
    dispatch(postRegister());

    try {
      debugger;
      const response = await axios.post(API_URL, {
        username,
        email,
        password,
      });

      dispatch(postRegisterSuccess(response.data));

    } catch (error) {
      dispatch(postRegisterError(error.response.data.message));
    }
  };
};

const postRegister = () => ({
  type: POST_REGISTER,
});

const postRegisterError = (error) => ({
  type: POST_REGISTER_ERROR,
  payload: {
    error,
  },
});

const postRegisterSuccess = (register) => ({
  type: POST_REGISTER_SUCCESS,
  payload: {
    ...register,
  },
});
