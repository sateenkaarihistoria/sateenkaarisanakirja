import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Button, Grid, Responsive } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import RdHeader from '../RdHeader';
import RdMenu from '../RdMenu';
import MobileMenu from '../MobileMenu';

import Sanalomake from './Sanalomake';
import Kulttuurituotelomake from './Kulttuurituotelomake';
import Organisaatiolomake from './Organisaatiolomake';

const SyottoLomakeRaw = ({ className }) => {
  const history = useHistory();

  const [activeFormId, setActiveFormId] = useState('form1');
  const handleActiveFormChange = (v) => setActiveFormId(v);

  const FormSelectButton = ({ formId, children }) => (
    <Button onClick={() => handleActiveFormChange(formId)}>{children}</Button>
  );

  return (
    <div className={className}>
      <Container>
        <RdHeader />
        <Responsive minWidth={100} maxWidth={991}>
          <MobileMenu history={history} />
        </Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <RdMenu history={history} activeItem="sanalomake" />
        </Responsive>
        <div className="infoheader">
          <Grid centered>
            <FormSelectButton
              formId="form1"
              centered
              input
              type="reset"
              value="reset"
            >
              Lisää sana
            </FormSelectButton>
            <FormSelectButton
              formId="form2"
              centered
              input
              type="reset"
              value="reset"
            >
              Lisää kulttuurituote
            </FormSelectButton>
            <FormSelectButton
              formId="form3"
              centered
              input
              type="reset"
              value="reset"
            >
              Lisää organisaatio
            </FormSelectButton>
          </Grid>
          <br />
          <br />
          <br />
          <Grid centered>
            <Grid.Column mobile={16} tablet={14} computer={12}>
              {activeFormId === 'form1' && <Sanalomake />}
              {activeFormId === 'form2' && <Kulttuurituotelomake />}

              {activeFormId === 'form3' && <Organisaatiolomake />}
            </Grid.Column>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

const SyottoLomake = styled(SyottoLomakeRaw)`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.primary.main};

  .infoheader {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
`;

export default SyottoLomake;
