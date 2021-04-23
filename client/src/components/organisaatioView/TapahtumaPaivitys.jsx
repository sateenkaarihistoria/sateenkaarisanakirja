import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Modal, Header } from 'semantic-ui-react';

// TODO virheen käsittely duplikaatti emailin tapauksissa tehty erittäin rumasti, korjattava?
// TODO salasanat, vain salasanan "omistaja" saa muuttaa salasanaansa editoinnin yhteydessä?
export default function TapahtumaPaivitys(props) {
  const { tapahtuma, updateHandler } = props;
  const [paivitysModaaliAktiivinen, setPaivitysModaaliAktiivinen] = useState(
    false,
  );
  const [lomakeData, setLomakeData] = useState({
    nimi: '',
    luonne: '',
    paivays: '',
    valmis: false,
    viesti: '',
    asiasana: '',
  });

  useEffect(() => {
    // setIsEdit(true);
    setLomakeData({
      nimi: tapahtuma.nimi,
      luonne: tapahtuma.luonne,
      paivays: tapahtuma.paivays,
      valmis: tapahtuma.valmis,
      viesti: tapahtuma.viesti,
      asiasana: tapahtuma.asiasana.join(';'),
    });
    // eslint-disable-next-line
  }, []);

  const handleChange = (event, result) => {
    const { name, value } = result || event.target;
    setLomakeData({ ...lomakeData, [name]: value });
  };

  const handleCheckbox = (event, result) => {
    const { name } = result || event.target;
    setLomakeData({ ...lomakeData, [name]: !lomakeData.valmis });
  };

  const hallinnoiSulku = (e) => {
    if (e) e.preventDefault();
    setPaivitysModaaliAktiivinen(false);
  };

  const lahetaPaivitettyData = (e) => {
    if (e) e.preventDefault();
    // @body: JSON-objekti: tapahtuma_nimi, luonne, paivays, kuvaus, viesti, valmis
    const uusiData = {
      tapahtuma_nimi: lomakeData.nimi,
      luonne: lomakeData.luonne,
      paivays: lomakeData.paivays,
      valmis: lomakeData.valmis,
      viesti: lomakeData.viesti,
      kuvaus: lomakeData.asiasana,
    };
    if (
      uusiData.tapahtuma_nimi === '' ||
      uusiData.paivays === '' ||
      uusiData.luonne === '' ||
      uusiData.asiasana === ''
    ) {
      console.log('Virhe! Ei tyhjiä kenttiä.');
    } else {
      updateHandler({ tyyppi: 'tapahtuma', id: tapahtuma.id })(uusiData);
      hallinnoiSulku();
    }
  };

  const hallinnoiAvaus = () => setPaivitysModaaliAktiivinen(true);

  return (
    <Modal
      trigger={
        <Button compact size="mini" onClick={hallinnoiAvaus}>
          Päivitä
        </Button>
      }
      open={paivitysModaaliAktiivinen}
    >
      <Container style={{ padding: '2rem' }}>
        <Header>Tapahtuman tietojen päivitys</Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              label="Tapahtuman nimi"
              name="nimi"
              value={lomakeData.nimi}
              onChange={handleChange}
            />
            <Form.Input
              label="Tapahtuman luonne"
              name="luonne"
              value={lomakeData.luonne}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Tapahtuman uutisointi"
              name="paivays"
              value={lomakeData.paivays}
              onChange={handleChange}
            />
            <Form.Input
              label="Asiasana"
              name="asiasana"
              value={lomakeData.asiasana}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Checkbox
              style={{ marginTop: '1.0rem', marginBottom: '1.0rem' }}
              label="Tapahtuman syöttö on valmis julkaistavaksi"
              name="valmis"
              checked={lomakeData.valmis}
              onChange={handleCheckbox}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.TextArea
              label="Viesti"
              placeholder="Kommentti toiselle tutkijalle tms."
              name="viesti"
              value={lomakeData.viesti}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" onClick={lahetaPaivitettyData}>
            Tallenna muutokset
          </Button>
          <Button onClick={hallinnoiSulku}>Peruuta</Button>
        </Form>
      </Container>
    </Modal>
  );
}
