import React from 'react';
import { Table } from 'semantic-ui-react';

const ViestiTutkijalle = ({ viesti, valmis }) => (
  <Table.Row>
    <Table.Cell colSpan="2">
      <span style={{ color: 'red' }}>
        <b>Status:</b> {valmis ? 'valmis' : 'kesken'}
        <br />
        <b>Viesti:</b> {viesti}
      </span>
    </Table.Cell>
  </Table.Row>
);

export default ViestiTutkijalle;
