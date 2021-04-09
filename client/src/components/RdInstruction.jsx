import React from 'react';
import styled from 'styled-components';
import { Container, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';
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
          <RdMenu history={history} activeItem="Käyttöohje" />
        </Responsive>
        <h1 id="infoHeader" className="ui header">
          KÄYTTÖOHJE
        </h1>
        <div className="ui padded segment">
          <p>
            <i>Sateenkaarihistorian hakusanakirja</i> tarjoaa monenlaisia
            mahdollisuuksia menneisyyteen sukeltamiseen:
          </p>
          <h3 className="ui header">1) SANAKIRJA-ALASIVU</h3>
          <p>
            Hakusanalistan avulla voit tutkia aakkosjärjestyksessä niitä{' '}
            <b>
              <i>sanoja ja ilmauksia</i>
            </b>
            , joita on käytetty sukupuolen ja seksuaalisuuden moninaisuudesta
            kirjoitettaessa. Huomaa, että sanojen tallennus alkaa vuodesta 1904
            ja päättyy vuoteen 1939. Joidenkin mukaan otettujen sanojen käyttö
            on jatkunut senkin jälkeen, kun taas toiset ilmaisut ovat sittemmin
            jääneet pois käytöstä, samalla kun sanomalehtien sivuille on
            ilmestynyt uusia, tästä hakusanakirjasta puuttumaan jääviä
            ilmaisuja.
          </p>
          <p>
            Mukaan otetuille hakusanoille on annettu selite, jonka muotoilu on
            mahdollisuuksien mukaan poimittu <i>Nykysuomen sanakirjasta</i>{' '}
            (1967). Näin on pyritty välttämään karkeita anakronismeja, eli
            nykyajalle ominaisten ajattelumuotojen siirtämistä menneisyyteen,
            mutta silti on huomattava, että sanojen vivahteet ovat voineet
            poiketa huomattavasti uutisen julkaisemisen aikana sanakirjaan
            painetusta selitteestä. Asiasana puolestaan kertoo nykykäsittein sen
            aihealueen, johon sanan käyttö läheisimmin viittaa. Sanan
            tyylilajimerkintä taas ilmaisee sen, onko sanalla haluttu
            esimerkiksi sievistellä asiaa (eufemismi) tai olisiko sen käyttö
            nykyisin auttamattoman vanhahtavaa. Käyttöala viittaa siihen
            elämänpiiriin, johon käytetty sana on lehdessä liitetty. Usein se on
            esimerkiksi lainsäädäntö, lääketiede tai politiikka, mutta se voi
            olla myös vaikkapa kulttuuri tai urheilu (ks. näistä tarkemmin
            välilehdeltä Valinnat).
          </p>
          <p>
            Sanojen ja ilmauksien käyttöyhteydestä antaa lisää viitteitä se
            sanomalehden osio, jossa esimerkkilause esiintyy. Myös
            esimerkkilause itsessään tarkentaa sanan käytön piiriä ja
            merkityksiä. Koska homoseksuaaliset teot olivat rikollisia kyseisenä
            aikana, useat sanakirjan esimerkkilauseista ovat kielteisesti
            värittyneitä. Se tietysti kertoo enemmän tuolloin vallinneista
            asenteista kuin homoseksuaalisuudesta elettynä kokemuksena tai
            homoseksuaaleista ihmisinä. Esimerkkilauseisiin tutustumalla voit
            seurata myös sitä, millaisiin asioihin samoillakin käsitteillä on
            eri aikoina viitattu. Ensimmäisen ja viimeisen ilmestymisen
            päivämäärä kertoo sanojen esiintymisestä aikavälillä 1904–1939.
          </p>
          <div className="ui tiny header">
            Sanakirja-alasivun hakutoiminnot:
          </div>
          <p>
            Hakukenttään voit kirjoittaa yksittäisiä hakusanoja. Sanojen katkaisuun voi käyttää
            *-merkkiä haun laajentamiseksi. Esimerkiksi haku: <i>homos*</i> antaa vastaukseksi 
            kirjaimilla homos alkavat hakusanat.
            <p>
            <img className="img" width="50%" src="hakuscreen1.png"/>
            </p>
            Katkaisumerkkiä voi käyttää myös hakusana edellä; haku <i>*mies</i> antaa tulokseksi mies-loppuiset tietueet.
          </p>
          <p>
            Hakua voi rajata myös vuoden perusteella, valitsemalla toiminnon <i>Rajaa vuoden perusteella</i>, 
            vuosirajausta voi käyttää hakusanojen lisäksi tai ilman.
            Kirjainvalikon kautta voit etsiä kaikkia tietyllä kirjaimella alkavia sanoja, tai
            voit vain selailla sivun vasemmassa reunassa näkyvää sanalistaa.
            Samaan aihepiiriin liittyviä sanoja voit hakea hakuvalikosta
            asiasanan avulla. Hakusanakirjassa toimivat asiasanat on listattu
            Valinnat-välilehdellä
          </p>
        </div>
        <div className="ui padded segment">
          <h3 className="ui header">2) KULTTUURITUOTTEET-ALASIVU</h3>
          <p>
            Tällä sivulla voit selata niiden sanomalehdessä mainittujen
            kirjojen, näytelmien, oopperoiden, elokuvien tai muiden{' '}
            <b>
              <i>teosten</i>
            </b>{' '}
            nimiä, joiden on kerrottu käsittelevän tavalla tai toisella
            sukupuolen tai seksuaalisuuden moninaisuutta. Teoksen nimen avulla
            voit etsiä sen käsiisi esimerkiksi kirjastosta, ja tekemällä hakuja
            sanomalehdistä teosten nimillä voit puolestaan seurata sitä, miten
            näitä aiheita on käsitelty teosten vastaanotossa eri aikoina. Se,
            että jotain etsimääsi teosta ei löydy listasta, ei tietenkään
            tarkoita, etteikö siinä silti voisi esiintyä näitäkin teemoja. On
            hyvin mahdollista, että teos ei ole osunut tekemiimme hakuihin, tai
            näitä teemoja ei ole otettu esiin sanomalehdessä.
          </p>
          <p>
            Voit tehdä hakuja halutessasi myös{' '}
            <b>
              <i>teoslajin</i>
            </b>{' '}
            perusteella , jos haluat nähdä listan esimerkiksi kaikista
            näytelmistä. Hakusanakirjassa toimivat teoslajit on listattu
            Valinnat-välilehdellä.
          </p>
          <p>
            Halutessasi voit vaihtaa listauksen koskemaan{' '}
            <b>
              <i>kulttuurituotteiden tekijöitä</i>
            </b>
            . Heidän nimensä voi johdattaa sinut edelleen alkuperäisen uutisen
            ääreen tai elämäkertojen pariin. Huomaa, että vaikka
            kulttuurituotteen tekijä on käsitellyt teoksissaan sukupuolen ja
            seksuaalisuuden moninaisuutta, se ei välttämättä merkitse sitä, että
            hän on valinnut aiheen siksi, että se ollut hänelle omakohtainen –
            vaikka joskus näinkin voi olla. Mutta yhtä hyvin hän on voinut
            käyttää aihetta tuotannossaan esimerkiksi kertoakseen jotain
            kuvittelemansa henkilön luonteesta tai asemasta yhteisössään.
          </p>
          <p>
            Voit tehdä hakuja halutessasi myös{' '}
            <b>
              <i>tekijän ammatin</i>
            </b>{' '}
            perusteella, jos haluat nähdä listan esimerkiksi kaikista
            hakusanakirjaan sisällytetyistä kirjailijoista. Hakusanakirjassa
            toimivat ammattinimikkeet on listattu Valinnat-välilehdellä.
          </p>
          <p>
            <b>
              <i>Paikkakunnan</i>
            </b>{' '}
            mukaan tehdyn rajauksen avulla voit tutkia siitä, onko
            sanomalehtiuutisoinnin yhteydessä mainittu johonkin tiettyyn
            maantieteelliseen paikkaan liitetty teos tai kulttuurituotteen
            tekijä. Jos kyllä, tämä voi tuottaa uutta tietoja erityisesti
            paikallishistoriasta kiinnostuneille.
          </p>
          <div className="ui tiny header">
            Kulttuurituotteita-alasivun hakutoiminnot:
          </div>
          <p>
            Tällä sivulla voit tehdä hakuja teoksen nimen, lajityypin tai
            asiasanan perusteella, mutta myös kohdistaa haun siihen
            paikkakuntaan ja maahan, johon teos sijoittuu. Samoin voit tehdä
            hakuja teoksen tekijöiden nimen tai ammattinimikkeen perusteella,
            mutta myös tekijän tai teoksen yhteydessä mainitun paikkakunnan ja
            maan perusteella. Huomaa, että alkuperäisessä uutisessa ei aina ole
            mainittu paikkakuntaa tai maata, jolloin tieto puuttuu myös
            hakusanakirjasta.
          </p>
        </div>
        <div className="ui padded segment">
          <h3 className="ui header">3) ORGANISAATIOT-ALASIVU</h3>
          <p>
            Omalta välilehdeltään löytyvä lista{' '}
            <b>
              <i>organisaatioista</i>
            </b>{' '}
            on suunnattu erityisesti tutkijoille, jotka etsivät sukupuolen ja
            seksuaalisuuden moninaisuutta käsitteleviä ensikäden lähteitä
            arkistoista. Heille organisaation nimen tietäminen on tärkeää, koska
            se auttaa heitä löytämään sen arkiston, johon kyseisen organisaation
            asiakirjat on tallennettu. Tutkijoiden kannattaa kohdentaa omat
            hakunsa myös sanomalehtiin löytääkseen alkuperäisuutisista
            kaipaamiaan tarkempia lisätietoja
          </p>
          <div className="ui tiny header">
            Organisaatiot-alasivun hakutoiminnot:
          </div>
          <p>
            Tällä sivulla voit tehdä hakuja paitsi organisaation nimen
            perusteella, myös sen paikkakunnan ja maan perusteella, joka on
            mainittu toimijatahon yhteydessä. Huomaa, että alkuperäisessä
            uutisessa ei aina ole mainittu paikkakuntaa tai maata, jolloin tieto
            puuttuu myös hakusanakirjasta.
          </p>
        </div>
        <div className="ui padded segment">
          <h3 className="ui header">
            4) OMIEN HAKUJEN TEKEMINEN DIGITALISOIDUISTA SANOMALEHDISTÄ
          </h3>
          <p>
            Kansallisarkiston verkkoportaalin kautta voit tehdä hakusanakirjasta
            löytämiesi sanojen varassa omia hakujasi paitsi{' '}
            <i>Helsingin Sanomiin</i>, myös muihin digitoituihin lehtiin ja
            lukea näin itseäsi kiinnostavat uutiset kokonaisuudessaan. Paperisia
            sanomalehtiä voit puolestaan lukea joissakin kirjastoissa.
          </p>
          <p>
            Hyödyntämällä <i>Helsingin Sanomien</i> tilaajilleen tarjoaman{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.hs.fi/aikakone/"
              title="hs.fi/aikakone "
            >
              Aikakoneen
            </a>{' '}
            hakumahdollisuuksia pääset halutessasi tutustumaan myös vuoden 1939
            jälkeisen ajan uutisointiin ja kielenkäyttöön.
          </p>
        </div>
      </Container>
    </div>
  );
};

const RdIntroduction = styled(MainStructure)`
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
  .ui.medium.header {
    margin-top: 0.5rem;
  }
  .ui.tiny.header {
    margin-top: 0rem;
    margin-bottom: 0rem;
    color: black;
  }
  img {
  	border: 1px solid #555;
  }
`;

MainStructure.propTypes = {
  className: PropTypes.string,
};

export default RdIntroduction;
