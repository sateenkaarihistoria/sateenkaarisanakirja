import React, { useState, useEffect, useContext } from 'react';
import { Segment, Grid, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AktiivinenTekija from './AktiivinenTekija'
import HakuKomponentti from '../../HakuKomponentti'
import Kirjainhakukomponentti from '../../Kirjainhakukomponentti'
import UserContext from '../../../context/userContext'
import { suodata, suodataKokoelma, valitseHakumetodi } from '../../../utilities/hakutoiminnot'
import { getKulttuurituotteet, deleteData, putData } from '../../../api/api'

import './TekijaNaytto.css';

const TekijaNaytto = ({ className }) => {
  const [kulttuurituotteet, setKulttuurituotteet] = useState([]);
  const [aktiivinenTekija, setAktiivinenTekija] = useState(undefined);
  const [ladataan, setLadataan] = useState(true); 
  const [suodatusoptio, setSuodatusoptio] = useState('')
  const [hakutermi, setHakutermi] = useState('')
  const [suodatusPaalla, setSuodatusPaalla] = useState(false);
  
  const sessioData = useContext(UserContext)
  
  const suodataSukunimella = suodata ('sukunimi')
  const suodataAmmatilla = suodata ('ammattinimike')
  const suodataMaalla = suodata ('maa')
  const suodataPaikkakunnalla = suodata ('paikkakunta')
  const suodataTeoksetAsiasanalla = suodataKokoelma ('teokset') ('asiasana')

  const haeKulttuurituotteet = React.useCallback(
    async () => {
    const result = await getKulttuurituotteet()
    if (result.status === 'success') {
      result.data.henkilot.sort(tekijanSukunimiComparer)
      setKulttuurituotteet(result.data.henkilot)
    }
  }, [])

  useEffect(() => {
    let mounted = true
    if (mounted) {
      setLadataan(true)
      haeKulttuurituotteet()
      setLadataan(false)
    }
    return () => mounted = false
  }, [haeKulttuurituotteet]);
  
  const suodatusMuutettu = (suodatusBool, optio, hakutermi) => {
    setAktiivinenTekija(undefined)
    setSuodatusPaalla(suodatusBool)
    setSuodatusoptio(optio)
    setHakutermi(hakutermi)
  }

  const tekijanSukunimiComparer = (a,b) => a['sukunimi'] < b['sukunimi'] ? -1 : 1

  const naytaTekijat = () => {
    let suodatetutTekijat = []
    let { hakutermiTrim, predikaatti } = valitseHakumetodi (hakutermi)
    if (suodatusPaalla) {
      switch (suodatusoptio) {
        case 'kirjainhaku':
        case 'sukunimi':
          suodatetutTekijat = suodataSukunimella (hakutermiTrim) (predikaatti) (kulttuurituotteet)
          break;
        case 'ammatti':
          suodatetutTekijat = suodataAmmatilla (hakutermiTrim) (predikaatti) (kulttuurituotteet)
          break;
        case 'paikkakunta':
          suodatetutTekijat = suodataPaikkakunnalla (hakutermiTrim) (predikaatti) (kulttuurituotteet)
          break;
        case 'maa':
          suodatetutTekijat = suodataMaalla (hakutermiTrim) (predikaatti) (kulttuurituotteet)
          break;
        case 'asiasana':
          suodatetutTekijat = suodataTeoksetAsiasanalla (hakutermiTrim) (predikaatti) (kulttuurituotteet)
          break;
        default:
          suodatetutTekijat = kulttuurituotteet
          break;
      }
    } else {
      suodatetutTekijat = kulttuurituotteet
    }

    // jos käyttäjä ei ole kirjautuneena, poistetaan hakusanoista ne joissa ei ole 
    // yhtään ilmentymää jossa valmis = true
    if (!sessioData.token) {
      suodatetutTekijat = suodatetutTekijat.filter(tek => 
        tek.teokset.some(teos => teos['valmis'] === true))
    }

    return (
      <>
        {suodatetutTekijat.map((item, index) => {
          return (
          <Grid.Row key={index}>
            <div className="menuitem" onClick={()=>setAktiivinenTekija(item)}>
              <b>{item.sukunimi + ", " + item.etunimi}</b> {"(" 
              + item.ammattinimike + ")"}
            </div>
          </Grid.Row>
          )
        })}
      </>  
    )
  }
  const KULTTUURITEKIJAT_HAKUOPTIOT = [
    { key: "sukunimi", text: "Tekijän sukunimi", value: "sukunimi" },
    { key: "ammatti", text: "Tekijän ammatti", value: "ammatti" },
    { key: "paikkakunta", text: "Paikkakunta", value: "paikkakunta"},
    { key: "maa", text: "Maa", value: "maa" },
    { key: "asiasana", text: "Asiasana", value: "asiasana" },
  ]

  const KULTTUURITEKIJAT_DEFAULT = "sukunimi"

  const poistoHandler = poistettava => hlo_id => (teos_id) => {
    switch (poistettava) {
      case 'tekija':
        deleteData('/api/henkilo/', hlo_id, sessioData.token)
        .then(result => {
          if (result.status === 'success') {
            haeKulttuurituotteet().then(() => {
              setAktiivinenTekija(null)
            })
          }
        })
        break;
      case 'teos':
        deleteData('/api/kulttuuriteos/', teos_id, sessioData.token)
        .then(result => {
          if (result.status === 'success') {
            haeKulttuurituotteet().then(() => {
              setAktiivinenTekija(null)
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
      case 'tekija':
        putData('/api/henkilo/', uusiData, id, sessioData.token)
        .then(result => {
          if (result.status === 'success') {
            haeKulttuurituotteet().then(() => {
              setAktiivinenTekija(null)
            })
          }
        })
        break;
      case 'teos':
        putData('/api/kulttuuriteos/', uusiData, id, sessioData.token)
        .then(result => {
          if (result.status === 'success') {
            haeKulttuurituotteet().then(() => {
              setAktiivinenTekija(null)
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

  return (
    <>
    {ladataan
    ? Latauskomponentti()
    : (
    <div className={className}>
      <Segment basic>
        <Kirjainhakukomponentti
          suodatusMuutettu={suodatusMuutettu}
        />
        <HakuKomponentti
          hakuOptiot={KULTTUURITEKIJAT_HAKUOPTIOT}
          defaultHaku={KULTTUURITEKIJAT_DEFAULT}
          suodatusMuutettu={suodatusMuutettu} />
        <Grid columns={16}>
          <Grid.Row>
            <Grid.Column width={6} textAlign="left">
                {naytaTekijat()}
            </Grid.Column>
            <Grid.Column width={10}>
              {aktiivinenTekija
              ? <AktiivinenTekija
                  aktiivinenTekija={aktiivinenTekija}
                  suodatus={{suodatusPaalla, suodatusoptio, hakutermi}}
                  poistoHandler={poistoHandler}
                  updateHandler={updateHandler}
                />
              : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>)}
  </>
  );
};

TekijaNaytto.propTypes = {
  className: PropTypes.string,
};

export default TekijaNaytto;

