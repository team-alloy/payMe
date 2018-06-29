export const LOGIN = 'LOGIN';

export const login = (credentials) => {
  return   {
    type: LOGIN,
    payload: credentials
  }
};