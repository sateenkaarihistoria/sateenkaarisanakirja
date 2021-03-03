import React, { useState, useContext } from 'react';
import { Button, Confirm, Divider, Table, Header } from 'semantic-ui-react';
import AsiasananIlmentyma from './AsiasananIlmentyma';
import { valitseHakumetodi } from '../../utilities/hakutoiminnot';
import UserContext from '../../context/userContext';
import SanaPaivitys from './SanaPaivitys';

import './AktiivinenAsiasana.css';

const AktiivinenAsiasana = ({
  aktiivinenAsiasana,
  suodatus,
  poistoHandler,
  updateHandler,
}) => {
  const [vahvistaPoistoNakyvissa, setVahvistaPoistoNakyvissa] = useState(false);
  const { suodatusPaalla, suodatusoptio, hakutermi } = suodatus;
  const sessioData = useContext(UserContext);

  const naytaIlmentymat = () => {
    let suodatetutIlmentymat = [];
    if (suodatusPaalla && suodatusoptio === 'asiasana') {
      let { hakutermiTrim, predikaatti } = valitseHakumetodi(hakutermi);
      suodatetutIlmentymat = aktiivinenAsiasana.ilmentymat.filter(ilmentyma =>
        ilmentyma['asiasana'].some(sana => predikaatti(hakutermiTrim)(sana)),
      );
    } else {
      suodatetutIlmentymat = aktiivinenAsiasana.ilmentymat;
    }
    // jos käyttäjä ei ole kirjautunut, poistetaan ne ilmentymät jotka eivät ole
    // valmis = true statuksella
    if (!sessioData.token) {
      suodatetutIlmentymat = suodatetutIlmentymat.filter(
        ilm => ilm['valmis'] === true,
      );
    }

    return suodatetutIlmentymat
      .sort((a, b) => (a['paivays'] < b['paivays'] ? -1 : 1))
      .map(ilmentyma => (
        <AsiasananIlmentyma
          key={ilmentyma.id}
          ilmentyma={ilmentyma}
          updateHandler={updateHandler}
          poistoHandler={poistoHandler('ilmentyma')(aktiivinenAsiasana.id)}
        />
      ));
  };

  /*const editoiAsiasana = (uusiData) => { 
    updateHandler ({ tyyppi: 'hakusana', id: aktiivinenAsiasana.id }) (uusiData)
    setPaivitysModaaliAktiivinen(false)
  }*/

  const poistonVahvistus = () => {
    setVahvistaPoistoNakyvissa(true);
  };

  const poistaAsiasana = () => {
    poistoHandler('hakusana')(aktiivinenAsiasana.id)(null);
    setVahvistaPoistoNakyvissa(false);
  };

  const naytaMuokkauspainikkeet = () => {
    if (sessioData.token !== null) {
      return (
        <Table.Row>
          <Table.Cell colSpan="2">
            <SanaPaivitys
              aktiivinenAsiasana={aktiivinenAsiasana}
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

  const positionFromTop = document.getElementById("tuloksetGrid").offsetTop * 2;
  let divPlace = window.scrollY - positionFromTop;
  divPlace = divPlace > 0 ? divPlace : 0;

  return (
  <div className="" style={{ position: "relative", top: divPlace + "px" }}>
      <Header as="h2" style={{ textAlign: 'left', marginBottom: '1rem' }}>
        {String(aktiivinenAsiasana.sana)[0].toUpperCase() +
          String(aktiivinenAsiasana.sana).slice(1)}
      </Header>
      <Table className={'very basic table'} textAlign="left">
        <Table.Body>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Sanaluokka</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {aktiivinenAsiasana.sanaluokka}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Ensimmäinen</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {aktiivinenAsiasana.aikaisin}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Viimeinen</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {aktiivinenAsiasana.viimeisin}
            </Table.Cell>
          </Table.Row>
          {naytaMuokkauspainikkeet()}
        </Table.Body>
      </Table>
      <Divider />
      {naytaIlmentymat()}
      <Confirm
        open={vahvistaPoistoNakyvissa}
        content="Oletko varma, että haluat poistaa sanan ilmentymineen?"
        size="tiny"
        cancelButton="Peru"
        confirmButton="Poista"
        onCancel={() => setVahvistaPoistoNakyvissa(false)}
        onConfirm={poistaAsiasana}
      />
    </div>
  );
};

export default AktiivinenAsiasana;
