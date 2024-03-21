import axios from 'axios';
import rootReducer from '../store';
import {GRAPHQL_URI} from '../../constants/services/base';

const API_URL = GRAPHQL_URI;

//*------- Axios interseptors --------*//
axios.interceptors.request.use(
  async config => {
    // auth headers on login operation causes WRONG_FORMAT server error
    if(config.data.operationName != 'login' ) {
      const state = rootReducer.getState();
      let token = state.app.token;
      if(token && token.length > 0) {
        console.log('Token exists .. [', token, ']')
        config.headers.Authorization = 'Bearer ' + token;
      }
      console.log('Axios Interceptor - Headers', config.headers);
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

axios.interceptors.response.use(
  response => {
    if (response.data && response.data.errors) {
      return Promise.reject(response.data);
    }
    // todo: set token
    return response;
  },
  async error => {
    if (error.response && error.response.status === 401) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  },
);

//*--------------------------------------*//

export const axiosService = (config, data, headers) => {
  switch (config.method) {
    case 'POST':
      return axios.post(API_URL + config.url, data, headers);
    case 'PUT':
      return axios.put(API_URL + config.url, data);
    case 'GET':
      return axios.get(API_URL + config.url);
    case 'DELETE':
      return axios.delete(API_URL + config.url);
    default:
      return;
  }
};
