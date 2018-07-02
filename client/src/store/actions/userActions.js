export const SET_SESSION = 'SET_SESSION';
export const SET_MILESTONES = 'SET_MILESTONES';

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
