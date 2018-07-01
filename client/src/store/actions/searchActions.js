export const SAVE_COMPANIES = 'SAVE_COMPANIES';
export const SAVE_ROLES = 'SAVE_ROLES';
export const SAVE_STATES = 'SAVE_STATES';
export const SAVE_CITIES = 'SAVE_CITIES';

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