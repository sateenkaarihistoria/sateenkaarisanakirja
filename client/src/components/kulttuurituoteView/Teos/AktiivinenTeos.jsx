import React, { useState } from 'react';
import { Button, Confirm, Divider, Table, Header } from 'semantic-ui-react';
import { useStateValue } from '../../../context';
import TeosIlmentyma from './TeosIlmentyma';
import { valitseHakumetodi } from '../../../utilities/hakutoiminnot';
import TeosPaivitys from '../Tekija/TeosPaivitys';

import './AktiivinenTeos.css';

const AktiivinenTeos = ({
  aktiivinenTeos,
  suodatus,
  poistoHandler,
  updateHandler,
}) => {
  const { suodatusPaalla, suodatusoptio, hakutermi } = suodatus;
  const [vahvistaPoistoNakyvissa, setVahvistaPoistoNakyvissa] = useState(false);
  const [{ user }] = useStateValue();

  const naytaTekijät = () => {
    let suodatetutTekijat = [];
    if (suodatusPaalla && suodatusoptio === 'asiasana') {
      const { hakutermiTrim, predikaatti } = valitseHakumetodi(hakutermi);
      suodatetutTekijat = aktiivinenTeos.teokset.filter((teos) =>
        predikaatti(hakutermiTrim)(teos.asiasanat[0]),
      );
    } else {
      suodatetutTekijat = aktiivinenTeos.tekijat;
    }

    return suodatetutTekijat.map((tekija) => (
      <TeosIlmentyma key={tekija.id} teos_tekija={tekija} />
    ));
  };

  const poistonVahvistus = () => {
    setVahvistaPoistoNakyvissa(true);
  };

  const poistaTeos = () => {
    poistoHandler('teos')(aktiivinenTeos.id)(null);
    setVahvistaPoistoNakyvissa(false);
  };

  const naytaMuokkauspainikkeet = () => {
    if (user) {
      return (
        <Table.Row>
          <Table.Cell>
            <TeosPaivitys teos={aktiivinenTeos} updateHandler={updateHandler} />
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

  const positionFromTop =
    document.getElementById('tuloksetGrid3').offsetTop * 2.5;
  let divPlace = window.scrollY - positionFromTop;
  divPlace = divPlace > 0 ? divPlace : 0;

  return (
    <div className="" style={{ position: 'relative', top: `${divPlace}px` }}>
      <Header as="h2" style={{ textAlign: 'left', marginBottom: '1rem' }}>
        {aktiivinenTeos.nimi}
      </Header>
      <Table className="very basic table" textAlign="left">
        <Table.Body>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Lajityyppi</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {aktiivinenTeos.lajityyppi}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Teoksen paikkakunta</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {aktiivinenTeos.teos_paikkakunta}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Teoksen maa</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {aktiivinenTeos.teos_maa}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Asiasana</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {aktiivinenTeos.asiasanat.join(', ')}
            </Table.Cell>
          </Table.Row>
          {naytaMuokkauspainikkeet()}
        </Table.Body>
      </Table>
      <Divider />
      {naytaTekijät()}
      <Confirm
        open={vahvistaPoistoNakyvissa}
        content="Oletko varma, teoksen"
        size="tiny"
        cancelButton="Peru"
        confirmButton="Poista"
        onCancel={() => setVahvistaPoistoNakyvissa(false)}
        onConfirm={poistaTeos}
      />
    </div>
  );
};

export default AktiivinenTeos;
