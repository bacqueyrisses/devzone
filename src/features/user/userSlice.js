/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const initialState = {
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setLastname: (state, action) => {
      state.lastname = action.payload;
    },
    setFirstname: (state, action) => {
      state.firstname = action.payload;
    },
    setWebsite: (state, action) => {
      state.website = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setToolsUser: (state, action) => {
      state.tools = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToolsUser: (state, action) => {
      state.tools = action.payload;
    },
    setSignupForm: (state, action) => {
      state.SignupForm = action.payload;
    },
    logout: () => ({}),
  },
});

export default userSlice.reducer;

export const {
  setSignupForm,
  setUsername,
  setToolsUser,
  removeToolsUser,
  setLastname,
  setFirstname,
  setWebsite,
  setEmail,
  setId,
  setToken,
  setDescription,
  logout,
} = userSlice.actions;

const thunkLogin =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/login`, {
        email,
        password,
      });
      dispatch(setId(response.data.user.id));
      dispatch(setFirstname(response.data.user.firstname));
      dispatch(setLastname(response.data.user.lastname));
      dispatch(setEmail(response.data.user.email));
      dispatch(setUsername(response.data.user.username));
      dispatch(setToken(response.data.token.accessToken));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
export { thunkLogin };

export const thunkSignup =
  ({ username, email, password, confirmedPassword }) =>
  async (dispatch) => {
    const SignupForm = { username, email, password, confirmedPassword };
    dispatch(setSignupForm(SignupForm));
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/signup`, {
        username,
        email,
        password,
        confirmedPassword,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

export const thunkUpdateProfil = (form, id) => async (dispatch) => {
  const { username, email, firstname, lastname, website, password } = form;
  try {
    const response = await axios.patch(`${REACT_APP_API_URL}/user/${id}`, {
      username,
      email,
      firstname,
      lastname,
      website,
      password,
    });
    dispatch(setFirstname(response.data.user.firstname));
    dispatch(setLastname(response.data.user.lastname));
    dispatch(setEmail(response.data.user.email));
    dispatch(setUsername(response.data.user.username));
    dispatch(setWebsite(response.data.website));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
