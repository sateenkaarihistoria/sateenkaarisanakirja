import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Modal, Header } from 'semantic-ui-react';

// TODO virheen käsittely duplikaatti emailin tapauksissa tehty erittäin rumasti, korjattava?
// TODO salasanat, vain salasanan "omistaja" saa muuttaa salasanaansa editoinnin yhteydessä?
const TekijaPaivitys = (props) => {
  const { aktiivinenTekija, updateHandler } = props
  //const [errors, setErrors] = useState(null);
  const [paivitysModaaliAktiivinen, setPaivitysModaaliAktiivinen] = useState(false)
  const [lomakeData, setLomakeData] = useState({
    etunimi: '',
    sukunimi: '',
    ammattinimike: '',
    henkilo_maa: '',
    henkilo_paikkakunta: '',
  });

  useEffect(() => {
      setLomakeData({
        etunimi: aktiivinenTekija.etunimi,
        sukunimi: aktiivinenTekija.sukunimi,
        ammattinimike: aktiivinenTekija.ammattinimike,
        henkilo_maa: aktiivinenTekija.maa,
        henkilo_paikkakunta: aktiivinenTekija.paikkakunta,
      })
  // eslint-disable-next-line
  }, [aktiivinenTekija]);


  const handleChange = (event, result) => {
    const { name, value } = result || event.target;
    setLomakeData({...lomakeData, [name]: value });
  }


  const lahetaPaivitettyData = (e) => {
    e.preventDefault()
    const uusiData = {
      etunimi: lomakeData.etunimi,
      sukunimi: lomakeData.sukunimi,
      ammattinimike: lomakeData.ammattinimike,
      henkilo_maa: lomakeData.henkilo_maa,
      henkilo_paikkakunta: lomakeData.henkilo_paikkakunta,
    }
    if (uusiData.hakusana === '' || uusiData.sanaluokka === '') {
      //setErrors('Ei tyhjiä kenttiä')
      console.log('Ei tyhjiä kenttiä')
    } else {
      updateHandler ({ tyyppi: 'tekija', id: aktiivinenTekija.id }) (uusiData)
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
        <Header>Päivitä tekijän tiedot</Header>
        <Form>
          <Form.Group width="equals">
            <Form.Input
              label='Tekijän etunimi'
              name='etunimi'
              value={ lomakeData.etunimi }
              onChange={ handleChange }
            />
            <Form.Input
              label='Tekijän sukunimi'
              name='sukunimi'
              value={ lomakeData.sukunimi }
              onChange={ handleChange }
            />
            <Form.Input
              label='Tekijän ammatti'
              name='ammattinimike'
              value={ lomakeData.ammattinimike }
              onChange={ handleChange }
            />
          </Form.Group>
          <Form.Group width="equals">
            <Form.Input
              label='Tekijän maa'
              name='henkilo_paikkakunta'
              value={ lomakeData.henkilo_paikkakunta }
              onChange={ handleChange }
            />
            <Form.Input
              label='Tekijän maa'
              name='henkilo_maa'
              value={ lomakeData.henkilo_maa }
              onChange={ handleChange }
            />
          </Form.Group>
          <Button onClick={ lahetaPaivitettyData }>Tallenna muutokset</Button> 
          <Button onClick={ hallinnoiSulku }>Peruuta</Button>
        </Form>
      </Container>
    </Modal>
 );
}

export default TekijaPaivitys