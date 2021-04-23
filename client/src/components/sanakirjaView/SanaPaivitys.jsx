import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Modal, Header } from 'semantic-ui-react';

// TODO virheen käsittely duplikaatti emailin tapauksissa tehty erittäin rumasti, korjattava?
// TODO salasanat, vain salasanan "omistaja" saa muuttaa salasanaansa editoinnin yhteydessä?
const SanaPaivitys = (props) => {
  const { aktiivinenAsiasana, updateHandler } = props;
  // const [errors, setErrors] = useState(null);
  const [paivitysModaaliAktiivinen, setPaivitysModaaliAktiivinen] = useState(
    false,
  );
  const [lomakeData, setLomakeData] = useState({
    hakusana: '',
    sanaluokka: '',
  });

  useEffect(() => {
    setLomakeData({
      hakusana: aktiivinenAsiasana.sana,
      sanaluokka: aktiivinenAsiasana.sanaluokka,
    });
    return () =>
      setLomakeData({
        hakusana: '',
        sanaluokka: '',
      });
  }, [aktiivinenAsiasana]);

  const handleChange = (event, result) => {
    const { name, value } = result || event.target;
    setLomakeData({ ...lomakeData, [name]: value });
  };

  const hallinnoiSulku = (e) => {
    if (e) e.preventDefault();
    setPaivitysModaaliAktiivinen(false);
  };

  const lahetaPaivitettyData = (e) => {
    if (e) e.preventDefault();
    const uusiData = {
      sana: lomakeData.hakusana,
      sanaluokka: lomakeData.sanaluokka,
    };
    if (uusiData.hakusana === '' || uusiData.sanaluokka === '') {
      // setErrors('Ei tyhjiä kenttiä')
      console.log('Ei tyhjiä kenttiä!');
    } else {
      updateHandler({ tyyppi: 'hakusana', id: aktiivinenAsiasana.id })(
        uusiData,
      );
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
        <Header>Päivitä hakusanan tiedot</Header>
        <Form>
          <Form.Input
            label="Hakusana"
            name="hakusana"
            value={lomakeData.hakusana}
            onChange={handleChange}
          />
          <Form.Input
            label="Sanaluokka"
            name="sanaluokka"
            value={lomakeData.sanaluokka}
            onChange={handleChange}
          />
          <Button onClick={lahetaPaivitettyData}>Tallenna muutokset</Button>
          <Button onClick={hallinnoiSulku}>Peruuta</Button>
        </Form>
      </Container>
    </Modal>
  );
};

export default SanaPaivitys;
