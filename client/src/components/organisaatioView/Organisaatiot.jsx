import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Container, Grid, Segment, Loader, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RdHeader from '../RdHeader';
import RdMenu from '../RdMenu';
import MobileMenu from '../MobileMenu';
import { getOrganisaatiot, deleteData, putData } from '../../api/api';
import UserContext from '../../context/userContext'
import Kirjainhakukomponentti from '../Kirjainhakukomponentti'
import Hakukomponentti from '../HakuKomponentti'
import { suodata, suodataKokoelma, valitseHakumetodi } from '../../utilities/hakutoiminnot'
import AktiivinenOrganisaatio from './AktiivinenOrganisaatio'

const OrganisaatiotPlain = ({ className, }) => {
  const [organisaatiolista, setOrganisaatiolista] = useState([]);
  const [ladataan, setLadataan] = useState(true);
  const [aktiivinenOrganisaatio, setAktiivinenOrganisaatio] = useState(undefined);

  const [suodatusoptio, setSuodatusoptio] = useState('')
  const [hakutermi, setHakutermi] = useState('')
  const [suodatusPaalla, setSuodatusPaalla] = useState(false);
  const sessioData = useContext(UserContext)

  const history = useHistory();

  useEffect(() => {
    setLadataan(true)
    haeOrganisaatiot().then(setLadataan(false));
  }, []);

  const haeOrganisaatiot = async () => {
    const result = await getOrganisaatiot()
    if (result.status === 'success') {
      result.data.organisaatiot.sort((a,b) => a['nimi'] < b['nimi'] ? -1 : 1 )
      setOrganisaatiolista(result.data.organisaatiot)
    } else {
      // TODO FAILURE
    }
  }

  const suodataOrgNimella = suodata ('nimi')
  const suodataPaikkakunnalla = suodata ('paikkakunta')
  const suodataMaalla = suodata ('maa')
  const suodataTapahtumatAsiasanalla = suodataKokoelma ('tapahtumat') ('asiasana')
  
  const suodatusMuutettu = (suodatusBool, optio, hakutermi) => {
    setAktiivinenOrganisaatio(undefined)
    setSuodatusPaalla(suodatusBool)
    setSuodatusoptio(optio)
    setHakutermi(hakutermi)
  }

  const naytaOrganisaatiot = () => {
    let suodatetutOrganisaatiot = []
    let { hakutermiTrim, predikaatti } = valitseHakumetodi (hakutermi)
    if (suodatusPaalla) {
      switch (suodatusoptio) {
        case 'kirjainhaku':
        case 'nimi':
          suodatetutOrganisaatiot = suodataOrgNimella (hakutermiTrim) (predikaatti) (organisaatiolista)
          break;
        case 'paikkakunta':
          suodatetutOrganisaatiot = suodataPaikkakunnalla (hakutermiTrim) (predikaatti) (organisaatiolista)
          break;
        case 'maa':
          suodatetutOrganisaatiot = suodataMaalla (hakutermiTrim) (predikaatti) (organisaatiolista)
          break;
        case 'asiasana':
          suodatetutOrganisaatiot = suodataTapahtumatAsiasanalla (hakutermiTrim) (predikaatti) (organisaatiolista)
            break;
          default:
          suodatetutOrganisaatiot = organisaatiolista
          break;
      }
    } else {
      suodatetutOrganisaatiot = organisaatiolista
    }
      // jos käyttäjä ei ole kirjautuneena, poistetaan organisaatioista ne joissa ei ole 
    // yhtään tapahtumaa jossa valmis = true
    if (!sessioData.token) {
      suodatetutOrganisaatiot = suodatetutOrganisaatiot.filter(as => 
        as.tapahtumat.some(tap => tap['valmis'] === true))
    }

    return (
      <>
        {suodatetutOrganisaatiot.map((item, index) => {
          return (
          <Grid.Row key={index}>
            <div className="menuitem" onClick={()=>setAktiivinenOrganisaatio(item)}>
              <b>{item.nimi}</b>
            </div>
          </Grid.Row>
          )
        })}
      </>  
    )
  }

  const ORGANISAATIOT_HAKUOPTIOT = [
    { key: "nimi", text: "Organisaation nimi", value: "nimi" },
    { key: "paikkakunta", text: "Paikkakunta", value: "paikkakunta" },
    { key: "maa", text: "Maa", value: "maa" },
    { key: "asiasana", text: "Asiasana", value: "asiasana" }
  ]

  const ORGANISAATIOT_DEFAULT = "nimi"

  const poistoHandler = poistettava => org_id => (tap_id) => {
    switch (poistettava) {
      case 'organisaatio':
        deleteData('/api/organisaatio/', org_id, sessioData.token)
        .then(result => {
          if (result.status === 'success') {
            haeOrganisaatiot().then(() => {
              setAktiivinenOrganisaatio(null)
            })
          }
        })
        break;
      case 'tapahtuma':
        deleteData('/api/tapahtuma/', tap_id, sessioData.token)
        .then(result => {
          if (result.status === 'success') {
            haeOrganisaatiot().then(() => {
              setAktiivinenOrganisaatio(null)
            })
          }
        })
        break;
      default:
        break;
    }
  }

  const updateHandler = muutettava => uusiData => {
    const { tyyppi, id } = muutettava
    switch (tyyppi) {
      case 'organisaatio':
        putData('/api/organisaatio/', uusiData, id, sessioData.token)
        .then(result => {
          if (result.status === 'success') {
            haeOrganisaatiot().then(() => {
              setAktiivinenOrganisaatio(null)
            })
          }
        })
        break;
      case 'tapahtuma':
        putData('/api/tapahtuma/', uusiData, id, sessioData.token)
        .then(result => {
          if (result.status === 'success') {
            haeOrganisaatiot().then(() => {
              setAktiivinenOrganisaatio(null)
            })
          }
        })
        break;
      default:
        break;
    }
  }

  const Latauskomponentti = () => (
    <Loader active>Ladataan tietoja</Loader>
  )

  const OrganisaatioListaus = () => {
    return (
      <div className={className}>
        <Segment basic>
          <Kirjainhakukomponentti
            suodatusMuutettu={suodatusMuutettu}
          />
          <Hakukomponentti
            hakuOptiot={ORGANISAATIOT_HAKUOPTIOT}
            defaultHaku={ORGANISAATIOT_DEFAULT}
            suodatusMuutettu={suodatusMuutettu} />
          <Grid columns={16} id="tuloksetGrid4">
            <Grid.Row>
              <Grid.Column width={6} textAlign="left">
                  {naytaOrganisaatiot()}
              </Grid.Column>
              <Grid.Column width={10}>
                {aktiivinenOrganisaatio 
                ? <AktiivinenOrganisaatio
                    aktiivinenOrganisaatio={aktiivinenOrganisaatio}
                    suodatus={{suodatusPaalla, suodatusoptio, hakutermi }}
                    poistoHandler={poistoHandler}
                    updateHandler={updateHandler}
                  /> : null}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }

  return (
    <div className={className}>
      <Container>
        <RdHeader />
        <Responsive minWidth={100} maxWidth={991}>
          <MobileMenu history={history} />
        </Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <RdMenu history={history} activeItem="organisaatiot" />
        </Responsive>
        { ladataan ? Latauskomponentti() : OrganisaatioListaus() }
      </Container>
    </div>
  );
};

const Organisaatiot = styled(OrganisaatiotPlain)`
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

Organisaatiot.propTypes = {
  className: PropTypes.string,
};

export default Organisaatiot;
