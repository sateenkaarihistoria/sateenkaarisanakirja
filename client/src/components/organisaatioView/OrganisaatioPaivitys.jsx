import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Modal, Header } from 'semantic-ui-react';

// TODO virheen käsittely duplikaatti emailin tapauksissa tehty erittäin rumasti, korjattava?
// TODO salasanat, vain salasanan "omistaja" saa muuttaa salasanaansa editoinnin yhteydessä?
const OrganisaatioPaivitys = (props) => {
  const { aktiivinenOrganisaatio, updateHandler } = props
  //const [errors, setErrors] = useState(null);
  const [paivitysModaaliAktiivinen, setPaivitysModaaliAktiivinen] = useState(false)
  const [lomakeData, setLomakeData] = useState({
    nimi: '',
    maa: '',
    paikkakunta: ''
  });

  useEffect(() => {
      setLomakeData({
        nimi: aktiivinenOrganisaatio.nimi,
        maa: aktiivinenOrganisaatio.maa,
        paikkakunta: aktiivinenOrganisaatio.paikkakunta
      })
  // eslint-disable-next-line
  }, [aktiivinenOrganisaatio]);


  const handleChange = (event, result) => {
    const { name, value } = result || event.target;
    setLomakeData({...lomakeData, [name]: value });
  }


  const lahetaPaivitettyData = (e) => {
    e.preventDefault()
    const uusiData = {
      org_nimi: lomakeData.nimi,
      maa: lomakeData.maa,
      paikkakunta: lomakeData.paikkakunta
    }
    if (uusiData.nimi === '' || uusiData.maa === '' || uusiData.paikkakunta === ''
    )
    {
      //setErrors('Ei tyhjiä kenttiä')
      console.log('Ei tyhjiä kenttiä.')
    } else {
      updateHandler ({ tyyppi: 'organisaatio', id: aktiivinenOrganisaatio.id }) (uusiData)
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
      <Container    style={{ padding: "2rem"}}>
        <Header>Päivitä organisaation tiedot</Header>
        <Form>
          <Form.Input
            label='Nimi'
            name='nimi'
            value={ lomakeData.nimi }
            onChange={ handleChange }
          />
          <Form.Input
            label='Paikkakunta'
            name='paikkakunta'
            value={ lomakeData.paikkakunta }
            onChange={ handleChange }
          />
          <Form.Input
            label='Maa'
            name='maa'
            value={ lomakeData.maa }
            onChange={ handleChange }
          />
          <Button onClick={ lahetaPaivitettyData }>Tallenna muutokset</Button> 
          <Button onClick={ hallinnoiSulku }>Peruuta</Button>
        </Form>
      </Container>
    </Modal>
 );
}

export default OrganisaatioPaivitys