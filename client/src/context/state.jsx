import React, { createContext, useContext, useReducer } from 'react';
import { isTokenExpired } from '../utilities/token';

const UserContext = React.createContext();

const init = () => {
  const user = JSON.parse(localStorage.getItem('loginData'));
  if (user) {
    if (isTokenExpired(user.token)) {
      return null;
    }
    return user;
  }
  return null;
};

const initialState = {
  user: init(),
};

export const StateContext = createContext([initialState, () => initialState]);

export const StateProvider = ({ reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

export default UserContext;
