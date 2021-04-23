import React from 'react';
import { Loader } from 'semantic-ui-react';

const LatausKomponentti = (Komponentti) =>
  function LatausKomponenttiLisatty({ ladataan, ...props }) {
    return !ladataan ? (
      <Komponentti {...props} />
    ) : (
      <Loader active>Ladataan tietoja</Loader>
    );
  };

export default LatausKomponentti;
