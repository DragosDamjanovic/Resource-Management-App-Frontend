import { REGISTER } from "../../../constants/services/userServices";
import { axiosService } from "../../axios";
import { print } from 'graphql';
import { registrationConfig } from "../../axios/routes";
import * as types from '../types/actionTypes';
import { ParseErrorMessage } from "../../utils";

// Define the shape of the data expected by the registration function
interface RegistrationData {
    email: string;
    password: string;
    passwordConfirm: string;
  }

// REGISTRATION
export function registrationAction(data: RegistrationData): () => Promise<void> {
    return async () => {
      try {
        await axiosService(registrationConfig, {
          operationName: 'register',
          query: print(REGISTER),
          variables: { ...data },
        });
  
        Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }

  export const userLoggedIn = (user, token) => async (dispatch) => {
    await dispatch({
      type: types.USER_LOGGED_IN,
      user,
      token,
    });
  
    if (!user.firstName || !user.lastName) {
      await new Promise(resolve => setTimeout(resolve, 250));
      await dispatch({
        type: types.OPEN_MODAL,
        properties: { view: 'SetupNameModal', canClose: false },
      });
    }
  };

  // LOGIN
export function loginAction(data) {
    return async dispatch => {
      try {
        let response = await axiosService(loginConfig, {
          operationName: 'login',
          query: print(LOGIN),
          variables: { ...data },
        });
        console.debug('loginResponse', response.data);
        const token = response.data.data.login.token;
        const user = { ...response.data.data.login };
        dispatch(userLoggedIn(user, token));
        Promise.resolve();
        return { token, user };
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }
  
  export const logout = () => async (dispatch, getState) => {
    console.log('logging out');
    const { app: { lang } } = getState();
    try {
      await client.mutate({
        mutation: userApi.LOG_OUT
      });
    } catch (error) {
      console.debug('ERRR -> ', error)
      dispatch(ParseErrorMessage(error, lang, displayToast));
    } finally {
      await PersistedSecureStore.clearAll();
      dispatch({ type: types.USER_LOGGED_OUT });
      await client.clearStore();
    }
  };