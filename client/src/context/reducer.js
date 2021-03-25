export const setUser = user => {
  return {
    type: 'SET_USER',
    data: user,
  };
};

export const setLogged = () => {
  const user = window.localStorage.getItem('loginData');
  return {
    type: 'SET_USER',
    data: user,
  };
};

export const logOut = () => {
  window.localStorage.removeItem('loginData');
  return {
    type: 'LOG_OUT',
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: { ...action.data } };
    case 'LOG_OUT':
      return { ...state, user: null };
    default:
      return state;
  }
};
