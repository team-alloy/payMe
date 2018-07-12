export const SAVE_COMPANIES = 'SAVE_COMPANIES';
export const SAVE_ROLES = 'SAVE_ROLES';
export const SAVE_STATES = 'SAVE_STATES';
export const SAVE_CITIES = 'SAVE_CITIES';
export const SAVE_RESULTS = 'SAVE_RESULTS';

/*
  These store functions save the array of companies, roles, cities, and states to the
  store. It also saves the search results to the store
*/
export const saveCompanies = (companies) => {
  return {
    type: SAVE_COMPANIES,
    payload: companies
  }
};

export const saveStates = (states) => {
  return {
    type: SAVE_STATES,
    payload: states
  }
};

export const saveCities = (cities) => {
  return {
    type: SAVE_CITIES,
    payload: cities
  }
};

export const saveRoles = (roles) => {
  return {
    type: SAVE_ROLES,
    payload: roles
  }
};

export const saveResults = (results) => {
  return {
    type: SAVE_RESULTS,
    payload: results
  }
};