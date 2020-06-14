import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button, Message, Modal, Responsive } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import RdHeader from '../RdHeader';
import RdMenu from '../RdMenu';
import MobileMenu from '../MobileMenu';
import { postData, putData } from '../../api/api';
import UserContext from '../../context/userContext';

export default function KayttajaLomake(props) {
  const history = useHistory();
  const sessioData = useContext(UserContext);
  const [errors, setErrors] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [lisattyAuki, setLisattyAuki] = useState(false);
  const [muutettuAuki, setMuutettuAuki] = useState(false);
  const [lomakeData, setLomakeData] = useState({
    nimi: '',
    salasana: '',
    rooli: '',
  });

  useEffect(() => {
    if (props.location.state) {
      setIsEdit(true);
      setLomakeData({
        nimi: props.location.state.nimi,
        salasana: '',
        rooli: props.location.state.rooli,
      })
    }
  // eslint-disable-next-line
  }, []);

  const options = [
    { key: 'a', text: 'Admin', value: 'admin' },
    { key: 't', text: 'Tutkija', value: 'tutkija' },
  ]

  const handleChange = (event, result) => {
    const { name, value } = result || event.target;
    setLomakeData({...lomakeData, [name]: value });
  }

  function lisaaKayttaja() {
    postData('/api/kayttaja', lomakeData, sessioData.token).then(result => {
      if (result.status === 'success') {
        setLisattyAuki(true);
      } 
      else {
        hoidaVirheet(result);
      }
    })
  }

  function muutaKayttaja() {
    putData('/api/kayttaja/', lomakeData, props.location.state.id, sessioData.token).then(result => {
      if (result.status === 'success') {
        setMuutettuAuki(true);
      } 
      else {
        hoidaVirheet(result);
      }
    })
  }

  function hoidaVirheet(result) {
    setErrors(result.data.response.data.errors 
      ? result.data.response.data.errors
      // Duplikaatti nimen aiheuttama virhe palauttaa virheen eri muodossa, käsittely vaatii kikkailua
      : [{ msg: JSON.stringify(result.data.response.data) }]);
    //console.log(result.data.response.data);
  }

  function vaihdaNakyma() {
    history.push('/kayttajat');
  }

  return (
    <Container>
      <RdHeader />
      <Responsive minWidth={100} maxWidth={991}>
          <MobileMenu history={history} />
        </Responsive>
      <Responsive {...Responsive.onlyComputer}>
        <RdMenu history={history} activeItem="kayttajalomake" />
      </Responsive>
      <Container text>
        <h1 className='ui header' style={{marginTop: '2rem'}}>
          { isEdit 
            ? 'Muuta tietoja' 
            : 'Uusi käyttäjä' }
        </h1>
        { errors 
          ? <Message negative>
              <Message.Header>Tarkista tiedot</Message.Header>
              {errors.map((error) => { return (<p key={ error.param }> { error.msg }</p>) })}
            </Message> 
        : null }
        <Form>
          <Form.Input
            label='Nimi'
            name='nimi'
            value={ lomakeData.nimi }
            onChange={ handleChange }
          />
          { !isEdit ?
            <Form.Input
              type='password'
              label='Salasana'
              name='salasana'
              value={ lomakeData.salasana }
              onChange={ handleChange }
            /> 
            : null
          }
          <Form.Select
            label='Rooli'
            name='rooli'
            options={ options }
            value={ lomakeData.rooli }
            onChange={ handleChange }
          />
          { isEdit 
            ? <Button onClick={ muutaKayttaja }>Tallenna muutokset</Button> 
            : <Button onClick={ lisaaKayttaja }>Luo uusi</Button> }
        </Form>
      </Container>

      <Modal open={ lisattyAuki } size='tiny'>
        <Modal.Content>Käyttäjä lisätty</Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={ vaihdaNakyma }>Ok</Button>
        </Modal.Actions>
      </Modal>
      <Modal open={ muutettuAuki } size='tiny'>
        <Modal.Content>Käyttäjän tietoja muutettu</Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={ vaihdaNakyma }>Ok</Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
}