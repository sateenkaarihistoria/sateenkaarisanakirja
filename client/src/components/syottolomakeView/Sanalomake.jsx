import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Search, Modal, Message } from 'semantic-ui-react';
import { postData, getSuojattuData } from '../../api/api';
import { useStateValue, setToken } from '../../context/';

import './Sanalomake.css';

const Sanalomake = () => {
  const [{ user }, dispatch] = useStateValue();
  const [lisattyAuki, setLisattyAuki] = useState(false);
  const [errors, setErrors] = useState(null);

  // HAKUSANOIHIN LIITTYVÄ TILA
  const [hakusanaTila, setHakusanaTila] = useState({
    hs_osio: '',
    paivays: 'HS19',
    kuvaus: '',
    hakusana: '',
    selite: '',
    sanaluokka: '',
    tyyli: '',
    kayttoala: '',
    lause: '',
    viesti: '',
    valmis: false,
  });

  //virheisiin liittyvät tilat
  const [virheet, setVirheet] = useState({
    hs_osioVirhe: false,
    paivaysVirhe: false,
    asiasanaVirhe: false,
    hakusanaVirhe: false,
    seliteVirhe: false,
    sanaluokkaVirhe: false,
    tyyliVirhe: false,
    kayttoalaVirhe: false,
    lauseVirhe: false,
    virheViesti: 'Täytä kaikki kentät',
    virhe: false,
  });

  //virheidenpäivitys
  const paivitaVirheet = (virhe, arvo) => {
    setVirheet(prev => ({
      ...prev,
      [virhe]: arvo,
    }));
  };

  // hakusanan tilan muuttaminen
  const muutaHakusananTilaa = e => {
    const { name, value } = e.target;
    setHakusanaTila(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Checkboxin kontrolloiman valmis-arvon muuttaminen
  const muutaValmis = () => {
    setHakusanaTila(prev => ({
      ...prev,
      valmis: !hakusanaTila.valmis,
    }));
  };

  //Hookit hakutuloksille ja latausikonille
  const [initialResults, setInitialResults] = useState({});
  const [searchResults, setSearchResults] = useState({});
  const [isLoading, setIsLoading] = useState({
    hs_osio: false,
    paivays: false,
    kuvaus: false,
    hakusana: false,
    selite: false,
    sanaluokka: false,
    tyyli: false,
    kayttoala: false,
    lause: false,
  });

  //Metodi joka tyhjentää samalomakkeen kenttien tiedot
  const tyhjennaSanaLomake = () => {
    setHakusanaTila({
      hs_osio: '',
      paivays: 'HS19',
      kuvaus: '',
      hakusana: '',
      selite: '',
      sanaluokka: '',
      tyyli: '',
      kayttoala: '',
      lause: '',
      viesti: '',
      valmis: false,
      hs_osioVirhe: false,
      paivaysVirhe: false,
      asiasanaVirhe: false,
      hakusanaVirhe: false,
      seliteVirhe: false,
      sanaluokkaVirhe: false,
      tyyliVirhe: false,
      kayttoalaVirhe: false,
      lauseVirhe: false,
      virheViesti: 'Täytä kaikki kentät',
    });
  };

  //Metodi joka hakee lomakkeen sisällön typeaheadia varten
  const fetchResults = () => {
    getSuojattuData('/api/sanalomake', user.token).then(result => {
      if (result.status === 'success') {
        const mappedResults = result.data.reduce((prev, r) => {
          const [key, value] = Object.entries(r)[0];

          prev[key] = value;

          return prev;
        }, {});

        setInitialResults(mappedResults);
      } else {
        console.error('Sanalomakeeen tietojen haku epäonnistui');
      }
    });
  };

  //Tarkistetaan formi, että siinä on tarvittavat tiedot sanan tallennusta varten
  const tarkistaSanaLomake = async () => {
    let virhe = false;

    //tarkastetaan ovatko kentät tyhjät
    //jos ovat niin merkataan virhe todeksi
    if (hakusanaTila['hs_osio'].trim() === '') {
      paivitaVirheet('hs_osioVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('hs_osioVirhe', false);
    }
    if (hakusanaTila['paivays'].trim().length !== 13) {
      paivitaVirheet('paivaysVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('paivaysVirhe', false);
    }
    if (hakusanaTila['kuvaus'].trim() === '') {
      paivitaVirheet('asiasanaVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('asiasanaVirhe', false);
    }
    if (hakusanaTila['hakusana'].trim() === '') {
      paivitaVirheet('hakusanaVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('hakusanaVirhe', false);
    }
    if (hakusanaTila['selite'].trim() === '') {
      paivitaVirheet('seliteVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('seliteVirhe', false);
    }
    if (hakusanaTila['sanaluokka'].trim() === '') {
      paivitaVirheet('sanaluokkaVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('sanaluokkaVirhe', false);
    }
    if (hakusanaTila['tyyli'].trim() === '') {
      paivitaVirheet('tyyliVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('tyyliVirhe', false);
    }
    if (hakusanaTila['kayttoala'].trim() === '') {
      paivitaVirheet('kayttoalaVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('kayttoalaVirhe', false);
    }
    if (hakusanaTila['lause'].trim() === '') {
      paivitaVirheet('lauseVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('lauseVirhe', false);
    }

    //Jos ei löydy virheitä niin luodaan json objekti kentistä postausta varten
    if (!virhe) {
      var luoFormiobjekti = {
        paivays: hakusanaTila['paivays'],
        hs_osio: hakusanaTila['hs_osio'],
        sana: hakusanaTila['hakusana'],
        selite: hakusanaTila['selite'],
        kuvaus: hakusanaTila['kuvaus'],
        sanaluokka: hakusanaTila['sanaluokka'],
        tyyli: hakusanaTila['tyyli'],
        kayttoala: hakusanaTila['kayttoala'],
        lause: hakusanaTila['lause'],
        viesti: hakusanaTila['viesti'],
        valmis: hakusanaTila['valmis'],
      };

      await postData('/api/hakusana', luoFormiobjekti, user.token).then(
        result => {
          if (result.status === 'success') {
            dispatch(setToken(result.data.token));
            setLisattyAuki(true);
          } else {
            hoidaVirheet(result);
          }
        },
      );

      tyhjennaSanaLomake();
      fetchResults();
    } else {
      //console.log('Kenttiä puuttuu');
    }
  };

  // Funktio palvelimen palauttamien virheiden käsittelyyn
  const hoidaVirheet = result => {
    setErrors(
      result.data.response.data.errors
        ? result.data.response.data.errors
        : // Jos serveri palauttaa yleisen virheen, sen muotdon käsittely vaatii kikkailua
          [{ msg: JSON.stringify(result.data.response.data) }],
    );
  };

  // Effect hook hakee datan typeaheadia varten ennen komponentin renderöintiä
  useEffect(fetchResults, []);

  //Typeaheadin tulosten valintatilannetta käsittelevä metodi
  const handleResultSelect = name => (e, { result }) =>
    setHakusanaTila(prev => ({
      ...prev,
      [name]: result.title,
    }));

  //Typeaheadin hakusanan tilan muutosta käsittelevä metodi
  const handleSearchChange = e => {
    const { name, value } = e.target;

    setIsLoading(prev => ({
      ...prev,
      [name]: true,
    }));

    muutaHakusananTilaa(e);

    //Tyhjennetään tulokset jos pituus nolla
    if (value.length < 1) {
      setSearchResults(prev => ({
        ...prev,
        [name]: [],
      }));
      setIsLoading(prev => ({
        ...prev,
        [name]: false,
      }));
    }

    //Haun säätäminen toimimaan sekä isoilla, että pienillä kirjaimilla
    const re = new RegExp(`^${value.toLowerCase()}`);

    if (initialResults[name]) {
      const filteredResults = initialResults[name].filter(result => {
        if (result.toLowerCase) {
          return re.test(result.toLowerCase());
        } else {
          return re.test(result);
        }
      });

      //Metodi joka säilöö lomakkeen haetut tiedot muuttujaan
      const results = filteredResults.map(filteredResult => ({
        title: `${filteredResult}`,
      }));

      //Metodi joka asettaa hakutulokset
      setSearchResults(prev => ({
        ...prev,
        [name]: results,
      }));
    }

    //Metodi "lataus" -ikonia varten kentän oikeassa reunassa, joka ei nyt ole käytössä, vaan piilotettuna
    setIsLoading(prev => ({
      ...prev,
      [name]: false,
    }));
  };

  //Lomakkeen kentät ja niissä käytettävät tominnallisuudet
  return (
    <div>
      {errors ? (
        <Message negative>
          <Message.Header>Syöttö epäonnistui</Message.Header>
          {errors.map(error => {
            return <p key={error.param}> {error.msg}</p>;
          })}
        </Message>
      ) : null}
      <Form name="Sanalomake" method="post">
        <font size="6" color="purple">
          Sanalomake
        </font>
        <Form.Group widths="equal" style={{ marginTop: '1rem' }}>
          <Form.Input
            label="Päiväys"
            name="paivays"
            value={hakusanaTila['paivays']}
            onChange={muutaHakusananTilaa}
            error={virheet['paivaysVirhe']}
          >
            <Search
              loading={isLoading['paivays']}
              onResultSelect={handleResultSelect('paivays')}
              onSearchChange={handleSearchChange}
              name="paivays"
              results={searchResults['paivays']}
              value={hakusanaTila['paivays']}
              label="Päivays"
              icon={null}
            />
          </Form.Input>
          <Form.Input
            label="Lehden osio"
            name="hs_osio"
            value={hakusanaTila['hs_osio']}
            onChange={muutaHakusananTilaa}
            error={virheet['hs_osioVirhe']}
          >
            <Search
              loading={isLoading['hs_osio']}
              onResultSelect={handleResultSelect('hs_osio')}
              onSearchChange={handleSearchChange}
              name="hs_osio"
              results={searchResults['hs_osio']}
              value={hakusanaTila['hs_osio']}
              label="Lehden osio"
              icon={null}
            />
          </Form.Input>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Hakusana"
            name="hakusana"
            value={hakusanaTila['hakusana']}
            onChange={muutaHakusananTilaa}
            error={virheet['hakusanaVirhe']}
          >
            <Search
              loading={isLoading['hakusana']}
              onResultSelect={handleResultSelect('hakusana')}
              onSearchChange={handleSearchChange}
              name="hakusana"
              results={searchResults['hakusana']}
              value={hakusanaTila['hakusana']}
              label="Hakusana"
              icon={null}
            />
          </Form.Input>
          <Form.Input
            label="Hakusanan selite"
            placeholder="Selite"
            name="selite"
            value={hakusanaTila['selite']}
            onChange={muutaHakusananTilaa}
            error={virheet['seliteVirhe']}
          >
            <Search
              loading={isLoading['selite']}
              onResultSelect={handleResultSelect('selite')}
              onSearchChange={handleSearchChange}
              name="selite"
              results={searchResults['selite']}
              value={hakusanaTila['selite']}
              label="Hakusanan selite"
              icon={null}
            />
          </Form.Input>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Asiasana"
            name="kuvaus"
            value={hakusanaTila['kuvaus']}
            onChange={muutaHakusananTilaa}
            error={virheet['asiasanaVirhe']}
          >
            <Search
              loading={isLoading['kuvaus']}
              onResultSelect={handleResultSelect('kuvaus')}
              onSearchChange={handleSearchChange}
              name="kuvaus"
              results={searchResults['kuvaus']}
              value={hakusanaTila['kuvaus']}
              label="Asiasana"
              icon={null}
            />
          </Form.Input>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Sanaluokka"
            name="sanaluokka"
            value={hakusanaTila['sanaluokka']}
            onChange={muutaHakusananTilaa}
            error={virheet['sanaluokkaVirhe']}
          >
            <Search
              loading={isLoading['sanaluokka']}
              onResultSelect={handleResultSelect('sanaluokka')}
              onSearchChange={handleSearchChange}
              name="sanaluokka"
              results={searchResults['sanaluokka']}
              value={hakusanaTila['sanaluokka']}
              label="Sanaluokka"
              icon={null}
            />
          </Form.Input>
          <Form.Input
            label="Tyyli"
            name="tyyli"
            value={hakusanaTila['tyyli']}
            onChange={muutaHakusananTilaa}
            error={virheet['tyyliVirhe']}
          >
            <Search
              loading={isLoading['tyyli']}
              onResultSelect={handleResultSelect('tyyli')}
              onSearchChange={handleSearchChange}
              name="tyyli"
              results={searchResults['tyyli']}
              value={hakusanaTila['tyyli']}
              label="Tyyli"
              icon={null}
            />
          </Form.Input>
          <Form.Input
            label="Käyttöala"
            name="kayttoala"
            value={hakusanaTila['kayttoala']}
            onChange={muutaHakusananTilaa}
            error={virheet['kayttoalaVirhe']}
          >
            <Search
              loading={isLoading['kayttoala']}
              onResultSelect={handleResultSelect('kayttoala')}
              onSearchChange={handleSearchChange}
              name="kayttoala"
              results={searchResults['kayttoala']}
              value={hakusanaTila['kayttoala']}
              label="Käyttöala"
              icon={null}
            />
          </Form.Input>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Lause"
            name="lause"
            value={hakusanaTila['lause']}
            onChange={muutaHakusananTilaa}
            error={virheet['lauseVirhe']}
          >
            <Search
              loading={isLoading['lause']}
              onResultSelect={handleResultSelect('lause')}
              onSearchChange={handleSearchChange}
              name="lause"
              results={searchResults['lause']}
              value={hakusanaTila['lause']}
              label="Lause"
              icon={null}
            />
          </Form.Input>
        </Form.Group>

        <Form.Field>
          <Form.Checkbox
            style={{ marginTop: '1.0rem', marginBottom: '1.0rem' }}
            label="Sanan syöttö on valmis julkaistavaksi"
            name="valmis"
            checked={hakusanaTila.valmis}
            onChange={muutaValmis}
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Form.TextArea
            label="Viesti"
            placeholder="Kommentti toiselle tutkijalle tms."
            name="viesti"
            value={hakusanaTila.viesti}
            onChange={muutaHakusananTilaa}
          />
        </Form.Group>

        <Button onClick={tarkistaSanaLomake}>Tallenna</Button>

        <Button onClick={tyhjennaSanaLomake} style={{ marginLeft: '5.0rem' }}>
          Tyhjennä
        </Button>
      </Form>

      <Modal open={lisattyAuki} size="tiny">
        <Modal.Content>Lisäys onnistui</Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={() => setLisattyAuki(false)}>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Sanalomake;
