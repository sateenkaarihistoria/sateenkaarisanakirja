import React, { useState } from 'react';
import {
  Container,
  Form,
  Button,
  Message,
  Modal,
  Confirm,
  Responsive,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import RdHeader from '../RdHeader';
import RdMenu from '../RdMenu';
import MobileMenu from '../MobileMenu';
import { putData, deleteData } from '../../api/api';
import { useStateValue, setUser, logOut } from '../../context';

export default function OmatTiedot() {
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();
  const [errors, setErrors] = useState(null);
  const [poistoModaaliAuki, setPoistoModaaliAuki] = useState(false);
  const [muutosModaaliAuki, setMuutosModaaliAuki] = useState(false);
  const [muutettuAuki, setMuutettuAuki] = useState(false);
  const [poistettuAuki, setPoistettuAuki] = useState(false);
  const [lomakeData, setLomakeData] = useState({
    nimi: user.nimi,
    salasana: '',
    uusiSalasana: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLomakeData({ ...lomakeData, [name]: value });
  };

  function hoidaVirheet(result) {
    setErrors(
      result.data.response.data.errors
        ? result.data.response.data.errors
        : // Duplikaatti nimen aiheuttama virhe palauttaa virheen eri muodossa, käsittely vaatii kikkailua
          [{ msg: JSON.stringify(result.data.response.data) }],
    );
    // console.log(result.data.response.data);
  }

  function muutaTiedot() {
    putData('/api/kayttaja/oma/', lomakeData, user.id, user.token).then(
      (result) => {
        if (result.status === 'success') {
          dispatch(setUser({ ...user, nimi: lomakeData.nimi }));
          setMuutettuAuki(true);
        } else {
          hoidaVirheet(result);
        }
      },
    );
    setMuutosModaaliAuki(false);
  }

  function poistaKayttaja() {
    setPoistoModaaliAuki(false);
    deleteData('/api/kayttaja/', user.id, user.token).then((result) => {
      if (result.status === 'success') {
        dispatch(logOut());
      }
    });
    setPoistettuAuki(true);
  }

  return (
    <Container>
      <RdHeader />
      <Responsive minWidth={100} maxWidth={991}>
        <MobileMenu history={history} />
      </Responsive>
      <Responsive {...Responsive.onlyComputer}>
        <RdMenu history={history} activeItem="omat-tiedot" />
      </Responsive>
      <Container text>
        <h1 className="ui header" style={{ marginTop: '2rem' }}>
          Muuta omia tietoja
        </h1>
        {errors ? (
          <Message negative>
            <Message.Header>Tarkista tiedot</Message.Header>
            {errors.map((error) => (
              <p key={error.param}> {error.msg}</p>
            ))}
          </Message>
        ) : null}
        <Form>
          <Form.Input
            label="Nimi"
            name="nimi"
            value={lomakeData.nimi}
            onChange={handleChange}
          />
          <Form.Input
            type="password"
            label="Vanha salasana"
            name="salasana"
            value={lomakeData.salasana}
            onChange={handleChange}
          />
          <Form.Input
            type="password"
            label="Uusi salasana"
            name="uusiSalasana"
            value={lomakeData.uusiSalasana}
            onChange={handleChange}
          />

          <Button onClick={() => setMuutosModaaliAuki(true)}>
            Tallenna muutokset
          </Button>
          <Button negative onClick={() => setPoistoModaaliAuki(true)}>
            Poista oma tili
          </Button>
        </Form>
      </Container>

      <Confirm
        open={poistoModaaliAuki}
        content="Oletko varma, että haluat poistaa tilisi?"
        size="tiny"
        cancelButton="Peru"
        confirmButton="Poista"
        onCancel={() => setPoistoModaaliAuki(false)}
        onConfirm={() => poistaKayttaja()}
      />

      <Confirm
        open={muutosModaaliAuki}
        content="Oletko varma, että haluat muuttaa tiedot?"
        size="tiny"
        cancelButton="Peru"
        confirmButton="Muuta"
        onCancel={() => setMuutosModaaliAuki(false)}
        onConfirm={() => muutaTiedot()}
      />

      <Modal open={muutettuAuki} size="tiny">
        <Modal.Content>Tietojasi on muutettu</Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={() => setMuutettuAuki(false)}>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal open={poistettuAuki} size="tiny">
        <Modal.Content>Tilisi on poistettu</Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={() => history.push('/')}>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
}
