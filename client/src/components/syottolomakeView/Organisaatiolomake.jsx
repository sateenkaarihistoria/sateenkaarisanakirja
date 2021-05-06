import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Search,
  Container,
  Message,
  Modal,
} from 'semantic-ui-react';
import { postData, getSuojattuData } from '../../api/api';
import { useStateValue, setToken } from '../../context';

const Organisaatiolomake = () => {
  const [{ user }, dispatch] = useStateValue();
  const [lisattyAuki, setLisattyAuki] = useState(false);
  const [errors, setErrors] = useState(null);
  const [initialResults, setInitialResults] = useState({});
  const [searchResults, setSearchResults] = useState({});
  const [isLoading, setIsLoading] = useState({
    org_nimi: false,
    kuvaus: false,
    tapahtuma_nimi: false,
    tapahtuma_luonne: false,
    paikkakunta: false,
    maa: false,
    paivays: false,
  });

  // Hookki organisaatiolomakkeen kenttiä varten
  const [organisaatioTila, setOrganisaatioTila] = useState({
    org_nimi: '',
    kuvaus: '',
    tapahtuma_nimi: '',
    tapahtuma_luonne: '',
    paikkakunta: '',
    maa: '',
    paivays: '',
    viesti: '',
    valmis: false,
  });

  // virheisiin liittyvät tilat
  const [virheet, setVirheet] = useState({
    org_nimiVirhe: false,
    asiasanaVirhe: false,
    tapahtuma_nimiVirhe: false,
    tapahtuma_luonneVirhe: false,
    paikkakuntaVirhe: false,
    maaVirhe: false,
    paivaysVirhe: false,
    virheViesti: 'Täytä kaikki kentät',
    virhe: false,
  });
  // virheidenpäivitys
  const paivitaVirheet = (virhe, arvo) => {
    setVirheet((prev) => ({
      ...prev,
      [virhe]: arvo,
    }));
  };

  // Metodi joka hakee lomakkeen sisällön typeaheadia varten
  const fetchResults = () => {
    getSuojattuData('/api/organisaatiolomake', user.token).then((result) => {
      if (result.status === 'success') {
        const mappedResults = result.data.reduce((p, r) => {
          const prev = { ...p };
          const [key, value] = Object.entries(r)[0];
          prev[key] = value;

          return prev;
        }, {});

        setInitialResults(mappedResults);
      } else {
        console.error('Organisaatiolomakkeen tietojen haku epäonnistui');
      }
    });
  };

  // Effect hook hakee asiasanat valmiiksi kutsumalla api.js haeAsiasanat-funktiota
  // ennen komponentin renderöintiä
  useEffect(fetchResults, []);

  // Typeaheadin tulosten valintatilannetta käsittelevä metodi
  const handleResultSelect = (name) => (e, { result }) =>
    setOrganisaatioTila((prev) => ({
      ...prev,
      [name]: result.title,
    }));
  // organisaation tilan muuttaminen
  const muutaOrganisaationTila = (e) => {
    const { name, value } = e.target;
    setOrganisaatioTila((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Typeaheadin hakusanan tilan muutosta käsittelevä metodi
  const handleSearchChange = (e) => {
    const { name, value } = e.target;

    setIsLoading((prev) => ({
      ...prev,
      [name]: true,
    }));

    muutaOrganisaationTila(e);

    // Tyhjennetään hakutulokset jos pituus nolla
    if (value.length < 1) {
      setSearchResults((prev) => ({
        ...prev,
        [name]: [],
      }));
      setIsLoading((prev) => ({
        ...prev,
        [name]: false,
      }));
    }

    // Haun säätäminen toimimaan sekä isoilla, että pienillä kirjaimilla
    const re = new RegExp(`^${value.toLowerCase()}`);

    if (initialResults[name]) {
      const filteredResults = initialResults[name].filter((result) => {
        if (result.toLowerCase) {
          return re.test(result.toLowerCase());
        }
        return re.test(result);
      });

      // Metodi joka säilöö lomakkeen haetut tiedot muuttujaan
      const results = filteredResults.map((filteredResult) => ({
        title: `${filteredResult}`,
      }));

      // Metodi joka asettaa hakutulokset
      setSearchResults((prev) => ({
        ...prev,
        [name]: results,
      }));
    }

    // Metodi "lataus" -ikonia varten kentän oikeassa reunassa, joka ei nyt ole käytössä, vaan piilotettuna
    setIsLoading((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  // Checkboxin kontrolloiman valmis-arvon muuttaminen
  const muutaValmis = () => {
    setOrganisaatioTila((prev) => ({
      ...prev,
      valmis: !organisaatioTila.valmis,
    }));
  };

  // Metodi joka tyhjentää lomakkeen
  const tyhjennaOrganisaatioLomake = () => {
    setOrganisaatioTila({
      org_nimi: '',
      kuvaus: '',
      tapahtuma_nimi: '',
      tapahtuma_luonne: '',
      paikkakunta: '',
      maa: '',
      paivays: '',
      viesti: '',
      valmis: false,
      org_nimiVirhe: false,
      asiasanaVirhe: false,
      tapahtuma_nimiVirhe: false,
      tapahtuma_luonneVirhe: false,
      paikkakuntaVirhe: false,
      maaVirhe: false,
      vuosiVirhe: false,
      virheViesti: 'Täytä kaikki kentät',
      virhe: false,
    });
  };
  // Funktio palvelimen palauttamien virheiden käsittelyyn
  const hoidaVirheet = (result) => {
    setErrors(
      result.data.response.data.errors
        ? result.data.response.data.errors
        : // Jos serveri palauttaa yleisen virheen, sen muotdon käsittely vaatii kikkailua
          [{ msg: JSON.stringify(result.data.response.data) }],
    );
  };

  // Funktio muuntaa sanan ensimmäisen kirjaimen isoksi
  const muunnaKirjainIsoksi = (s) => s[0].toUpperCase() + s.slice(1);

  // Funktio muuntaa sanan ensimmäisen kirjaimen pieneksi
  const muunnaKirjainPieneksi = (s) => s[0].toLowerCase() + s.slice(1);

  // Tarkistetaan lomake, että siinä on tarvittavat tiedot sanan tallennusta varten
  const tarkistaOrganisaatiolomake = async () => {
    let virhe = false;

    // tarkastetaan ovatko kentät tyhjät
    // jos ovat niin merkataan virhe todeksi
    if (organisaatioTila.org_nimi.trim() === '') {
      paivitaVirheet('org_nimiVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('org_nimiVirhe', false);
    }
    if (organisaatioTila.kuvaus.trim() === '') {
      paivitaVirheet('asiasanaVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('asiasanaVirhe', false);
    }
    if (organisaatioTila.tapahtuma_nimi.trim() === '') {
      paivitaVirheet('tapahtuma_nimiVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('tapahtuma_nimiVirhe', false);
    }
    if (organisaatioTila.tapahtuma_luonne.trim() === '') {
      paivitaVirheet('tapahtuma_luonneVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('tapahtuma_luonneVirhe', false);
    }
    if (organisaatioTila.paikkakunta.trim() === '') {
      paivitaVirheet('paikkakuntaVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('paikkakuntaVirhe', false);
    }
    if (organisaatioTila.maa.trim() === '') {
      paivitaVirheet('maaVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('maaVirhe', false);
    }
    if (organisaatioTila.paivays.trim() === '') {
      paivitaVirheet('paivaysVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('paivaysVirhe', false);
    }

    if (!virhe) {
      const luoFormiobjekti = {
        org_nimi: muunnaKirjainIsoksi(organisaatioTila.org_nimi),
        maa: muunnaKirjainIsoksi(organisaatioTila.maa),
        paikkakunta: muunnaKirjainIsoksi(organisaatioTila.paikkakunta),
        tapahtuma_nimi: muunnaKirjainIsoksi(organisaatioTila.tapahtuma_nimi),
        luonne: muunnaKirjainPieneksi(organisaatioTila.tapahtuma_luonne),
        paivays: organisaatioTila.paivays,
        kuvaus: muunnaKirjainPieneksi(organisaatioTila.kuvaus),
        viesti: organisaatioTila.viesti,
        valmis: organisaatioTila.valmis,
      };

      await postData('/api/organisaatio', luoFormiobjekti, user.token).then(
        (result) => {
          if (result.status === 'success') {
            dispatch(setToken(result.data.token));
            setLisattyAuki(true);
          } else {
            hoidaVirheet(result);
          }
        },
      );

      tyhjennaOrganisaatioLomake();
      fetchResults();
    } else {
      // console.log('Kenttiä puuttuu');
    }
  };

  // Lomakkeen kentät ja niissä käytettävät tominnallisuudet
  return (
    <Container>
      {errors ? (
        <Message negative>
          <Message.Header>Syöttö epäonnistui</Message.Header>
          {errors.map((error) => (
            <p key={error.param}> {error.msg}</p>
          ))}
        </Message>
      ) : null}
      <Form name="Organisaatiolomake" method="post">
        <font size="6" color="purple">
          Organisaatiolomake
        </font>
        <Form.Group widths="equal" style={{ marginTop: '1rem' }}>
          <Form.Input
            fluid
            label="Organisaation nimi"
            name="org_nimi"
            value={organisaatioTila.org_nimi}
            onChange={muutaOrganisaationTila}
            error={virheet.org_nimiVirhe}
          >
            <Search
              loading={isLoading.org_nimi}
              onResultSelect={handleResultSelect('org_nimi')}
              onSearchChange={handleSearchChange}
              name="org_nimi"
              results={searchResults.org_nimi}
              value={organisaatioTila.org_nimi}
              label="Organisaation nimi"
              icon={null}
            />
          </Form.Input>

          <Form.Input
            fluid
            label="Organisaation paikkakunta"
            name="paikkakunta"
            value={organisaatioTila.paikkakunta}
            onChange={muutaOrganisaationTila}
            error={virheet.paikkakuntaVirhe}
          >
            <Search
              loading={isLoading.paikkakunta}
              onResultSelect={handleResultSelect('paikkakunta')}
              onSearchChange={handleSearchChange}
              name="paikkakunta"
              results={searchResults.paikkakunta}
              value={organisaatioTila.paikkakunta}
              label="Paikkakunta"
              icon={null}
            />
          </Form.Input>
          <Form.Input
            fluid
            label="Organisaation maa"
            name="maa"
            value={organisaatioTila.maa}
            onChange={muutaOrganisaationTila}
            error={virheet.maaVirhe}
          >
            <Search
              loading={isLoading.maa}
              onResultSelect={handleResultSelect('maa')}
              onSearchChange={handleSearchChange}
              name="maa"
              results={searchResults.maa}
              value={organisaatioTila.maa}
              label="Maa"
              icon={null}
            />
          </Form.Input>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Tapahtuman nimi"
            name="tapahtuma_nimi"
            value={organisaatioTila.tapahtuma_nimi}
            onChange={muutaOrganisaationTila}
            error={virheet.tapahtuma_nimiVirhe}
          >
            <Search
              loading={isLoading.tapahtuma_nimi}
              onResultSelect={handleResultSelect('tapahtuma_nimi')}
              onSearchChange={handleSearchChange}
              name="tapahtuma_nimi"
              results={searchResults.tapahtuma_nimi}
              value={organisaatioTila.tapahtuma_nimi}
              label="Tapahtuma nimi"
              icon={null}
            />
          </Form.Input>
          <Form.Input
            fluid
            label="Tapahtuman luonne"
            name="tapahtuma_luonne"
            value={organisaatioTila.tapahtuma_luonne}
            onChange={muutaOrganisaationTila}
            error={virheet.tapahtuma_luonneVirhe}
          >
            <Search
              loading={isLoading.tapahtuma_luonne}
              onResultSelect={handleResultSelect('tapahtuma_luonne')}
              onSearchChange={handleSearchChange}
              name="tapahtuma_luonne"
              results={searchResults.tapahtuma_luonne}
              value={organisaatioTila.tapahtuma_luonne}
              label="Tapahtuman luonne"
              icon={null}
            />
          </Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Input
            width={8}
            label="Tapahtuman asiasana"
            name="kuvaus"
            value={organisaatioTila.kuvaus}
            onChange={muutaOrganisaationTila}
            error={virheet.asiasanaVirhe}
          >
            <Search
              loading={isLoading.kuvaus}
              onResultSelect={handleResultSelect('kuvaus')}
              onSearchChange={handleSearchChange}
              name="kuvaus"
              results={searchResults.kuvaus}
              value={organisaatioTila.kuvaus}
              label="Asiasana"
              icon={null}
            />
          </Form.Input>

          <Form.Input
            width={8}
            label="Tapahtuman uutisointi"
            name="paivays"
            value={organisaatioTila.paivays}
            onChange={muutaOrganisaationTila}
            error={virheet.paivaysVirhe}
          >
            <Search
              loading={isLoading.paivays}
              onResultSelect={handleResultSelect('paivays')}
              onSearchChange={handleSearchChange}
              name="paivays"
              results={searchResults.paivays}
              value={organisaatioTila.paivays}
              label="Tapahtuman uutisointi"
              icon={null}
            />
          </Form.Input>
        </Form.Group>
        <Form.Field>
          <Form.Checkbox
            style={{ marginTop: '1.0rem', marginBottom: '1.0rem' }}
            label="Organsaation/tapahtuman syöttö on valmis julkaistavaksi"
            name="valmis"
            checked={organisaatioTila.valmis}
            onChange={muutaValmis}
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Form.TextArea
            label="Viesti"
            placeholder="Kommentti toiselle tutkijalle tms."
            name="viesti"
            value={organisaatioTila.viesti}
            onChange={muutaOrganisaationTila}
          />
        </Form.Group>

        <Button onClick={tarkistaOrganisaatiolomake}>Tallenna</Button>

        <Button
          onClick={tyhjennaOrganisaatioLomake}
          style={{ marginLeft: '5.0rem' }}
        >
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
    </Container>
  );
};

export default Organisaatiolomake;
