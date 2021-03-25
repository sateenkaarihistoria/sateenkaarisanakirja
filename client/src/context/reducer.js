export const setUser = user => {
  if (user) window.localStorage.setItem('loginData', JSON.stringify(user));
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

export const setToken = token => {
  const user = JSON.parse(window.localStorage.getItem('loginData'));
  user.token = token;
  window.localStorage.setItem('loginData', JSON.stringify(user));
  return {
    type: 'SET_TOKEN',
    data: token,
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: { ...action.data } };
    case 'LOG_OUT':
      return { ...state, user: null };
    case 'SET_TOKEN':
      return { ...state, user: { ...state.user, token: action.data } };
    default:
      return state;
  }
};
