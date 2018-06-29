export const SET_SESSION = 'SET_SESSION';

export const setSession = (session) => {
  console.log(session)
  return {
    type: SET_SESSION,
    payload: session
  }
};