import React from 'react';
import styled from 'styled-components';
import { Container, Responsive } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import RdHeader from './RdHeader';
import RdMenu from './RdMenu';
import MobileMenu from './MobileMenu';

const MainStructure = ({ className }) => {
  const history = useHistory();
  return (
    <div className={className}>
      <Container>
        <RdHeader />
        <Responsive minWidth={100} maxWidth={991}>
          <MobileMenu history={history} />
        </Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <RdMenu history={history} activeItem="valinnat" />
        </Responsive>
        <h1 id="infoHeader" className="ui header">
          VALINNAT
        </h1>
        <p>
          <i>Sateenkaarihistorian hakusanakirjan</i> laatiminen nojaa tällä
          sivulla esiteltyihin valintoihin.
        </p>
        <div className="ui padded segment">
          <h3 className="ui header">AINEISTO</h3>
          <h4 className="ui header">Sanomalehden valinta</h4>
          <p>
            Sukupuolen ja seksuaalisuuden moninaisuutta käsittelevä aineisto on
            kerätty digitoiduista <i>Helsingin Sanomat</i> -sanomalehdistä.
            Pääkaupunkiseudulle on muuttanut vuosikymmenien ajan paljon ihmisiä
            ympäri maata – ja jotkut heistä ehkä myös siksi, että voisivat
            siellä elää vapaammin omanlaistaan elämää. Pääkaupungissa
            ilmestyvään sanomalehteen löytävät siksi todennäköisemmin ilmaisunsa
            myös totutusta poikkeavat ajatukset ja elämänmuodot.
          </p>
          <p>
            <i>Helsingin Sanomat</i> kuuluu niihin sanomalehtiin, joita
            Kansalliskirjasto on digitoinut asiakkaittensa käyttöön.
            Hakusanakirjan aikarajaukseksi on valittu 1904–1939 yhtäältä
            aineiston saatavuudesta ja toisaalta yksilönsuojasta johtuvista
            syistä.
          </p>
          <h4 className="ui header">Aineiston keruu ja rajaus</h4>
          <p>
            Verkossa julkaistuun hakusanakirjaan sisällytetty aineisto on
            kerätty tällä aikarajauksella kohdistamalla digitoituun
            sanomalehteen sanahakuja lumipallomenetelmää käyttäen. Relevanttien
            artikkelien etsimisen lähtökohdaksi on otettu yhtäältä erilaisia
            homoseksuaalisuus-sanan johdannaisia tai muita jo tunnettuja
            historiallisia käsitteitä, ja toisaalta homoseksuaalisiksi
            tiedettyjä historiallisia henkilöitä, kuten ulkomaisia
            taiteilijoita. Näin löydettyjä artikkeleja on luettu uusien
            synonyymisten ilmauksien löytämiseksi, ja niitä taas on käytetty
            edelleen uusien havaintojen etsimiseen.
          </p>
          <p>
            Huomaa, että huolellakaan tehdyt sanahaut eivät ole tuloksiltaan
            aukottomia. Varsinkin koneellisesti luettu fraktuura tuottaa
            edelleen paljon lukuvirheitä, jolloin osa haetuista sanoista jää
            löytämättä.
          </p>
          <p>
            Mukaan on otettu ilmaisuja, jotka viittaavat joko avoimesti
            sukupuolen tai seksuaalisuuden monimuotoisuuteen, tai ovat
            tulkittavissa kyseisessä asiayhteydessä näistä käytetyiksi
            kiertoilmauksiksi.
          </p>
        </div>
        <div className="ui padded segment">
          <h3 id="sanakirja" className="ui header">
            SANAKIRJA
          </h3>
          <p>
            Sanakirja-alasivulta löytyvät aakkosjärjestyksessä ne sanat ja
            ilmaisut, joita on käytetty sukupuolen tai seksuaalisuuden
            moninaisuudesta kirjoitettaessa.
          </p>
          <div className="ui divider" />
          <h4 className="ui content header">Sanat</h4>
          <p>
            Uusia sukupuolen ja seksuaalisuuden moninaisuuteen viittaavia sanoja
            ja ilmauksia on hyväksytty mukaan silloin, kun ne viittaavat joko
            avoimesti sukupuolen tai seksuaalisuuden monimuotoisuuteen, tai ovat
            tulkittavissa kyseisessä asiayhteydessä näistä käytetyiksi
            kiertoilmauksiksi.
          </p>
          <h4 className="ui content header">Sanaluokat</h4>
          <p>
            Löydetyt sanat on luokiteltu sanaluokkiin. Näitä ovat:
            <ul>
              <li>adjektiivi</li>
              <li>adverbi</li>
              <li>substantiivi</li>
              <li>verbi</li>
            </ul>
            Lisäksi on mainittu erikseen:
            <ul>
              <li>erisnimi</li>
              <li>ominaisuus</li>
            </ul>
          </p>
          <h4 className="ui content header">Sanaparit eli kollokaatiot</h4>
          <p>
            Kollokaatioiksi on nimetty ne sanaparit, joiden sukupuolen tai
            seksuaalisuuden moninaisuuteen viittaava merkitys syntyy siitä, että
            sanat esiintyvät yhdessä
          </p>
          <h4 className="ui content header">
            Useampisanaiset ilmaisut eli fraasit
          </h4>
          <p>
            Fraaseiksi on nimetty ne sukupuolen tai seksuaalisuuden
            moninaisuuteen viittaavat ilmaukset, joiden merkitys syntyy vasta
            monisanaisuudesta.
          </p>
          <h4 className="ui content header">Selite</h4>
          <p>
            Hakusanoille on annettu selite, joka noudattaa soveltuvin osin
            sanakirjaselityksiä (Nykysuomen sanakirja 1967; Kielitoimiston
            sanakirjan jatkuvasti päivittyvä web-versio{' '}
            <a
              href="https://www.kielitoimistonsanakirja.fi"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.kielitoimistonsanakirja.fi
            </a>
            ). Muussa tapauksessa on käytetty lähisanan sanakirjaselitystä tai
            asiayhteydestä pääteltyä merkitystä. Selitteen laatimisessa on
            pyritty välttämään anakronismeja.
          </p>
          <h4 className="ui content header">Asiasana</h4>
          <p>
            Asiasana on otettu mukaan yksinkertaistamaan aiheenmukaisia hakuja.
            Se kertoo nykykäsittein sen aihealueen, johon sanan käyttö
            läheisimmin viittaa. Hakusanakirjassa käytettyjä asiasanoja ovat:
          </p>
          <ul>
            <li>Biseksuaalisuus</li>
            <li>Ei-heteroseksuaalisuus</li>
            <li>Homoseksuaalisuus</li>
            <li>Homoseksuaalisuus, miehet</li>
            <li>Homoseksuaalisuus, naiset</li>
            <li>Intersukupuolisuus</li>
            <li>Lesbous</li>
            <li>Queer</li>
            <li>Ristiinpukeutuminen</li>
            <li>Seksin myyminen</li>
            <li>Seksin ostaminen</li>
            <li>Sukupuoli</li>
            <li>Sukupuoliristiriita</li>
            <li>Transsukupuolisuus</li>
          </ul>
          <h4 className="ui content header">Tyylilaji</h4>
          <p>
            Jos siihen on ollut erityistä aihetta, hakusanalle on annettu
            tyylilaji, joka on päätelty sanan käyttöyhteydestä. Hakusanakirjassa
            mainitut tyylilajit ovat:
          </p>
          <ul>
            <li>Eufemismi</li>
            <li>Vanhahtava ilmaisu</li>
            <li>Lääketieteen kieli</li>
          </ul>
          <h4 className="ui content header">Käyttöala</h4>
          <p>
            Sanalle määritelty käyttöala viittaa siihen elämänpiiriin, johon
            sanan käyttöyhteys sanomalehdessä liittyy. Hakusanakirjassa käytetyt
            käyttöalat ovat:
          </p>
          <ul>
            <li>Armeija</li>
            <li>Elokuva</li>
            <li>Historia</li>
            <li>Kielitiede</li>
            <li>Kirjallisuus</li>
            <li>Kuvataide</li>
            <li>Lainsäädäntö</li>
            <li>Lääketiede</li>
            <li>Nekrologi</li>
            <li>Politiikka</li>
            <li>Rikosuutisointi</li>
            <li>Taide</li>
            <li>Teatteri</li>
            <li>Tiede</li>
            <li>Urheilu</li>
            <li>Usko</li>
          </ul>
          <h4 className="ui content header">Asiayhteys</h4>
          <p>
            Sanan käyttökonteksti eli asiayhteys ilmenee osittain siitä
            sanomalehden osiosta, jossa esimerkkilause esiintyy. Koska
            varhaisissa sanomalehdissä osioita ei ole valmiiksi nimetty, niille
            muodostettiin nimet tekstityypin mukaan tai suhteuttamalla
            uutisointia nykyisen lehden osioihin. Hakusanakirjassa käytetyt
            sanomalehden osioiden nimet ovat:
          </p>
          <ul>
            <li>Ilmoitus (tapahtumailmoitukset ym.)</li>
            <li>
              Kulttuuri (ml. kotimainen ja ulkomainen kirjallisuus, kotimaiset
              ja ulkomaiset näytelmät)
            </li>
            <li>Mainos</li>
            <li>Mielipide</li>
            <li>Novelli</li>
            <li>Pakina</li>
            <li>Politiikka</li>
            <li>
              Tiede (lääkärien ym. kirjoittamat sivistävät ja tiedottavat
              tekstit)
            </li>
            <li>Ulkomaat (ulkomaan uutiset)</li>
            <li>Urheilu</li>
            <li>Kotimaa (kotimaan uutiset)</li>
          </ul>
          <h4 className="ui content header">Esimerkkilause</h4>
          <p>
            Esimerkkilauseesta käy ilmi se, miten sanaa tai ilmaisua on käytetty
            sanomalehdessä. Tavallisimmin mainitaan vain sanan tai ilmaisun
            sisältämä lause, mutta jos sen merkityksen ymmärtäminen vaatii
            laajemman kontekstin, lainaus voi olla laajempi. Hyvin pitkiä
            lainauksia on voitu myös lyhentää, jolloin poistot on merkitty […].
          </p>
          <h4 className="ui content header">Lähteen merkintä</h4>
          <p>
            Esimerkkilauseen ilmeneminen on seurattavissa tiettyyn lehteen (HS,
            <i> Helsingin Sanomat</i>), ja siinä ilmestyneen tekstikatkelman
            julkaisuvuoteen, kuukauteen ja -päivään, sekä lehden sivunumeroon
            (HSvvvv-kk-pp-000).
          </p>
          <h4 className="ui content header">Puuttuva tieto</h4>
          <p>Puuttuva tieto on ilmaistu kahdella pisteellä ·· .</p>
          <h4 className="ui content header">Hakumahdollisuudet</h4>
          <p>
            Hakusanat-alasivulla esiintyvää materiaalia voi hakea paitsi
            aakkosittain ja hakusanoittain, myös asiasanoittain.
          </p>
        </div>
        <div className="ui padded segment">
          <h3 id="kulttuurituote" className="ui header">
            KULTTUURITUOTTEET
          </h3>
          <p>
            Kulttuurituote-alasivulta löytyvät aakkosjärjestyksessä ne nimeltä
            mainitut kulttuurituotteet, joiden yhteydessä sukupuolen tai
            seksuaalisuuden moninaisuutta on käsitelty.
          </p>
          <div className="ui divider" />
          <h4 className="ui content header">Teoksen nimi</h4>
          <p>
            Kulttuurituotteista on ilmoitettu se nimi, joka uutisessa mainitaan.
            Huomaa, että lehdessä kirjoitusasu voi myös poiketa alkuperäisestä.
          </p>
          <h4 className="ui content header">Lajityyppi</h4>
          <p>
            Teoksen lajityyppi on ilmoitettu taidelajeittain. Hakusanakirjassa
            käytetyt taidelajit ovat:
          </p>
          <ul>
            <li>Elämäkerta</li>
            <li>Kirja</li>
            <li>Näytelmä</li>
            <li>Oodi</li>
            <li>Ooppera</li>
            <li>Romaani</li>
            <li>Runokokoelma</li>
            <li>Tietokirjallisuus</li>
          </ul>
          <h4 className="ui content header">Asiasana</h4>
          <p>
            Asiasana kertoo sen aihealueen, jonka perusteella teos on
            sisällytetty tähän hakusanakirjaan. Asiasanat ovat samat kuin
            sanakirjaosiossa.
          </p>
          <h4 className="ui content header">
            Teokseen liitetty paikkakunta ja/tai maa
          </h4>
          <p>
            Jos teos sijoittuu tiettyyn nimeltä mainittuun paikkakuntaan ja/tai
            maahan, joka lehdessä on mainittu, tämä on ilmoitettu. Puuttuva
            tieto on ilmaistu kahdella pisteellä ·· .
          </p>
          <h3 className="ui content header">Henkilöt</h3>
          <p>
            Teosta koskeviin tietoihin on liitetty uutisen perusteella niiden
            henkilöiden nimet, jotka ovat vaikuttaneet teoksen syntyyn. Huomaa,
            että lehdessä nimien kirjoitusasu voi myös poiketa alkuperäisestä.
            EU:n yleisen tietosuoja-asetuksen (General Data Protection
            Regulation, GDPR) vuoksi sanakirjaan ei ole liitetty
            kulttuurituotteiden tekijöitä sillä perusteella, että sukupuolen tai
            seksuaalisuuden moninaisuus olisi sanomalehdessä yhdistetty heidän
            yksityiselämäänsä.
          </p>
          <h4 className="ui content header">Ammatti</h4>
          <p>
            Tekijästä on mainittu hänen ammattinsa mukainen suhde teokseen.
            Hakusanakirjassa käytetyt ammattinimikkeet ovat:
            <ul>
              <li>Kirjailija</li>
              <li>Kääntäjä</li>
              <li>Laulaja</li>
              <li>Luennoitsija</li>
              <li>Muusikko</li>
              <li>Näytelmäkirjailija</li>
              <li>Näyttelijä</li>
              <li>Ohjaaja</li>
              <li>Runoilija</li>
              <li>Säveltäjä</li>
            </ul>
          </p>
          <h4 className="ui content header">
            Tekijään liitetty paikkakunta ja/tai maa
          </h4>
          <p>
            Jos tekijän yhteydessä lehdessä on mainittu tietty nimeltä mainittu
            paikkakunta ja/tai maa, tämä on ilmoitettu. Puuttuva tieto on
            ilmaistu kahdella pisteellä ·· .
          </p>
          <h4 className="ui content header">Hakumahdollisuudet</h4>
          <p>
            Kulttuurituotteet-alasivulla esiintyvää materiaalia voi hakea paitsi
            teoksen tai teoslajin, tekijän tai hänen ammattinsa mukaan, myös
            näihin liitetyn paikkakunnan varassa. Lisäksi hakuja voi tehdä
            teokseen liitetyillä asiasanoilla.
          </p>
        </div>
        <div className="ui padded segment">
          <h3 id="organisaatiot" className="ui header">
            ORGANISAATIOT
          </h3>
          <p>
            Organisaatiot-alasivulta löytyy aakkosjärjestyksessä nimettynä ne
            organisaatiot, joiden yhteydessä sukupuolen tai seksuaalisuuden
            moninaisuutta on käsitelty. Huomaa, että lehdessä toimijatahojen
            kirjoitusasu voi myös poiketa alkuperäisestä.
          </p>
          <div className="ui divider" />
          <h4 className="ui content header">Organisaatio</h4>
          <p>
            Organisaatiosta on käytetty sitä nimeä, jota lehdessä on käytetty.
          </p>
          <h4 className="ui content header">Tapahtuman luonne </h4>
          <p>
            Organisaation järjestämästä tapahtumasta on ilmoitettu sen luonne
            niin, kuin se ilmenee sanomalehdestä. Puuttuva tieto ilmoitetaan
            kahdella pisteellä ·· .
          </p>
          <h4 className="ui content header">Tapahtuman nimi</h4>
          <p>
            Tapahtumasta on ilmoitettu sen nimi, jos se on mainittu lehdessä.
            Puuttuva tieto on ilmaistu kahdella pisteellä ·· .
          </p>
          <h4 className="ui content header">Asiasana</h4>
          <p>
            Asiasana kertoo sen aihealueen, jonka perusteella organisaatio on
            sisällytetty tähän hakusanakirjaan. Asiasanat ovat samat kuin
            sanakirjaosiossa.
          </p>
          <h4 className="ui content header">Kotipaikka ja/tai maa</h4>
          <p>
            Jos organisaation yhteydessä lehdessä on mainittu sen kotipaikka
            ja/tai maa, tämä on ilmoitettu. Puuttuva tieto on ilmaistu kahdella
            pisteellä ·· .
          </p>
          <h4 className="ui content header">Päiväys</h4>
          <p>
            Uutisen ilmestyminen on ilmaistu kertomalla lehti, julkaisuvuosi,
            kuukausi, ja -päivä (HS-vvvv-kk-pv).
          </p>
          <h4 className="ui content header">Hakumahdollisuudet</h4>
          <p>
            Organisaatiot-alasivulla esiintyvää materiaalia voi hakea paitsi
            organisaation tai tapahtuman nimellä, myös näihin liitetyn
            paikkakunnan ja maan, sekä tapahtumaan liittyvän asiasanan
            perusteella.
          </p>
        </div>
      </Container>
    </div>
  );
};

const RdInformation = styled(MainStructure)`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.primary.main};

  #infoHeader {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
  .header {
    color: ${({ theme }) => theme.palette.primary.dark};
  }
  .ui.segment {
    text-align: left;
    margin-bottom: 3rem;
  }
  .ui.list {
    font-size: 0.9rem;
  }
  .ui.medium.header {
    margin-top: 0.5rem;
  }
`;

export default RdInformation;
