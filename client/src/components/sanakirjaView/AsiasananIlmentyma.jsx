import React, { useState } from 'react';
import { Table, Button, Confirm } from 'semantic-ui-react';
import { useStateValue } from '../../context';
import IlmentymaPaivitys from './IlmentymaPaivitys';
import ViestiTutkijalle from '../ViestiTutkijalle';

import './AsiasananIlmentyma.css';

const AsiasananIlmentyma = ({ ilmentyma, poistoHandler, updateHandler }) => {
  const [vahvistaPoistoNakyvissa, setVahvistaPoistoNakyvissa] = useState(false);

  const [{ user }] = useStateValue();

  const poistonVahvistus = () => {
    setVahvistaPoistoNakyvissa(true);
  };

  const poistaIlmentyma = () => {
    poistoHandler(ilmentyma.id);
    setVahvistaPoistoNakyvissa(false);
  };

  const naytaMuokkauspainikkeet = () => {
    if (user) {
      return (
        <Table.Row>
          <Table.Cell>
            <IlmentymaPaivitys
              ilmentyma={ilmentyma}
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
    user &&
    ilmentyma.viesti !== null &&
    ilmentyma.viesti !== undefined &&
    ilmentyma.viesti !== '' ? (
      <ViestiTutkijalle viesti={ilmentyma.viesti} valmis={ilmentyma.valmis} />
    ) : null;

  return (
    <>
      <Table className="very basic table" textAlign="left">
        <Table.Body>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Selite</b>
            </Table.Cell>
            <Table.Cell>{ilmentyma.selite}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <b>Tyylilaji</b>
            </Table.Cell>
            <Table.Cell>{ilmentyma.tyyli}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <b>Käyttöala</b>
            </Table.Cell>
            <Table.Cell>{ilmentyma.kayttoala}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell colSpan={2}>
              <div>{`${ilmentyma.hs_osio}: "${ilmentyma.lause}"`}</div>
              <div>
                {`${ilmentyma.sivunumero.slice(
                  0,
                  2,
                )}-${ilmentyma.sivunumero.slice(
                  2,
                  6,
                )}-${ilmentyma.sivunumero.slice(
                  6,
                  8,
                )}-${ilmentyma.sivunumero.slice(
                  8,
                  10,
                )}-${ilmentyma.sivunumero.slice(10, 13)}`}
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <b>Asiasana</b>
            </Table.Cell>
            <Table.Cell>{ilmentyma.asiasana.join(', ')}</Table.Cell>
          </Table.Row>
          {naytaViestiTutkijalle()}
          {naytaMuokkauspainikkeet()}
        </Table.Body>
      </Table>
      <Confirm
        open={vahvistaPoistoNakyvissa}
        content="Oletko varma, että haluat poistaa ilmentymän?"
        size="tiny"
        cancelButton="Peru"
        confirmButton="Poista"
        onCancel={() => setVahvistaPoistoNakyvissa(false)}
        onConfirm={poistaIlmentyma}
      />
    </>
  );
};

export default AsiasananIlmentyma;
