import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';

import './Kirjainhakukomponentti.css';
import { CODES } from '../constants/characterCodes';

const Kirjainhakukomponentti = ({ suodatusMuutettu }) => {
  const [suodatusPaalla, setSuodatusPaalla] = useState(false);
  const [valittuKirjain, setValittuKirjain] = useState('');

  const kirjainValittu = (kirjain) => {
    setSuodatusPaalla(true);
    setValittuKirjain(kirjain);
    suodatusMuutettu(true, 'kirjainhaku', kirjain);
  };

  const resetoiHaku = () => {
    setSuodatusPaalla(false);
    setValittuKirjain('');
    suodatusMuutettu(false, 'kirjainhaku', '');
  };

  const elementtiNumero = (num, index) => (
    <Button
      key={index}
      className="hakukirjain"
      onClick={() => kirjainValittu(String.fromCharCode(num))}
    >
      {String.fromCharCode(num)}
    </Button>
  );

  if (!suodatusPaalla) {
    return (
      <Button.Group icon size="mini">
        {/* kirjaimet */}
        {CODES.map((c, i) => elementtiNumero(c, i))}
      </Button.Group>
    );
  }
  return (
    <div className="kirjainhaku">
      <p>
        Suodatettu kirjaimella: <b>{valittuKirjain}</b>
      </p>
      <Button onClick={resetoiHaku} name="reset">
        Poista suodatus
      </Button>
    </div>
  );
};

export default Kirjainhakukomponentti;
