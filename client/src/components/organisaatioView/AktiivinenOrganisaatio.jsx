import React, { useState, useContext } from 'react';
import { Button, Confirm, Divider, Table, Header } from 'semantic-ui-react';
import OrganisaationTapahtuma from './OrganisaationTapahtuma';
import { valitseHakumetodi } from '../../utilities/hakutoiminnot';
import { useStateValue } from '../../context/';
import OrganisaatioPaivitys from './OrganisaatioPaivitys';

import './AktiivinenOrganisaatio.css';

const AktiivinenOrganisaatio = ({
  aktiivinenOrganisaatio,
  suodatus,
  poistoHandler,
  updateHandler,
}) => {
  const [vahvistaPoistoNakyvissa, setVahvistaPoistoNakyvissa] = useState(false);
  const { suodatusPaalla, suodatusoptio, hakutermi } = suodatus;

  const [{ user }, dispatch] = useStateValue();

  const naytaTapahtumat = () => {
    let suodatetutTapahtumat = [];
    if (suodatusPaalla && suodatusoptio === 'asiasana') {
      let { hakutermiTrim, predikaatti } = valitseHakumetodi(hakutermi);
      suodatetutTapahtumat = aktiivinenOrganisaatio.tapahtumat.filter(
        tapahtuma => predikaatti(hakutermiTrim)(tapahtuma['asiasana'][0]),
      );
    } else {
      suodatetutTapahtumat = aktiivinenOrganisaatio.tapahtumat;
    }

    // jos käyttäjä ei ole kirjautunut, poistetaan ne ilmentymät jotka eivät ole
    // valmis = true statuksella
    if (!user) {
      suodatetutTapahtumat = suodatetutTapahtumat.filter(
        tap => tap['valmis'] === true,
      );
    }
    return suodatetutTapahtumat.map(tapahtuma => (
      <OrganisaationTapahtuma
        key={tapahtuma.id}
        tapahtuma={tapahtuma}
        updateHandler={updateHandler}
        poistoHandler={poistoHandler('tapahtuma')(aktiivinenOrganisaatio.id)}
      />
    ));
  };

  const poistonVahvistus = () => {
    setVahvistaPoistoNakyvissa(true);
  };

  const poistaAsiasana = () => {
    poistoHandler('organisaatio')(aktiivinenOrganisaatio.id)(null);
    setVahvistaPoistoNakyvissa(false);
  };

  const naytaMuokkauspainikkeet = () => {
    if (user) {
      return (
        <Table.Row>
          <Table.Cell>
            <OrganisaatioPaivitys
              aktiivinenOrganisaatio={aktiivinenOrganisaatio}
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

  const positionFromTop =
    document.getElementById('tuloksetGrid4').offsetTop * 2;
  let divPlace = window.scrollY - positionFromTop;
  divPlace = divPlace > 0 ? divPlace : 0;

  return (
    <div className="" style={{ position: 'relative', top: divPlace + 'px' }}>
      <Header as="h2" style={{ textAlign: 'left', marginBottom: '1rem' }}>
        {aktiivinenOrganisaatio.nimi}
      </Header>
      <Table className={'very basic table'} textAlign="left">
        <Table.Body>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Maa</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {aktiivinenOrganisaatio.maa}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Paikkakunta</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {aktiivinenOrganisaatio.paikkakunta}
            </Table.Cell>
          </Table.Row>
          {naytaMuokkauspainikkeet()}
        </Table.Body>
      </Table>
      <Divider />
      {naytaTapahtumat()}
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

export default AktiivinenOrganisaatio;
