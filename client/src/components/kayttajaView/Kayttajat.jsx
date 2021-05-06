import React, { useState, useEffect } from 'react';
import {
  Container,
  Loader,
  Confirm,
  Message,
  Responsive,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import RdHeader from '../RdHeader';
import RdMenu from '../RdMenu';
import MobileMenu from '../MobileMenu';
import { getSuojattuData, deleteData } from '../../api/api';
import { useStateValue } from '../../context';
import KaikkiKayttajat from './KaikkiKayttajat';

const Kayttajat = () => {
  const [kayttajat, setKayttajat] = useState([]);
  const [ladataan, setLadataan] = useState(false);
  const [errors, setErrors] = useState(null);
  const [modaaliAuki, setModaaliAuki] = useState(false);
  const [poistettavaId, setPoistettavaId] = useState(null);
  const history = useHistory();
  const [{ user }] = useStateValue();

  useEffect(() => {
    setLadataan(true);
    getSuojattuData('/api/kayttaja', user.token)
      .then((result) => {
        if (result.status === 'success') {
          setKayttajat(result.data);
        } else {
          setErrors(result.data.response.data.error);
          // console.log(result.data.response);
        }
      })
      .then(setLadataan(false));
    // eslint-disable-next-line
  }, []);

  function poistaKayttaja(id) {
    deleteData('/api/kayttaja/', id, user.token).then((result) => {
      if (result.status === 'success') {
        const muutettuKayttajat = kayttajat.filter(
          (kayttaja) => kayttaja.id !== id,
        );
        setKayttajat(muutettuKayttajat);
        setModaaliAuki(false);
      } else {
        window.alert(result.data.message);
      }
    });
  }

  function avaaModaali(id) {
    setPoistettavaId(id);
    setModaaliAuki(true);
  }

  return (
    <Container>
      <RdHeader />
      <Responsive minWidth={100} maxWidth={991}>
        <MobileMenu history={history} />
      </Responsive>
      <Responsive {...Responsive.onlyComputer}>
        <RdMenu history={history} activeItem="kayttajat" />
      </Responsive>
      <h1 className="ui header">Kaikki käyttäjät</h1>
      {errors ? (
        <Message negative>
          <Message.Header>Virhe</Message.Header>
          {errors}
        </Message>
      ) : ladataan ? (
        <Loader active>Ladataan tietoja</Loader>
      ) : (
        <KaikkiKayttajat kayttajat={kayttajat} avaaModaali={avaaModaali} />
      )}
      <Confirm
        open={modaaliAuki}
        content="Oletko varma, että haluat poistaa käyttäjän?"
        size="tiny"
        cancelButton="Peru"
        confirmButton="Poista"
        onCancel={() => setModaaliAuki(false)}
        onConfirm={() => poistaKayttaja(poistettavaId)}
      />
    </Container>
  );
};

export default Kayttajat;
