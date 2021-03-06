import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Container,
  Loader,
  Segment,
  Grid,
  Responsive,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RdHeader from '../RdHeader';
import RdMenu from '../RdMenu';
import {
  getAsiasanat,
  getAsiasanatV,
  deleteData,
  putData,
} from '../../api/api';
import { useStateValue } from '../../context';

import AktiivinenAsiasana from './AktiivinenAsiasana';
import HakuKomponentti from '../HakuKomponentti';
import Kirjainhakukomponentti from '../Kirjainhakukomponentti';
import {
  suodata,
  suodataKokoelma,
  valitseHakumetodi,
} from '../../utilities/hakutoiminnot';
import MobileMenu from '../MobileMenu';

const SanakirjaPlain = ({ className }) => {
  const [asiasanat, setAsiasanat] = useState([]);
  const [ladataan, setLadataan] = useState(true);
  const history = useHistory();
  const [aktiivinenAsiasana, setAktiivinenAsiasana] = useState(undefined);
  const [{ user }] = useStateValue();

  const [suodatusoptio, setSuodatusoptio] = useState('');
  const [hakutermi, setHakutermi] = useState('');
  const [suodatusPaalla, setSuodatusPaalla] = useState(false);

  const haeAsiasanat = async () => {
    const result = await getAsiasanat();
    if (result.status === 'success') {
      result.data.sanat.sort((a, b) =>
        a.sana.toLowerCase() < b.sana.toLowerCase() ? -1 : 1,
      );
      setAsiasanat(result.data.sanat);
    } else {
      // TODO FAILURE
    }
  };

  // Effect hook hakee asiasanat valmiiksi kutsumalla api.js haeAsiasanat-funktiota
  // ennen komponentin renderöintiä
  useEffect(() => {
    setLadataan(true);
    // haeAsiasanat-funktio palauttaa Promisen
    haeAsiasanat().then(setLadataan(false));
  }, []);

  const suodataHakusanalla = suodata('sana');
  const suodataIlmentymatAsiasanalla = suodataKokoelma('ilmentymat')(
    'asiasana',
  );

  const hakusanojenSuodatus = () => {
    let suodatetutAsiasanat = [];

    const { hakutermiTrim, predikaatti } = valitseHakumetodi(hakutermi);
    if (suodatusPaalla) {
      switch (suodatusoptio) {
        case 'kirjainhaku':
          suodatetutAsiasanat = suodataHakusanalla(hakutermiTrim)(predikaatti)(
            asiasanat,
          );
          break;
        case 'hakusana':
          suodatetutAsiasanat = suodataHakusanalla(hakutermiTrim)(predikaatti)(
            asiasanat,
          );
          break;
        case 'asiasana':
          suodatetutAsiasanat = suodataIlmentymatAsiasanalla(hakutermiTrim)(
            predikaatti,
          )(asiasanat);
          break;
        default:
          suodatetutAsiasanat = asiasanat;
          break;
      }
    } else {
      suodatetutAsiasanat = asiasanat;
    }
    // jos käyttäjä ei ole kirjautuneena, poistetaan hakusanoista ne joissa ei ole
    // yhtään ilmentymää jossa valmis = true
    if (!user) {
      suodatetutAsiasanat = suodatetutAsiasanat.filter((as) =>
        as.ilmentymat.some((ilm) => ilm.valmis === true),
      );
    }

    return suodatetutAsiasanat;
  };

  // Vuodella rajatut asiasanat
  const haeAsiasanatV = async (alku, loppu) => {
    const result = await getAsiasanatV(alku, loppu);
    if (result.status === 'success') {
      result.data.sanat.sort((a, b) =>
        a.sana.toLowerCase() < b.sana.toLowerCase() ? -1 : 1,
      );
      setAsiasanat(result.data.sanat);
    } else {
      // TODO FAILURE
    }
  };

  const suodatusMuutettu = (suodatusBool, optio, htermi, alku, loppu) => {
    setAktiivinenAsiasana(undefined);
    setSuodatusPaalla(suodatusBool);
    setSuodatusoptio(optio);
    setHakutermi(htermi);

    if (alku === 'undefined') {
      haeAsiasanat();
    } else {
      haeAsiasanatV(alku, loppu);
    }
  };

  /* const suodatusVuosiMuutettu = (suodatusBool, optio, alku, loppu) => {
    setAktiivinenAsiasana(undefined);
    setSuodatusPaalla(suodatusBool);
    setSuodatusoptio(optio);
    setHakutermi(hakutermi);

    haeAsiasanatV(alku, loppu);
  }; */

  const naytaAsiasanat = () => {
    const suodatetutAsiasanat = hakusanojenSuodatus();
    return (
      <>
        {suodatetutAsiasanat.map((item) => (
          <Grid.Row key={`${item.sana};${item.sanaluokka}`}>
            <div
              className="menuitem"
              onClick={(event) => {
                const sana = { ...item };
                sana.y = event.target.offsetTop;
                setAktiivinenAsiasana(sana);
              }}
            >
              <b>{String(item.sana)[0] + String(item.sana).slice(1)}</b>{' '}
              {`(${item.sanaluokka})`}
            </div>
          </Grid.Row>
        ))}
      </>
    );
  };

  const SANAKIRJA_HAKUOPTIOT = [
    { key: 'hakusana', text: 'Hakusana', value: 'hakusana' },
    { key: 'asiasana', text: 'Asiasana', value: 'asiasana' },
  ];

  const SANAKIRJA_DEFAULT = 'hakusana';

  const poistoHandler = (poistettava) => (as_id) => (ilm_id) => {
    switch (poistettava) {
      case 'hakusana':
        deleteData('/api/hakusana/', as_id, user.token).then((result) => {
          if (result.status === 'success') {
            haeAsiasanat().then(() => {
              setAktiivinenAsiasana(null);
            });
          }
        });
        break;
      case 'ilmentyma':
        deleteData('/api/ilmentyma/', ilm_id, user.token).then((result) => {
          if (result.status === 'success') {
            haeAsiasanat().then(() => {
              setAktiivinenAsiasana(null);
            });
          }
        });
        break;
      default:
        break;
    }
  };

  const updateHandler = (muutettava) => (uusiData) => {
    const { tyyppi, id } = muutettava;
    switch (tyyppi) {
      case 'hakusana':
        putData('/api/hakusana/', uusiData, id, user.token).then((result) => {
          if (result.status === 'success') {
            haeAsiasanat().then(() => {
              setAktiivinenAsiasana(null);
            });
          }
        });
        break;
      case 'ilmentyma':
        putData('/api/ilmentyma/', uusiData, id, user.token).then((result) => {
          if (result.status === 'success') {
            haeAsiasanat().then(() => {
              setAktiivinenAsiasana(null);
            });
          }
        });
        break;
      default:
        break;
    }
  };

  const Sanalistaus = () => (
    <Segment basic>
      <Kirjainhakukomponentti suodatusMuutettu={suodatusMuutettu} />
      <HakuKomponentti
        hakuOptiot={SANAKIRJA_HAKUOPTIOT}
        defaultHaku={SANAKIRJA_DEFAULT}
        suodatusMuutettu={suodatusMuutettu}
        vuosiHaku
      />
      <Grid columns={16} id="tuloksetGrid">
        <Grid.Row>
          <Grid.Column width={6} textAlign="left">
            {naytaAsiasanat()}
          </Grid.Column>
          <Grid.Column verticalAlign="top" width={10}>
            {aktiivinenAsiasana ? (
              <AktiivinenAsiasana
                aktiivinenAsiasana={aktiivinenAsiasana}
                suodatus={{ suodatusPaalla, suodatusoptio, hakutermi }}
                poistoHandler={poistoHandler}
                updateHandler={updateHandler}
              />
            ) : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );

  const Latauskomponentti = () => <Loader active>Ladataan tietoja</Loader>;

  return (
    <div className={className}>
      <Container>
        <RdHeader />
        <Responsive minWidth={100} maxWidth={991}>
          <MobileMenu history={history} />
        </Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <RdMenu history={history} activeItem="sanakirja" />
        </Responsive>
        {ladataan ? Latauskomponentti() : Sanalistaus()}
      </Container>
    </div>
  );
};

const Sanakirja = styled(SanakirjaPlain)`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.primary.main};

  h1.ui.header {
    text-align: center;
  }

  .input {
    margin-top: 4rem;
  }

  .ui.icon.input > i.icon {
    background: #9b59b6;
  }
`;

Sanakirja.propTypes = {
  className: PropTypes.string,
};

export default Sanakirja;
