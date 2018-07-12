export const SET_ROLE = 'SET_ROLE';
export const SET_COMPANY = 'SET_COMPANY';
export const SET_CITY = 'SET_CITY';
export const SET_STATE = 'SET_STATE';

/*
  These store functions just store strings into redux store variables.
  The purpose is to make the retrieval of the options selected in the drop downs in the search page easier to retrieve.
*/

export function setCompany (company) {
  return {
    type: SET_COMPANY,
    payload: company
  }
}

export function setRole (role) {
  return {
    type: SET_ROLE,
    payload: role
  }
}

export function setCity (city) {
  return {
    type: SET_CITY,
    payload: city
  }
}

export function setStateRedux (state) {
  return {
    type: SET_STATE,
    payload: state
  }
}