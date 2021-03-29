import jwtDecode from 'jwt-decode';

export const isTokenExpired = token => {
  const decoded = jwtDecode(token);
  if (new Date(decoded.exp * 1000) < new Date(Date.now())) {
    return true;
  } else {
    return false;
  }
};
