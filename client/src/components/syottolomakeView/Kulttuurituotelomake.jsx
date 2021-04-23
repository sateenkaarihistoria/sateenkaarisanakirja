import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Form,
  Search,
  Container,
  Modal,
  Message,
} from 'semantic-ui-react';
import { postData, getSuojattuData } from '../../api/api';
import { useStateValue, setToken } from '../../context/';

const Kulttuurituotelomake = props => {
  const [{ user }, dispatch] = useStateValue();
  const [lisattyAuki, setLisattyAuki] = useState(false);
  const [errors, setErrors] = useState(null);

  //Hookit hakutuloksille ja latausikonille
  const [initialResults, setInitialResults] = useState({});
  const [searchResults, setSearchResults] = useState({});
  const [isLoading, setIsLoading] = useState({
    etunimi: false,
    sukunimi: false,
    ammatti: false,
    paikkakunta: false,
    maa: false,
    teos_nimi: false,
    lajityyppi: false,
    asiasana: false,
    tapahtumapaikkakunta: false,
    tapahtumamaa: false,
  });

  //Hookki kulttuurituotteen kenttiä varten
  const [kulttuurituoteTila, setKulttuurituoteTila] = useState({
    etunimi: '',
    sukunimi: '',
    ammatti: '',
    paikkakunta: '',
    maa: '',
    teos_nimi: '',
    lajityyppi: '',
    asiasana: '',
    tapahtumapaikkakunta: '',
    tapahtumamaa: '',
    viesti: '',
    valmis: false,
  });

  //virheisiin liittyvät tilat
  const [virheet, setVirheet] = useState({
    etunimiVirhe: false,
    sukunimiVirhe: false,
    ammattiVirhe: false,
    paikkakuntaVirhe: false,
    maaVirhe: false,
    teos_nimiVirhe: false,
    lajityyppiVirhe: false,
    asiasanaVirhe: false,
    tapahtumapaikkakuntaVirhe: false,
    tapahtumamaaVirhe: false,
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

  //Metodi joka hakee lomakkeen sisällön typeaheadia varten
  const fetchResults = () => {
    getSuojattuData('/api/kulttuuriteoslomake', user.token).then(result => {
      if (result.status === 'success') {
        const mappedResults = result.data.reduce((prev, r) => {
          const [key, value] = Object.entries(r)[0];

          // välimuuttuja jotta 'kuvaus' -> 'asiasana' mappays menee oikein
          let objkey = key === 'kuvaus' ? 'asiasana' : key;

          prev[objkey] = value;

          if (objkey === 'paikkakunta') {
            prev['tapahtumapaikkakunta'] = value;
          }

          if (objkey === 'maa') {
            prev['tapahtumamaa'] = value;
          }

          return prev;
        }, {});

        setInitialResults(mappedResults);
      } else {
        console.error('Kulttuurituotelomakkeen tietojen haku epäonnistui');
      }
    });
  };

  // Effect hook hakee asiasanat valmiiksi kutsumalla api.js haeAsiasanat-funktiota
  // ennen komponentin renderöintiä
  useEffect(fetchResults, []);

  const handleResultSelect = name => (e, { result }) =>
    setKulttuurituoteTila(prev => ({
      ...prev,
      [name]: result.title,
    }));

  //Typeaheadin tulosten valintatilannetta käsittelevä metodi
  const handleSearchChange = e => {
    const { name, value } = e.target;

    setIsLoading(prev => ({
      ...prev,
      [name]: true,
    }));

    muutaKulttuurituotteenTilaa(e);

    //Tyhjennetään hakutulokset jos pituus nolla
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

  // kulttuurituotteen tilan muuttaminen
  const muutaKulttuurituotteenTilaa = e => {
    const { name, value } = e.target;
    setKulttuurituoteTila(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Checkboxin kontrolloiman valmis-arvon muuttaminen
  const muutaValmis = () => {
    setKulttuurituoteTila(prev => ({
      ...prev,
      valmis: !kulttuurituoteTila.valmis,
    }));
  };

  // Funktio muuntaa sanan ensimmäisen kirjaimen isoksi
  const muunnaKirjainIsoksi = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  }

  // Funktio muuntaa sanan ensimmäisen kirjaimen pieneksi
  const muunnaKirjainPieneksi = (s) => {
    return s[0].toLowerCase() + s.slice(1);
  }

  //Tarkistetaan lomake, että siinä on tarvittavat tiedot tallennusta varten
  const tarkistaKulttuurituoteLomake = async () => {
    //let lehtiosiotarkistus = lehtiosio.value;
    let virhe = false;

    //tarkastetaan ovatko kentät tyhjät
    //jos ovat niin merkataan virhe todeksi
    if (kulttuurituoteTila['etunimi'].trim() === '') {
      paivitaVirheet('etunimiVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('etunimiVirhe', false);
    }
    if (kulttuurituoteTila['sukunimi'].trim() === '') {
      paivitaVirheet('sukunimiVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('sukunimiVirhe', false);
    }
    if (kulttuurituoteTila['maa'].trim() === '') {
      paivitaVirheet('maaVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('maaVirhe', false);
    }
    if (kulttuurituoteTila['paikkakunta'].trim() === '') {
      paivitaVirheet('paikkakuntaVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('paikkakuntaVirhe', false);
    }
    if (kulttuurituoteTila['ammatti'].trim() === '') {
      paivitaVirheet('ammattiVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('ammattiVirhe', false);
    }
    if (kulttuurituoteTila['lajityyppi'].trim() === '') {
      paivitaVirheet('lajityyppiVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('lajityyppiVirhe', false);
    }
    if (kulttuurituoteTila['teos_nimi'].trim() === '') {
      paivitaVirheet('teos_nimiVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('teos_nimiVirhe', false);
    }
    if (kulttuurituoteTila['asiasana'].trim() === '') {
      paivitaVirheet('asiasanaVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('asiasanaVirhe', false);
    }
    if (kulttuurituoteTila['etunimi'].trim() === '') {
      paivitaVirheet('etunimiVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('etunimiVirhe', false);
    }
    if (kulttuurituoteTila['tapahtumapaikkakunta'].trim() === '') {
      paivitaVirheet('tapahtumapaikkakuntaVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('tapahtumapaikkakuntaVirhe', false);
    }
    if (kulttuurituoteTila['tapahtumamaa'].trim() === '') {
      paivitaVirheet('tapahtumamaaVirhe', true);
      virhe = true;
    } else {
      paivitaVirheet('tapahtumamaaVirhe', false);
    }

    if (!virhe) {
      var luoFormiobjekti2 = {
        etunimi: muunnaKirjainIsoksi(kulttuurituoteTila['etunimi']),
        sukunimi: muunnaKirjainIsoksi(kulttuurituoteTila['sukunimi']),
        henkilo_maa: muunnaKirjainIsoksi(kulttuurituoteTila['maa']),
        henkilo_paikkakunta: muunnaKirjainIsoksi(kulttuurituoteTila['paikkakunta']),
        ammattinimike: muunnaKirjainPieneksi(kulttuurituoteTila['ammatti']),
        lajityyppi: muunnaKirjainPieneksi(kulttuurituoteTila['lajityyppi']),
        nimi: muunnaKirjainIsoksi(kulttuurituoteTila['teos_nimi']),
        kuvaus: muunnaKirjainPieneksi(kulttuurituoteTila['asiasana']),
        teos_paikkakunta: muunnaKirjainIsoksi(kulttuurituoteTila['tapahtumapaikkakunta']),
        teos_maa: muunnaKirjainIsoksi(kulttuurituoteTila['tapahtumamaa']),
        viesti: kulttuurituoteTila['viesti'],
        valmis: kulttuurituoteTila['valmis'],
      };

      await postData('/api/kulttuuriteos', luoFormiobjekti2, user.token).then(
        result => {
          if (result.status === 'success') {
            dispatch(setToken(result.data.token));
            setLisattyAuki(true);
          } else {
            hoidaVirheet(result);
          }
        },
      );

      tyhjennaKulttuurituoteLomake();
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

  //Metodi lomakkeen tietojen tyhjentämiselle
  const tyhjennaKulttuurituoteLomake = () => {
    setKulttuurituoteTila({
      etunimi: '',
      sukunimi: '',
      ammatti: '',
      paikkakunta: '',
      maa: '',
      teos_nimi: '',
      lajityyppi: '',
      asiasana: '',
      tapahtumapaikkakunta: '',
      tapahtumamaa: '',
      viesti: '',
      valmis: false,
      etunimiVirhe: false,
      sukunimiVirhe: false,
      ammattiVirhe: false,
      paikkakuntaVirhe: false,
      maaVirhe: false,
      teos_nimiVirhe: false,
      lajityyppiVirhe: false,
      asiasanaVirhe: false,
      tapahtumapaikkakuntaVirhe: false,
      tapahtumamaaVirhe: false,
      virheViesti: 'Täytä kaikki kentät',
      virhe: false,
    });
  };

  //Lomakkeen kentät ja niissä käytettävät tominnallisuudet
  return (
    <Container>
      {errors ? (
        <Message negative>
          <Message.Header>Syöttö epäonnistui</Message.Header>
          {errors.map(error => {
            return <p key={error.param}> {error.msg}</p>;
          })}
        </Message>
      ) : null}
      <Form name="Kulttuurituotelomake" method="post">
        <font size="6" color="purple">
          Kulttuurituotelomake
        </font>
        <Form.Group widths="equal" style={{ marginTop: '1rem' }}>
          <Form.Input
            fluid
            label="Tekijän etunimi"
            name="etunimi"
            value={kulttuurituoteTila['etunimi']}
            onChange={muutaKulttuurituotteenTilaa}
            error={virheet['etunimiVirhe']}
          >
            <Search
              loading={isLoading['etunimi']}
              onResultSelect={handleResultSelect('etunimi')}
              onSearchChange={handleSearchChange}
              name="etunimi"
              results={searchResults['etunimi']}
              value={kulttuurituoteTila['etunimi']}
              label="Tekijän etunimi"
              icon={null}
            />
          </Form.Input>
          <Form.Input
            fluid
            label="Tekijän sukunimi"
            placeholder=""
            name="sukunimi"
            value={kulttuurituoteTila['sukunimi']}
            onChange={muutaKulttuurituotteenTilaa}
            error={virheet['sukunimiVirhe']}
          >
            <Search
              loading={isLoading['sukunimi']}
              onResultSelect={handleResultSelect('sukunimi')}
              onSearchChange={handleSearchChange}
              name="sukunimi"
              results={searchResults['sukunimi']}
              value={kulttuurituoteTila['sukunimi']}
              label="Tekijän sukunimi"
              icon={null}
            />
          </Form.Input>
          <Form.Input
            fluid
            label="Tekijän ammatti"
            name="ammatti"
            value={kulttuurituoteTila['ammatti']}
            onChange={muutaKulttuurituotteenTilaa}
            error={virheet['ammattiVirhe']}
          >
            <Search
              loading={isLoading['ammatti']}
              onResultSelect={handleResultSelect('ammatti')}
              onSearchChange={handleSearchChange}
              name="ammatti"
              results={searchResults['ammatti']}
              value={kulttuurituoteTila['ammatti']}
              label="Tekijän ammatti"
              icon={null}
            />
          </Form.Input>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Tekijän paikkakunta"
            placeholder=""
            name="paikkakunta"
            value={kulttuurituoteTila['paikkakunta']}
            onChange={muutaKulttuurituotteenTilaa}
            error={virheet['paikkakuntaVirhe']}
          >
            <Search
              loading={isLoading['paikkakunta']}
              onResultSelect={handleResultSelect('paikkakunta')}
              onSearchChange={handleSearchChange}
              name="paikkakunta"
              results={searchResults['paikkakunta']}
              value={kulttuurituoteTila['paikkakunta']}
              label="Tekijän paikkakunta"
              icon={null}
            />
          </Form.Input>
          <Form.Input
            fluid
            label="Tekijän maa"
            name="maa"
            value={kulttuurituoteTila['maa']}
            onChange={muutaKulttuurituotteenTilaa}
            error={virheet['maaVirhe']}
          >
            <Search
              loading={isLoading['maa']}
              onResultSelect={handleResultSelect('maa')}
              onSearchChange={handleSearchChange}
              name="maa"
              results={searchResults['maa']}
              value={kulttuurituoteTila['maa']}
              label="Tekijän maa"
              icon={null}
            />
          </Form.Input>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Teoksen nimi"
            name="teos_nimi"
            value={kulttuurituoteTila['teos_nimi']}
            onChange={muutaKulttuurituotteenTilaa}
            error={virheet['teos_nimiVirhe']}
          >
            <Search
              loading={isLoading['teos_nimi']}
              onResultSelect={handleResultSelect('teos_nimi')}
              onSearchChange={handleSearchChange}
              name="teos_nimi"
              results={searchResults['teos_nimi']}
              value={kulttuurituoteTila['teos_nimi']}
              label="Teoksen nimi"
              icon={null}
            />
          </Form.Input>
          <Form.Input
            fluid
            label="Teoksen lajityyppi"
            placeholder="Kirja/musiikki/taideteos jne."
            name="lajityyppi"
            value={kulttuurituoteTila['lajityyppi']}
            onChange={muutaKulttuurituotteenTilaa}
            error={virheet['lajityyppiVirhe']}
          >
            <Search
              loading={isLoading['lajityyppi']}
              onResultSelect={handleResultSelect('lajityyppi')}
              onSearchChange={handleSearchChange}
              name="lajityyppi"
              results={searchResults['lajityyppi']}
              value={kulttuurituoteTila['lajityyppi']}
              label="Teoksen lajityyppi"
              icon={null}
            />
          </Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Input
            width={8}
            label="Teoksen asiasana"
            name="asiasana"
            value={kulttuurituoteTila['asiasana']}
            onChange={muutaKulttuurituotteenTilaa}
            error={virheet['asiasanaVirhe']}
          >
            <Search
              loading={isLoading['asiasana']}
              onResultSelect={handleResultSelect('asiasana')}
              onSearchChange={handleSearchChange}
              name="asiasana"
              results={searchResults['asiasana']}
              value={kulttuurituoteTila['asiasana']}
              label="Teoksen asiasana"
              icon={null}
            />
          </Form.Input>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Teoksen paikkakunta"
            name="tapahtumapaikkakunta"
            value={kulttuurituoteTila['tapahtumapaikkakunta']}
            onChange={muutaKulttuurituotteenTilaa}
            error={virheet['tapahtumapaikkakuntaVirhe']}
          >
            <Search
              loading={isLoading['tapahtumapaikkakunta']}
              onResultSelect={handleResultSelect('tapahtumapaikkakunta')}
              onSearchChange={handleSearchChange}
              name="tapahtumapaikkakunta"
              results={searchResults['tapahtumapaikkakunta']}
              value={kulttuurituoteTila['tapahtumapaikkakunta']}
              label="Teoksen paikkakunta"
              icon={null}
            />
          </Form.Input>
          <Form.Input
            fluid
            label="Teoksen tapahtumamaa"
            name="tapahtumamaa"
            value={kulttuurituoteTila['tapahtumamaa']}
            onChange={muutaKulttuurituotteenTilaa}
            error={virheet['tapahtumamaaVirhe']}
          >
            <Search
              loading={isLoading['tapahtumamaa']}
              onResultSelect={handleResultSelect('tapahtumamaa')}
              onSearchChange={handleSearchChange}
              name="tapahtumamaa"
              results={searchResults['tapahtumamaa']}
              value={kulttuurituoteTila['tapahtumamaa']}
              label="Teoksen tapahtumamaa"
              icon={null}
            />
          </Form.Input>
        </Form.Group>

        <Form.Field>
          <Form.Checkbox
            style={{ marginTop: '1.0rem', marginBottom: '1.0rem' }}
            label="Kulttuurituotteen syöttö on valmis julkaistavaksi"
            name="valmis"
            checked={kulttuurituoteTila.valmis}
            onChange={muutaValmis}
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Form.TextArea
            label="Viesti"
            placeholder="Kommentti toiselle tutkijalle tms."
            name="viesti"
            value={kulttuurituoteTila.viesti}
            onChange={muutaKulttuurituotteenTilaa}
          />
        </Form.Group>

        <Button onClick={tarkistaKulttuurituoteLomake}>Tallenna</Button>

        <Button
          onClick={tyhjennaKulttuurituoteLomake}
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

export default Kulttuurituotelomake;
