import React, { useState, useContext } from 'react';
import { Divider, Table, Header, Button, Confirm } from 'semantic-ui-react';
import TekijaIlmentyma from './TekijaIlmentyma';
import { valitseHakumetodi } from '../../../utilities/hakutoiminnot'
import UserContext from '../../../context/userContext'
import TekijaPaivitys from './TekijaPaivitys'

import './AktiivinenTekija.css'

const AktiivinenTekija = ({ aktiivinenTekija, suodatus, poistoHandler, updateHandler }) => {
  const { suodatusPaalla, suodatusoptio, hakutermi } = suodatus
  const [vahvistaPoistoNakyvissa, setVahvistaPoistoNakyvissa] = useState(false)
  const sessioData = useContext(UserContext);
  
  const naytaTeokset = () => {
    let suodatetutTeokset = []
    if (suodatusPaalla && suodatusoptio === 'asiasanat' ) {
      let { hakutermiTrim, predikaatti } = valitseHakumetodi (hakutermi)
      suodatetutTeokset = aktiivinenTekija.teokset.filter(teos => 
        predikaatti (hakutermiTrim) (teos['asiasanat'][0]))
    } else {
      suodatetutTeokset = aktiivinenTekija.teokset
    }

    // jos käyttäjä ei ole kirjautunut, poistetaan ne ilmentymät jotka eivät ole
    // valmis = true statuksella
    if (!sessioData.token) {
      suodatetutTeokset = suodatetutTeokset.filter(teos => teos['valmis'] === true)
    }

    return suodatetutTeokset
      .map(teos => 
        <TekijaIlmentyma
          key={teos.id}
          teos={teos}
          updateHandler={updateHandler}
          poistoHandler={poistoHandler ('teos') (aktiivinenTekija.id)}
        />
    )
  }
  
  const poistonVahvistus = () =>{ 
    setVahvistaPoistoNakyvissa(true)
  }

  const poistaTekija = () => {
    poistoHandler ('tekija') (aktiivinenTekija.id) (null)
    setVahvistaPoistoNakyvissa(false)
  }

  const naytaMuokkauspainikkeet = () => {
    if (sessioData.token !== null) {
      return (
        <Table.Row>
          <Table.Cell>
            <TekijaPaivitys
              aktiivinenTekija={aktiivinenTekija}
              updateHandler={updateHandler}
            />
            <Button style={{ margin: '0.5rem' }} compact size='mini' onClick={poistonVahvistus}>Poista</Button>
          </Table.Cell>
        </Table.Row>
      )
    }
  }

  const positionFromTop = document.getElementById("tuloksetGrid2").offsetTop * 2.5;
  let divPlace = window.scrollY - positionFromTop;
  divPlace = divPlace > 0 ? divPlace : 0;

  return (
    <div className="" style={{ position: "relative", top: divPlace + "px" }}>
      <Header as="h2" style={{ textAlign: 'left', marginBottom: '1rem' }}>
        {aktiivinenTekija.etunimi + " " + aktiivinenTekija.sukunimi}
      </Header>
      <Table className={"very basic table"} textAlign='left'>
        <Table.Body>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Ammatti</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
                {aktiivinenTekija.ammattinimike}
            </Table.Cell>
          </Table.Row>          
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Paikkakunta</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {aktiivinenTekija.paikkakunta}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="table-label-cell">
              <b>Maa</b>
            </Table.Cell>
            <Table.Cell className="table-content-cell">
              {aktiivinenTekija.maa}
            </Table.Cell>
          </Table.Row>
          {naytaMuokkauspainikkeet()}
        </Table.Body>
      </Table>
      <Divider />
      {naytaTeokset()}
      <Confirm
        open={ vahvistaPoistoNakyvissa }
        content='Oletko varma, että haluat poistaa tekijän ja kaikki häneen liittyvät teokset?'
        size='tiny'
        cancelButton='Peru'
        confirmButton='Poista'
        onCancel={() => setVahvistaPoistoNakyvissa(false)}
        onConfirm= {poistaTekija}
      />
    </div>
  )
}

export default AktiivinenTekija;
