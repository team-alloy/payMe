export const SET_APPLIED_ROLES = 'SET_APPLIED_ROLES'
export const SET_SESSION = 'SET_SESSION';
export const SET_MILESTONES = 'SET_MILESTONES';
export const SET_APPLICATIONS = 'SET_APPLICATIONS';

export const setSession = (session) => {
  return {
    type: SET_SESSION,
    payload: session,
  };
};

export const setMilestones = (milestones) => {
  return {
    type: SET_MILESTONES,
    payload: milestones,
  };
};

export const setAppliedRoles = (roles) => {
  return {
    type: SET_APPLIED_ROLES,
    payload: roles,
  };
};

export const setApplications = (apps) => {
  return {
    type: SET_APPLICATIONS,
    payload: apps,
  };
};
