import React, { useState, useEffect } from 'react';
import { Segment, Grid, Loader } from 'semantic-ui-react';
import AktiivinenTekija from './AktiivinenTekija';
import HakuKomponentti from '../../HakuKomponentti';
import Kirjainhakukomponentti from '../../Kirjainhakukomponentti';
import { useStateValue } from '../../../context';
import {
  suodata,
  suodataKokoelma,
  valitseHakumetodi,
} from '../../../utilities/hakutoiminnot';
import { getHenkilot, deleteData, putData } from '../../../api/api';

import './TekijaNaytto.css';

const TekijaNaytto = ({ className }) => {
  const [henkilot, setHenkilot] = useState([]);
  const [aktiivinenTekija, setAktiivinenTekija] = useState(undefined);
  const [ladataan, setLadataan] = useState(true);
  const [suodatusoptio, setSuodatusoptio] = useState('');
  const [hakutermi, setHakutermi] = useState('');
  const [suodatusPaalla, setSuodatusPaalla] = useState(false);

  const [{ user }] = useStateValue();

  const suodataSukunimella = suodata('sukunimi');
  const suodataAmmatilla = suodata('ammattinimike');
  const suodataMaalla = suodata('maa');
  const suodataPaikkakunnalla = suodata('paikkakunta');
  const suodataTeoksetAsiasanalla = suodataKokoelma('teokset')('asiasana');

  const tekijanSukunimiComparer = (a, b) => (a.sukunimi < b.sukunimi ? -1 : 1);

  const haeHenkilot = React.useCallback(async () => {
    const result = await getHenkilot();
    if (result.status === 'success') {
      result.data.henkilot.sort(tekijanSukunimiComparer);
      setHenkilot(result.data.henkilot);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setLadataan(true);
      haeHenkilot();
      setLadataan(false);
    }
    return () => {
      mounted = false;
    };
  }, [haeHenkilot]);

  const suodatusMuutettu = (suodatusBool, optio, htermi) => {
    setAktiivinenTekija(undefined);
    setSuodatusPaalla(suodatusBool);
    setSuodatusoptio(optio);
    setHakutermi(htermi);
  };

  const naytaTekijat = () => {
    let suodatetutTekijat = [];
    const { hakutermiTrim, predikaatti } = valitseHakumetodi(hakutermi);
    if (suodatusPaalla) {
      switch (suodatusoptio) {
        case 'kirjainhaku':
        case 'sukunimi':
          suodatetutTekijat = suodataSukunimella(hakutermiTrim)(predikaatti)(
            henkilot,
          );
          break;
        case 'ammatti':
          suodatetutTekijat = suodataAmmatilla(hakutermiTrim)(predikaatti)(
            henkilot,
          );
          break;
        case 'paikkakunta':
          suodatetutTekijat = suodataPaikkakunnalla(hakutermiTrim)(predikaatti)(
            henkilot,
          );
          break;
        case 'maa':
          suodatetutTekijat = suodataMaalla(hakutermiTrim)(predikaatti)(
            henkilot,
          );
          break;
        case 'asiasana':
          suodatetutTekijat = suodataTeoksetAsiasanalla(hakutermiTrim)(
            predikaatti,
          )(henkilot);
          break;
        default:
          suodatetutTekijat = henkilot;
          break;
      }
    } else {
      suodatetutTekijat = henkilot;
    }

    // jos käyttäjä ei ole kirjautuneena, poistetaan hakusanoista ne joissa ei ole
    // yhtään ilmentymää jossa valmis = true
    if (!user) {
      suodatetutTekijat = suodatetutTekijat.filter((tek) =>
        tek.teokset.some((teos) => teos.valmis === true),
      );
    }

    return (
      <>
        {suodatetutTekijat.map((item) => (
          <Grid.Row key={item.id + item.etunimi + item.sukunimi}>
            <div className="menuitem" onClick={() => setAktiivinenTekija(item)}>
              <b>{`${item.sukunimi}, ${item.etunimi}`}</b>{' '}
              {`(${item.ammattinimike})`}
            </div>
          </Grid.Row>
        ))}
      </>
    );
  };
  const KULTTUURITEKIJAT_HAKUOPTIOT = [
    { key: 'sukunimi', text: 'Tekijän sukunimi', value: 'sukunimi' },
    { key: 'ammatti', text: 'Tekijän ammatti', value: 'ammatti' },
    { key: 'paikkakunta', text: 'Paikkakunta', value: 'paikkakunta' },
    { key: 'maa', text: 'Maa', value: 'maa' },
    { key: 'asiasana', text: 'Asiasana', value: 'asiasana' },
  ];

  const KULTTUURITEKIJAT_DEFAULT = 'sukunimi';

  const poistoHandler = (poistettava) => (hlo_id) => (teos_id) => {
    switch (poistettava) {
      case 'tekija':
        deleteData('/api/henkilo/', hlo_id, user.token).then((result) => {
          if (result.status === 'success') {
            haeHenkilot().then(() => {
              setAktiivinenTekija(null);
            });
          }
        });
        break;
      case 'teos':
        deleteData('/api/kulttuuriteos/', teos_id, user.token).then(
          (result) => {
            if (result.status === 'success') {
              haeHenkilot().then(() => {
                setAktiivinenTekija(null);
              });
            }
          },
        );
        break;
      default:
        break;
    }
  };

  const updateHandler = (muutettava) => (uusiData) => {
    const { tyyppi, id } = muutettava;
    switch (tyyppi) {
      case 'tekija':
        putData('/api/henkilo/', uusiData, id, user.token).then((result) => {
          if (result.status === 'success') {
            haeHenkilot().then(() => {
              setAktiivinenTekija(null);
            });
          }
        });
        break;
      case 'teos':
        putData('/api/kulttuuriteos/', uusiData, id, user.token).then(
          (result) => {
            if (result.status === 'success') {
              haeHenkilot().then(() => {
                setAktiivinenTekija(null);
              });
            }
          },
        );
        break;
      default:
        break;
    }
  };

  const Latauskomponentti = () => <Loader active>Ladataan tietoja</Loader>;

  return (
    <>
      {ladataan ? (
        Latauskomponentti()
      ) : (
        <div className={className}>
          <Segment basic>
            <Kirjainhakukomponentti suodatusMuutettu={suodatusMuutettu} />
            <HakuKomponentti
              hakuOptiot={KULTTUURITEKIJAT_HAKUOPTIOT}
              defaultHaku={KULTTUURITEKIJAT_DEFAULT}
              suodatusMuutettu={suodatusMuutettu}
            />
            <Grid columns={16} id="tuloksetGrid2">
              <Grid.Row>
                <Grid.Column width={6} textAlign="left">
                  {naytaTekijat()}
                </Grid.Column>
                <Grid.Column width={10}>
                  {aktiivinenTekija ? (
                    <AktiivinenTekija
                      aktiivinenTekija={aktiivinenTekija}
                      suodatus={{ suodatusPaalla, suodatusoptio, hakutermi }}
                      poistoHandler={poistoHandler}
                      updateHandler={updateHandler}
                    />
                  ) : null}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
      )}
    </>
  );
};
export default TekijaNaytto;
