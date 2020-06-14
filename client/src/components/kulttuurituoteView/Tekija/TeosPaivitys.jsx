import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Modal, Header } from 'semantic-ui-react';

// TODO virheen käsittely duplikaatti emailin tapauksissa tehty erittäin rumasti, korjattava?
// TODO salasanat, vain salasanan "omistaja" saa muuttaa salasanaansa editoinnin yhteydessä?
export default function TeosPaivitys(props) {
  const { teos, updateHandler } = props
  const [paivitysModaaliAktiivinen, setPaivitysModaaliAktiivinen] = useState(false)
  const [lomakeData, setLomakeData] = useState({
    kuvaus: '',
    teos_maa: '',
    teos_paikkakunta: '',
    nimi: '',
    lajityyppi: '',
    viesti: '',
    valmis: false
  });

  useEffect(() => {
      setLomakeData({
        kuvaus: teos.asiasana[0],
        teos_maa: teos.teos_maa,
        teos_paikkakunta: teos.teos_paikkakunta,
        nimi: teos.nimi,
        lajityyppi: teos.lajityyppi,
        viesti: teos.viesti || '',
        valmis: teos.valmis,
      })
  // eslint-disable-next-line
  }, [teos]);


  const handleChange = (event, result) => {
    const { name, value } = result || event.target;
    setLomakeData({...lomakeData, [name]: value });
  }

  const handleCheckbox = (event, result) => {
    const { name } = result || event.target
    setLomakeData( {...lomakeData, [name]: !lomakeData.valmis });
  };


  const lahetaPaivitettyData = (e) => {
    if (e)
      e.preventDefault()
    // @body: hs_osio, paivays, selite, tyyli, kayttoala, lause, kuvaus, viesti, valmis
    const uusiData = {
      kuvaus: lomakeData.kuvaus,
      teos_maa: lomakeData.teos_maa,
      teos_paikkakunta: lomakeData.teos_paikkakunta,
      nimi: lomakeData.nimi,
      lajityyppi: lomakeData.lajityyppi,
      viesti: lomakeData.viesti,
      valmis: lomakeData.valmis,
    }
    if (
      uusiData.kuvaus === '' || uusiData.teos_maa === '' || uusiData.teos_paikkakunta === '' || 
      uusiData.nimi === '' || uusiData.lajityyppi === ''
    ) {
      console.log("Virhe! Ei tyhjiä kenttiä.")
    } else {
      updateHandler ({ tyyppi: 'teos', id: teos.id }) (uusiData)
      hallinnoiSulku()
    }
  }

  const hallinnoiAvaus = () => setPaivitysModaaliAktiivinen(true)

  const hallinnoiSulku = (e) => {
    if (e)
      e.preventDefault()
    setPaivitysModaaliAktiivinen(false)
  }

  return (
    <Modal
      trigger={
        <Button compact size='mini' onClick={hallinnoiAvaus}>Päivitä</Button>
      }
      open={paivitysModaaliAktiivinen}
    >
    <Container style={{ padding: "2rem" }}>
      <Header>Teoksen tietojen päivitys</Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              label='Teoksen nimi'
              name='nimi'
              value={ lomakeData.nimi }
              onChange={ handleChange }
            />
            <Form.Input
              label='Teoksen lajityyppi'
              name='lajityyppi'
              value={ lomakeData.lajityyppi }
              onChange={ handleChange }
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label='Teoksen asiasana'
              name='kuvaus'
              value={ lomakeData.kuvaus }
              onChange={ handleChange }
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label='Teoksen paikkakunta'
              name='teos_paikkakunta'
              value={ lomakeData.teos_paikkakunta }
              onChange={ handleChange }
            />
            <Form.Input
              label='Teoksen maa'
              name='teos_maa'
              value={ lomakeData.teos_maa }
              onChange={ handleChange }
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Checkbox
                style={{ marginTop: '1.0rem', marginBottom: '1.0rem' }}
                label="Teoksen syöttö on valmis julkaistavaksi"
                name="valmis"
                checked={lomakeData.valmis}
                onChange={ handleCheckbox }
              />          
          </Form.Group>          
          <Form.Group widths="equal">
            <Form.TextArea
              label="Viesti"
              placeholder="Kommentti toiselle tutkijalle tms."
              name="viesti"
              value={lomakeData.viesti}
              onChange={ handleChange }
            />
          </Form.Group>
          <Button type="submit" onClick={ lahetaPaivitettyData }>Tallenna muutokset</Button> 
          <Button onClick={ hallinnoiSulku }>Peruuta</Button>
        </Form>
      </Container>
    </Modal>
  );
}
