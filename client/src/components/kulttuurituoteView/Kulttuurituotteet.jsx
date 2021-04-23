import React, { useState } from 'react';
import styled from 'styled-components';
import { Segment, Button, Container, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RdHeader from '../RdHeader';
import RdMenu from '../RdMenu';
import MobileMenu from '../MobileMenu';
import TekijaNaytto from './Tekija/TekijaNaytto';
import TeosNaytto from './Teos/TeosNaytto';

const KulttuurituotteetPlain = ({ className }) => {
  const [tekijaAktiivinen, setTekijaAktiivinen] = useState(true);

  const history = useHistory();

  const naytaValittuOsio = () =>
    tekijaAktiivinen ? <TekijaNaytto /> : <TeosNaytto />;

  return (
    <div className={className}>
      <Container>
        <RdHeader />
        <Responsive minWidth={100} maxWidth={991}>
          <MobileMenu history={history} />
        </Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <RdMenu history={history} activeItem="kulttuurituotteet" />
        </Responsive>
        <Segment basic style={{ marginTop: '0rem', marginBottom: '0rem' }}>
          <Button onClick={() => setTekijaAktiivinen(true)}>Tekijät</Button>
          <Button onClick={() => setTekijaAktiivinen(false)}>
            Kulttuurituotteet
          </Button>
        </Segment>
        {naytaValittuOsio()}
      </Container>
    </div>
  );
};

const Kulttuurituotteet = styled(KulttuurituotteetPlain)`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.primary.main};

  h1.ui.header {
    text-align: center;
  }

  .input {
    margin-top: 4rem;
  }

  .ui.icon.input > i.icon {
    background: #9b59b6;
  }
`;

Kulttuurituotteet.propTypes = {
  className: PropTypes.string,
};

export default Kulttuurituotteet;
