import React, { useState, useContext } from 'react';
import { Button, Confirm, Divider, Table, Header } from 'semantic-ui-react';
import UserContext from '../../../context/userContext'
import TeosIlmentyma from './TeosIlmentyma';
import TeosPaivitys from '../Tekija/TeosPaivitys'

import './AktiivinenTeos.css'

const AktiivinenTeos = ({ aktiivinenTeos, poistoHandler, updateHandler }) => {
  const [vahvistaPoistoNakyvissa, setVahvistaPoistoNakyvissa] = useState(false)
  const sessioData = useContext(UserContext)

  const poistonVahvistus = () =>{ 
    setVahvistaPoistoNakyvissa(true)
  }

  const poistaTeos = () => {
    poistoHandler ('teos') (aktiivinenTeos.id) (null)
    setVahvistaPoistoNakyvissa(false)
  }

  const naytaMuokkauspainikkeet = () => {
    if (sessioData.token !== null) {
      return (
        <Table.Row>
          <Table.Cell>
            <TeosPaivitys
              teos={aktiivinenTeos}
              updateHandler={updateHandler}
            />
            <Button style={{ margin: '0.5rem' }} compact size='mini' onClick={poistonVahvistus}>Poista</Button>
          </Table.Cell>
        </Table.Row>
      )
    }
  }

  return (
    <div className="">
      <Header as="h2" style={{ textAlign: 'left', marginBottom: '1rem' }}>
        {aktiivinenTeos.nimi}
      </Header>
      <Table className={"very basic table"} textAlign='left'>
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
              {aktiivinenTeos.asiasana[0]}
            </Table.Cell>
          </Table.Row>
          {naytaMuokkauspainikkeet()}
        </Table.Body>
      </Table>
      <Divider />
      <TeosIlmentyma
        teos_tekija={aktiivinenTeos.teos_tekija}
      />
      <Confirm
        open={ vahvistaPoistoNakyvissa }
        content='Oletko varma, teoksen'
        size='tiny'
        cancelButton='Peru'
        confirmButton='Poista'
        onCancel={() => setVahvistaPoistoNakyvissa(false)}
        onConfirm= {poistaTeos}
      />
    </div>
  )
}

export default AktiivinenTeos;
