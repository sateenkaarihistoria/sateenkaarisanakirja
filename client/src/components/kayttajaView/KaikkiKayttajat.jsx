import React from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';

export default function KaikkiKayttajat(props) {
  const history = useHistory();
  const { kayttajat } = props;
  const KayttajaData = kayttajat.map((kayttaja) => (
    <Table.Row key={kayttaja.id}>
      <Table.Cell>{kayttaja.id}</Table.Cell>
      <Table.Cell>{kayttaja.nimi}</Table.Cell>
      <Table.Cell>{kayttaja.rooli}</Table.Cell>
      <Table.Cell textAlign="center">
        <Button
          compact
          size="mini"
          onClick={() => history.push('/kayttajalomake', kayttaja)}
        >
          Edit
        </Button>
        <Button
          compact
          size="mini"
          onClick={() => props.avaaModaali(kayttaja.id)}
        >
          Poista
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Table basic selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Nimi</Table.HeaderCell>
          <Table.HeaderCell>Rooli</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>

      <Table.Body>{KayttajaData}</Table.Body>
    </Table>
  );
}
