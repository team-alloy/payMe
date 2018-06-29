import axios from 'axios';

export const LOGIN = 'LOGIN';

export const login = (credentials) => {
  const request = axios.post('/api/login', credentials).then(sess => sess);
  return {
    type: LOGIN,
    payload: request
  }
};