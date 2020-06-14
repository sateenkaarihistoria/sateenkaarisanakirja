import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Container, Button, Form, Grid, Message, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RdHeader from './RdHeader';
import RdMenu from './RdMenu';
import MobileMenu from './MobileMenu';
import { postLogin } from '../api/api';
import UserContext from '../context/userContext';

const Kirjautuminen = ({ className }) => {
  const history = useHistory();
  const sessioData = useContext(UserContext);
  const [nimi, setNimi] = useState('');
  const [salasana, setSalasana] = useState('');
  const [message, setMessage] = useState(undefined);

  const login = () => {
    postLogin(nimi, salasana).then(result => {
      if (result.status === 'success') {
        sessioData.setToken(result.data.token);
        sessioData.setId(result.data.id);
        sessioData.setNimi(result.data.nimi);
        sessioData.setRooli(result.data.rooli);
        setNimi('');
        setSalasana('');
        history.push('/sanakirja');
      } else {
        setMessage('Tarkista käyttäjätunnus ja salasana.');
      }
    });
  };

  return (
    <div className={className}>
      <Container>
        <RdHeader />
        <Responsive minWidth={100} maxWidth={991}>
          <MobileMenu history={history} />
        </Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <RdMenu history={history} activeItem="kirjautuminen" />
        </Responsive>
        <Grid centered>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <div className="loginheader">
              { message 
                ? <Message negative>{ message }</Message> 
                : null }
            </div>
            <Form onSubmit={login}>
              <Form.Input
                label="Nimi"
                placeholder="Nimi"
                value={nimi}
                onChange={(e, { value }) => setNimi(value)}
              />
              <Form.Input
                label="Salasana"
                type="password"
                placeholder="Salasana"
                value={salasana}
                onChange={(e, { value }) => setSalasana(value)}
              />
              <Button type="submit">Kirjaudu</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

const RdLogin = styled(Kirjautuminen)`
  width: 100%;
  height: 100vh;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.primary.main};

  .loginheader {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
`;

Kirjautuminen.propTypes = {
  className: PropTypes.string,
};

export default RdLogin;
