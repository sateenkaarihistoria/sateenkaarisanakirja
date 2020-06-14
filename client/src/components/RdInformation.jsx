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
          <RdMenu history={history} activeItem="valinnat" />
        </Responsive>
        <h1 id="infoHeader" className="ui header">VALINNAT</h1>
        <div className="ui padded segment">
          <p>
            <i>Sateenkaarihistorian hakusanakirjan</i> laatiminen nojaa tällä sivulla esiteltyihin valintoihin.
          </p>
          <h3 className="ui header">AINEISTO</h3>
          <h4 className="ui header">Sanomalehden valinta</h4>
          <p>
            Sukupuolen ja seksuaalisuuden moninaisuutta käsittelevä aineisto on kerätty digitalisoiduista  
            <i> Helsingin Sanomat</i> -sanomalehdistä. Pääkaupunkiseudulle on muuttanut vuosikymmenien ajan paljon 
            ihmisiä ympäri maata – ja jotkut heistä ehkä myös siksi, että voisivat siellä elää vapaammin omanlaistaan 
            elämää. Pääkaupungissa ilmestyvään sanomalehteen 
            löytävät siksi todennäköisemmin ilmaisunsa myös totutusta poikkeavat ajatukset ja elämänmuodot.
          </p>
          <p>
            <i>Helsingin Sanomat</i> kuuluu niihin sanomalehtiin, joita Kansalliskirjasto on digitalisoinut 
            asiakkaittensa käyttöön. Hakusanakirjaan valittu aikarajaus 1904–1939 noudattaa Kansalliskirjaston 
            digiaineiston avoimuuden aikarajausta lehden osalta hakusanakirjan laatimishetkellä. 
          </p>
          <h4 className="ui header">Aineiston keruu ja rajaus</h4>
          <p>
            Verkossa julkaistuun hakusanakirjaan sisällytetty aineisto on kerätty tällä aikarajauksella kohdistamalla 
            digitalisoituun sanomalehteen sanahakuja lumipallomenetelmää käyttäen. Relevanttien artikkelien etsimisen 
            lähtökohdaksi on otettu yhtäältä erilaisia homoseksuaalisuus-sanan johdannaisia tai muita jo tunnettuja historiallisia 
            käsitteitä, ja toisaalta homoseksuaalisiksi tiedettyjä historiallisia henkilöitä, kuten ulkomaisia taiteilijoita. Näin 
            löydettyjä artikkeleja on luettu uusien synonyymisten ilmauksien löytämiseksi, 
            ja niitä taas on käytetty edelleen uusien havaintojen etsimiseen.
          </p>
          <p>
            Huomaa, että huolellakaan tehdyt haut eivät  ole tuloksiltaan aukottomia. Koneellisesti luettu fraktuura tuottaa 
            edelleen paljon lukuvirheitä, jolloin osa haetuista sanoista jää löytämättä. 
          </p>
          <p>
            Mukaan on otettuXX. Pois on jätettyXX. 
          </p>
        </div>
        <div className="ui padded segment"> 
          <h3 id="sanakirja" className="ui header">SANAKIRJA</h3>
          <p>
            Sanakirja-alasivulta löytyvät aakkosjärjestyksessä ne sanat ja ilmaisut, joita on 
            käytetty sukupuolen tai seksuaalisuuden moninaisuudesta kirjoitettaessa. 
          </p>
          <h4 className="ui content header">Sanat</h4>
          <p>
            Uusia sukupuolen ja seksuaalisuuden moninaisuuteen viittaavia sanoja ja ilmauksia on hyväksytty 
            mukaan silloin, kun tekstistä on tulkittavissa, että niillä ilmaistaan näitä ilmiöitä. 
          </p>
          <h4 className="ui content header">Sanaluokat</h4>
          <p>
            Löydetyt sanat on luokiteltu sanaluokkiin. 
          </p>
          <h4 className="ui content header">Sanaparit</h4>
          <p>
            XX
          </p>
          <h4 className="ui content header">Useampisanaiset ilmaisut</h4>
          <p>
            XX
          </p>
          <h4 className="ui content header">Selite</h4>
          <p>
            Hakusanoille on annettu selite. Sen merkitys noudattaa soveltuvin osin sanakirjaselityksiä, 
            tai se on päätelty asiayhteydestä. Selitteen laatimisessa on pyritty välttämään anakronismeja.
          </p>
          <h4 className="ui content header">Asiasana</h4>
          <p>
          Asiasana on otettu mukaan yksinkertaistamaan aiheenmukaisia hakuja. Se kertoo nykykäsittein 
          sen aihealueen, johon sanan käyttö läheisimmin viittaa. Käytettyjä asiasanoja ovat:
          </p>
          <div className="ui bulleted list">
              <div className="item">homoseksuaalisuus</div>
              <div className="item">homoseksuaalisuus, miehistä</div>
              <div className="item">homoseksuaalisuus, naisista</div>
              <div className="item">homous</div>
              <div className="item">lesbous</div>
              <div className="item">biseksuaalisuus</div>
              <div className="item">transsukupuolisuus</div>
              <div className="item">transmieheys</div>
              <div className="item">transnaiseus</div>
              <div className="item">muunsukupuolisuus</div>
              <div className="item">intersukupuolisuus</div>
              <div className="item">XX</div>
            </div>
          <h4 className="ui content header">Tyylilaji</h4>
          <p>
            Sanalle on annettu tyylilaji, joka on päätelty sanan käyttöyhteydestä. Tyylilajeja ovat:
          </p>
          <div className="ui bulleted list">
              <div className="item">XX</div>
              <div className="item">YY</div>
              <div className="item">ZZ</div>
            </div>
          <h4 className="ui content header">Käyttöala</h4>
          <p>
            Sanalle määritelty käyttöala viittaa siihen elämänpiiriin, johon sanan käyttöyhteys sanomalehdessä liittyy. 
            Käyttöaloja ovat:
          </p>
          <div className="ui bulleted list">
              <div className="item">XX</div>
              <div className="item">YY</div>
              <div className="item">ZZ</div>
            </div>
          <h4 className="ui content header">Asiayhteys</h4>
          <p>
            Sanan käyttökonteksti eli asiayhteys ilmenee yhtäältä siitä sanomalehden osiosta, 
            jossa esimerkkilause esiintyy. Näitä osioita ovat muun muassa:
          </p>
          <div className="ui bulleted list">
              <div className="item">XX</div>
              <div className="item">YY</div>
              <div className="item">ZZ</div>
          </div>
          <h4 className="ui content header">Esimerkkilause</h4>
          <p>
            Esimerkkilauseesta käy ilmi se, miten ilmaisua on tekstissä käytetty. 
          </p>
          <h4 className="ui content header">Lähteen merkintä</h4>
          <p>
            Esimerkkilauseen ilmeneminen on seurattavissa tiettyyn lehteen (HS, Helsingin Sanomat), ja 
            siinä ilmestyneen tekstikatkelman julkaisuvuoteen, kuukauteen ja -päivään, sekä lehden sivunumeroon (HSvvvvkkpp000). 
          </p>
          <h4 className="ui content header">Hakumahdollisuudet</h4>
          <p>
            Hakusanat-alasivulla esiintyvää materiaalia voi hakea paitsi aakkosittain ja hakusanoittain, myös asiasanoittain. 
          </p>
        </div>
        <div className="ui padded segment">
          <h3 id="kulttuurituote" className="ui header">KULTTUURITUOTTEET</h3>
          <p>
            Kulttuurituote-alasivulta löytyy aakkosjärjestyksessä ne nimeltä mainitut kulttuurituotteet, 
            joiden yhteydessä sukupuolen tai seksuaalisuuden moninaisuus on nostettu esiin. 
          </p>
          <div className="ui divider"/>
          <h4 className="ui content header">Teoksen nimi</h4>
          <p>
            Kulttuurituotteista on ilmoitettu teoksen suomenkielinen nimi. 
          </p>
          <h4 className="ui content header">Lajityyppi</h4>
          <p>
            Teoksen lajityyppi on ilmoitettu taidelajeittain. Näitä ovat:
          </p>
          <div className="ui bulleted list">
              <div className="item">XX</div>
              <div className="item">YY</div>
              <div className="item">ZZ</div>
          </div>
          <h4 className="ui content header">Asiasana</h4>
          <p>
            Asiasana kertoo sen aihealueen, jonka perusteella teos on sisällytetty tähän hakusanakirjaan. 
          </p>
          <h4 className="ui content header">Teokseen liitetty paikkakunta ja/tai maa</h4>
          <p>
            Jos teos sijoittuu tiettyyn nimeltä mainittuun paikkakuntaan ja/tai maahan, 
            joka lehdessä on mainittu, tämä on ilmoitettu. Puuttuva tieto ilmoitetaan kahdella pisteellä ·· .
          </p>
          <div className="ui divider"/>
          <h3 className="ui content header">Henkilöt</h3>
          <p>
            Teosta koskeviin tietoihin on liitetty uutisen perusteella niiden henkilöiden nimet, jotka ovat 
            vaikuttaneet sen syntyyn. Huomaa, että EU:n yleisen tietosuoja-asetuksen (General Data Protection 
            Regulation, GDPR) vuoksi sanakirjaan ei ole liitetty kulttuurituotteiden tekijöitä 
            sillä perusteella, että heidän henkilönsä olisi sanomalehdessä yhdistetty sukupuolen tai seksuaalisuuden moninaisuuteen. 
          </p>
          <h4 className="ui content header">Ammatti</h4>
          <p>
            Tekijästä on mainittu hänen ammattinsa mukainen suhde teokseen. Näitä ovat esimerkiksi kirjailija, ohjaaja tai näyttelijä.
          </p>
          <h4 className="ui content header">Tekijään liitetty paikkakunta ja/tai maa</h4>
          <p>
            Jos tekijän yhteydessä lehdessä on mainittu tietty nimeltä mainittu paikkakunta 
            ja/tai maa, tämä on ilmoitettu. Puuttuva tieto ilmoitetaan kahdella pisteellä ·· .
          </p>
          <h4 className="ui content header">Hakumahdollisuudet</h4>
          <p>
            Kulttuurituotteet-alasivulla esiintyvää materiaalia voi hakea paitsi teoksen tai teoslajin, 
            tekijän tai hänen ammattinsa mukaan, myös näihin liitetyn paikkakunnan varassa. Lisäksi hakuja 
            voi tehdä teokseen liitetyillä asiasanoilla. 
          </p>
        </div>
        <div className="ui padded segment">
          <h3 id="organisaatiot" className="ui header">ORGANISAATIOT</h3>
          <p>
            Organisaatiot-alasivulta löytyy aakkosjärjestyksessä nimettynä ne organisaatiot, 
            joiden yhteydessä sukupuolen tai seksuaalisuuden moninaisuus on nostettu esiin. 
          </p>
          <div className="ui divider"/>
          <h4 className="ui content header">Organisaatio</h4>
          <p>
            Organisaatiosta on ilmoitettu sen suomenkielinen nimi. 
          </p>
          <h4 className="ui content header">Tapahtuman luonne </h4>
          <p>
            Organisaation järjestämästä tapahtumasta on ilmoitettu sen luonne niin, kuin se ilmenee sanomalehdestä. 
            Puuttuva tieto ilmoitetaan kahdella pisteellä ·· .
          </p>
          <h4 className="ui content header">Tapahtuman nimi</h4>
          <p>
            Tapahtumasta on ilmoitettu sen nimi, jos se on mainittu lehdessä. Puuttuva tieto ilmoitetaan kahdella pisteellä ·· .
          </p>
          <h4 className="ui content header">Asiasana</h4>
          <p>
            Asiasana kertoo sen aihealueen, jonka perusteella organisaatio on sisällytetty tähän hakusanakirjaan. 
          </p>
          <h4 className="ui content header">Kotipaikka ja/tai maa</h4>
          <p>
            Jos organisaation yhteydessä lehdessä on mainittu sen kotipaikka ja/tai maa, tämä on ilmoitettu. 
            Puuttuva tieto ilmoitetaan kahdella pisteellä ·· . 
          </p>
          <h4 className="ui content header">Päiväys</h4>
          <p>
            Uutisen ilmestyminen on ilmaistu kertomalla julkaisuvuosi, kuukausi, ja -päivä (vvvvkkpp).
          </p>
          <h4 className="ui content header">Hakumahdollisuudet</h4>
          <p>
            Organisaatiot-alasivulla esiintyvää materiaalia voi hakea paitsi organisaation tai tapahtuman 
            nimellä, myös näihin liitetyn  paikkakunnan ja maan, sekä tapahtumaan liittyvän asiasanan perusteella.
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

  #infoHeader{
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
  .header{
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

MainStructure.propTypes = {
  className: PropTypes.string,
};

export default RdInformation;
