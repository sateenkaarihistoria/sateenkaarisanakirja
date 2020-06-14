import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../context/userContext';

const SuojattuReitti = ({ comp: Komponentti, ...rest }) => {
  const sessioData = useContext(UserContext);

  // Jos käyttäjä on kirjautunut sovelukseen, avaa pyydetty komponentti, muutoin ohjaa kirjautumiseen
  return (
    <Route {...rest}
      render={props =>
        sessioData.token
          ? <Komponentti {...rest} {...props} />
          : <Redirect to='kirjautuminen' />
      }
    />
  );
}

export default SuojattuReitti;