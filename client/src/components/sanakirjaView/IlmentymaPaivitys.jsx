import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Modal, Header } from 'semantic-ui-react';

// TODO virheen käsittely duplikaatti emailin tapauksissa tehty erittäin rumasti, korjattava?
// TODO salasanat, vain salasanan "omistaja" saa muuttaa salasanaansa editoinnin yhteydessä?
export default function IlmentymaPaivitys(props) {
  const { ilmentyma, updateHandler } = props;
  const [paivitysModaaliAktiivinen, setPaivitysModaaliAktiivinen] = useState(
    false,
  );
  const [lomakeData, setLomakeData] = useState({
    hs_osio: '',
    paivays: '',
    selite: '',
    tyyli: '',
    kayttoala: '',
    lause: '',
    valmis: false,
    viesti: '',
    asiasana: '',
  });

  useEffect(() => {
    // setIsEdit(true);
    setLomakeData({
      hs_osio: ilmentyma.hs_osio,
      paivays: ilmentyma.sivunumero,
      selite: ilmentyma.selite,
      tyyli: ilmentyma.tyyli,
      kayttoala: ilmentyma.kayttoala,
      lause: ilmentyma.lause,
      valmis: ilmentyma.valmis,
      viesti: ilmentyma.viesti,
      asiasana: ilmentyma.asiasana.join(';'),
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
    // @body: hs_osio, paivays, selite, tyyli, kayttoala, lause, kuvaus, viesti, valmis
    const uusiData = {
      hs_osio: lomakeData.hs_osio,
      paivays: lomakeData.paivays,
      selite: lomakeData.selite,
      tyyli: lomakeData.tyyli,
      kayttoala: lomakeData.kayttoala,
      lause: lomakeData.lause,
      valmis: lomakeData.valmis,
      viesti: lomakeData.viesti,
      kuvaus: lomakeData.asiasana,
    };
    if (
      uusiData.hs_osio === '' ||
      uusiData.paivays === '' ||
      uusiData.selite === '' ||
      uusiData.tyyli === '' ||
      uusiData.kayttoala === '' ||
      uusiData.lause === '' ||
      uusiData.asiasana === ''
    ) {
      console.log('Virhe! Ei tyhjiä kenttiä.');
    } else {
      updateHandler({ tyyppi: 'ilmentyma', id: ilmentyma.id })(uusiData);
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
        <Header>Ilmentymän tietojen päivitys</Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              label="Päiväys"
              name="paivays"
              value={lomakeData.paivays}
              onChange={handleChange}
            />
            <Form.Input
              label="Lehden osio"
              name="hs_osio"
              value={lomakeData.hs_osio}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Asiasana"
              name="asiasana"
              value={lomakeData.asiasana}
              onChange={handleChange}
            />
            <Form.TextArea
              label="Selite"
              name="selite"
              rows="4"
              value={lomakeData.selite}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Tyyli"
              name="tyyli"
              value={lomakeData.tyyli}
              onChange={handleChange}
            />
            <Form.Input
              label="Käyttöala"
              name="kayttoala"
              value={lomakeData.kayttoala}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.TextArea
              label="Lause"
              name="lause"
              rows="4"
              value={lomakeData.lause}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Checkbox
              style={{ marginTop: '1.0rem', marginBottom: '1.0rem' }}
              label="Sanan syöttö on valmis julkaistavaksi"
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
