import React, { useState, useEffect, useContext } from 'react';
import { Segment, Grid, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import AktiivinenTeos from './AktiivinenTeos'
import HakuKomponentti from '../../HakuKomponentti'
import Kirjainhakukomponentti from '../../Kirjainhakukomponentti'
import UserContext from '../../../context/userContext'
import { suodata, valitseHakumetodi } from '../../../utilities/hakutoiminnot'
import { getKulttuurituotteet, deleteData, putData } from '../../../api/api'

import './TeosNaytto.css';

const TeosNaytto = ({ className }) => {
  // state hookit joilla hallitaan komponentin tilaa
  // eslint-disable-next-line no-unused-vars
  const [aktiivinenTeos, setAktiivinenTeos] = useState(undefined);
  const [teokset, setTeokset] = useState([]);
  const [ladataan, setLadataan] = useState(true); 

  const [suodatusoptio, setSuodatusoptio] = useState('')
  const [hakutermi, setHakutermi] = useState('')
  const [suodatusPaalla, setSuodatusPaalla] = useState(false);
  const sessioData = useContext(UserContext)

  const suodataTeosnimella = suodata ('nimi')
  const suodataLajityypilla = suodata ('lajityyppi')
  const suodataPaikkakunnalla = suodata ('teos_paikkakunta')
  const suodataMaalla = suodata ('teos_maa')
  const suodataAsiasanalla = suodata ('asiasana')

  useEffect(() => {
    let mounted = true
    if (mounted) {
      setLadataan(true)
      haeTeokset().then(setLadataan(false))  
    }

    return () => mounted = false
  }, [] )

  const haeTeokset = async () => {
    const result = await getKulttuurituotteet()
    if (result.status === 'success') {
      const teoksetKoonti = result.data.henkilot.reduceRight((kooste, tekija) => 
        kooste.concat(tekija.teokset.map(teos => (
          {
            id: teos.id,
            nimi: teos.nimi,
            lajityyppi: teos.lajityyppi,
            teos_maa: teos.teos_maa,
            teos_paikkakunta: teos.teos_paikkakunta,
            asiasana: teos.asiasana,
            valmis: teos.valmis,
            viesti: teos.viesti,
            teos_tekija: {
              id: tekija.id,
              etunimi: tekija.etunimi,
              sukunimi: tekija.sukunimi,
              ammattinimike: tekija.ammattinimike,
              maa: tekija.maa,
              paikkakunta: tekija.paikkakunta
            }
          }
      ))), [])
      teoksetKoonti.sort((a,b) => a['nimi'] < b['nimi'] ? -1 : 1 )
      setTeokset(teoksetKoonti)
    } else {
      // TODO FAILURE
    }
  }

  const suodatusMuutettu = (suodatusBool, optio, hakutermi) => {
    setAktiivinenTeos(undefined)
    setSuodatusPaalla(suodatusBool)
    setSuodatusoptio(optio)
    setHakutermi(hakutermi)
  }

  const naytaTeokset = () => {
    let suodatetutTeokset = []
    let { hakutermiTrim, predikaatti } = valitseHakumetodi (hakutermi)
    if (suodatusPaalla) {
      switch (suodatusoptio) {
        case 'kirjainhaku':
        case 'teosnimi':
          suodatetutTeokset = suodataTeosnimella (hakutermiTrim) (predikaatti) (teokset)
          break;
        case 'teoslaji':
          suodatetutTeokset = suodataLajityypilla (hakutermiTrim) (predikaatti) (teokset)
          break;
        case 'teosmaa':
          suodatetutTeokset = suodataMaalla (hakutermiTrim) (predikaatti) (teokset)
          break;
        case 'teospaikkak':
          suodatetutTeokset = suodataPaikkakunnalla (hakutermiTrim) (predikaatti) (teokset)
          break;
        case 'asiasana':
          suodatetutTeokset = suodataAsiasanalla (hakutermiTrim) (predikaatti) (teokset)
          break;
        default:
          suodatetutTeokset = teokset
          break;
      }
    } else {
      suodatetutTeokset = teokset
    }

    // jos käyttäjä ei ole kirjautuneena, poistetaan hakusanoista ne joissa ei ole 
    // yhtään ilmentymää jossa valmis = true
    if (!sessioData.token) {
      suodatetutTeokset = suodatetutTeokset.filter(teos => teos['valmis'] === true)
    }

    return (
      <>
        {suodatetutTeokset.map((item, index) => {
          return (
          <Grid.Row key={index}>
            <div className="menuitem" onClick={()=>setAktiivinenTeos(item)}>
              <b>{item.nimi}</b> {"(" + item.lajityyppi + ")"}
            </div>
          </Grid.Row>
          )
        })}
      </>  
    )
  }
  const KULTTUURITUOTTEET_HAKUOPTIOT = [
    { key: "teosnimi", text: "Teoksen nimi", value: "teosnimi" },
    { key: "teoslaji", text: "Teoksen laji", value: "teoslaji" },
    { key: "teospaikkak", text: "Paikkakunta", value: "teospaikkak" },
    { key: "teosmaa", text: "Maa", value: "teosmaa" },
    { key: "asiasana", text: "Asiasana", value: "asiasana" },
  ]

  const KULTTUURITUOTTEET_DEFAULT = "teosnimi"

  const poistoHandler = poistettava => teos_id => (hlo_id) => {
    switch (poistettava) {
      case 'teos':
        deleteData('/api/kulttuuriteos/', teos_id, sessioData.token)
        .then(result => {
          if (result.status === 'success') {
           haeTeokset().then(() => {
              setAktiivinenTeos(null)
            })
          }
        })
        break;
      case 'tekija':
        deleteData('/api/henkilo/', hlo_id, sessioData.token)
        .then(result => {
          if (result.status === 'success') {
            haeTeokset().then(() => {
              setAktiivinenTeos(null)
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
      case 'teos':
        putData('/api/kulttuuriteos/', uusiData, id, sessioData.token)
        .then(result => {
          if (result.status === 'success') {
            haeTeokset().then(() => {
              setAktiivinenTeos(null)
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
    { ladataan
    ? Latauskomponentti()
    : (
    <div className={className}>
      <Segment basic>
        <Kirjainhakukomponentti
          suodatusMuutettu={suodatusMuutettu}
        />
        <HakuKomponentti
          hakuOptiot={KULTTUURITUOTTEET_HAKUOPTIOT}
          defaultHaku={KULTTUURITUOTTEET_DEFAULT}
          suodatusMuutettu={suodatusMuutettu} />
        <Grid columns={16}>
          <Grid.Row>
            <Grid.Column width={6} textAlign="left">
                {naytaTeokset()}
            </Grid.Column>
            <Grid.Column width={10}>
              {aktiivinenTeos
              ? <AktiivinenTeos
                  aktiivinenTeos={aktiivinenTeos}
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

TeosNaytto.propTypes = {
  className: PropTypes.string,
};

export default TeosNaytto;
