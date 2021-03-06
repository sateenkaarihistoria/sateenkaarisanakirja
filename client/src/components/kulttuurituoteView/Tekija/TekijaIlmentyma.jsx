import React, { useState } from 'react';
import { Button, Confirm, Table } from 'semantic-ui-react';
import { useStateValue } from '../../../context';
import TeosPaivitys from './TeosPaivitys';
import ViestiTutkijalle from '../../ViestiTutkijalle';

import './TekijaIlmentyma.css';

const TekijaIlmentyma = ({ teos, poistoHandler, updateHandler }) => {
  const [vahvistaPoistoNakyvissa, setVahvistaPoistoNakyvissa] = useState(false);

  const [{ user }] = useStateValue();

  const poistonVahvistus = () => {
    setVahvistaPoistoNakyvissa(true);
  };

  const poistaTeos = () => {
    poistoHandler(teos.id);
    setVahvistaPoistoNakyvissa(false);
  };

  const naytaMuokkauspainikkeet = () => {
    if (user) {
      return (
        <Table.Row>
          <Table.Cell>
            <TeosPaivitys teos={teos} updateHandler={updateHandler} />
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
    user && !teos.valmis ? <ViestiTutkijalle viesti={teos.viesti} /> : null;

  return (
    <>
      <Table className="very basic table" textAlign="left">
        <Table.Body>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Teoksen nimi</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">{teos.nimi}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Teoslaji</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {teos.lajityyppi}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Teoksen paikkakunta</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {teos.teos_paikkakunta}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Teoksen maa</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {teos.teos_maa}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Asiasanat</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {teos.asiasanat.join(', ')}
            </Table.Cell>
          </Table.Row>
          {naytaViestiTutkijalle()}
          {naytaMuokkauspainikkeet()}
        </Table.Body>
      </Table>
      <Confirm
        open={vahvistaPoistoNakyvissa}
        content="Oletko varma, että haluat poistaa teoksen?"
        size="tiny"
        cancelButton="Peru"
        confirmButton="Poista"
        onCancel={() => setVahvistaPoistoNakyvissa(false)}
        onConfirm={poistaTeos}
      />
    </>
  );
};

export default TekijaIlmentyma;
