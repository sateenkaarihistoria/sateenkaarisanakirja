import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStateValue } from '../context';

const SuojattuReitti = ({ comp: Komponentti, ...rest }) => {
  const [{ user }] = useStateValue();
  // Jos käyttäjä on kirjautunut sovelukseen, avaa pyydetty komponentti, muutoin ohjaa kirjautumiseen
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Komponentti {...rest} {...props} />
        ) : (
          <Redirect to="kirjautuminen" />
        )
      }
    />
  );
};

export default SuojattuReitti;
