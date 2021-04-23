import React from 'react';
import { Table } from 'semantic-ui-react';

import './TeosIlmentyma.css';

const TeosIlmentyma = ({ teos_tekija }) => (
  <>
    <Table className="very basic table" textAlign="left">
      <Table.Body>
        <Table.Row>
          <Table.Cell className="table-label-cell">
            <b>Tekijän etunimi</b>
          </Table.Cell>
          <Table.Cell className="table-content-cell">
            {teos_tekija.etunimi}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className="table-label-cell">
            <b>Tekijän sukunimi</b>
          </Table.Cell>
          <Table.Cell className="table-content-cell">
            {teos_tekija.sukunimi}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className="table-label-cell">
            <b>Ammatti</b>
          </Table.Cell>
          <Table.Cell className="table-content-cell">
            {teos_tekija.ammattinimike}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className="table-label-cell">
            <b>Tekijän paikkakunta</b>
          </Table.Cell>
          <Table.Cell className="table-content-cell">
            {teos_tekija.paikkakunta}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className="table-label-cell">
            <b>Tekijan maa</b>
          </Table.Cell>
          <Table.Cell className="table-content-cell">
            {teos_tekija.maa}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </>
);

export default TeosIlmentyma;
