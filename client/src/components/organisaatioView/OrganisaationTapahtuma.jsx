import React, { useState, useContext } from 'react';
import { Button, Confirm, Table } from 'semantic-ui-react';
import UserContext from '../../context/userContext';
import TapahtumaPaivitys from './TapahtumaPaivitys';
import ViestiTutkijalle from '../ViestiTutkijalle';

import './OrganisaationTapahtuma.css';

const OrganisaationTapahtuma = ({
  tapahtuma,
  poistoHandler,
  updateHandler,
}) => {
  const [vahvistaPoistoNakyvissa, setVahvistaPoistoNakyvissa] = useState(false);

  const sessioData = useContext(UserContext);

  const poistonVahvistus = () => {
    setVahvistaPoistoNakyvissa(true);
  };

  const poistaTapahtuma = () => {
    poistoHandler(tapahtuma.id);
    setVahvistaPoistoNakyvissa(false);
  };

  const naytaMuokkauspainikkeet = () => {
    if (sessioData.token !== null) {
      return (
        <Table.Row>
          <Table.Cell>
            <TapahtumaPaivitys
              tapahtuma={tapahtuma}
              updateHandler={updateHandler}
            />
            <Button
              style={{ margin: '0.5rem' }}
              compact
              size="mini"
              onClick={poistonVahvistus}
            >
              Poista
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    }
  };

  const naytaViestiTutkijalle = () =>
    sessioData.token && !tapahtuma.valmis ? (
      <ViestiTutkijalle viesti={tapahtuma.viesti} />
    ) : null;

  return (
    <>
      <Table className="very basic table" textAlign="left">
        <Table.Body>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Tapahtuman nimi</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {tapahtuma.nimi}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Tapahtuman luonne</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {tapahtuma.luonne}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Tapahtuman vuosi</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {tapahtuma.paivays}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Asiasanat</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {tapahtuma.asiasana.join(', ')}
            </Table.Cell>
          </Table.Row>
          {naytaViestiTutkijalle()}
          {naytaMuokkauspainikkeet()}
        </Table.Body>
      </Table>
      <Confirm
        open={vahvistaPoistoNakyvissa}
        content="Oletko varma, että haluat poistaa tapahtuman?"
        size="tiny"
        cancelButton="Peru"
        confirmButton="Poista"
        onCancel={() => setVahvistaPoistoNakyvissa(false)}
        onConfirm={poistaTapahtuma}
      />
    </>
  );
};

export default OrganisaationTapahtuma;
