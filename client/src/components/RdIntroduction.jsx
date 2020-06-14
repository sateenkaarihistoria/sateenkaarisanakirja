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
          <RdMenu history={history} activeItem="johdanto" />
        </Responsive>
        <h1 id="infoHeader" className="ui header">JOHDANTO</h1>
        <div className="ui padded segment">
          <p>
            Ihmiset ovat kaikkina aikoina ilmaisseet sukupuoltaan monin tavoin, etsineet intiimiä läheisyyttä 
            toisistaan ja harrastaneet seksuaalisia tekoja keskenään. Mutta se, mitä merkityksiä näille teoille 
            on annettu, miten niihin on suhtauduttu, miten niistä on puhuttu ja mitä niistä on kirjoitettu, 
            riippuu ratkaisevasti kulloisestakin ajasta ja paikasta. Suomessa on tehty toistaiseksi vain vähän 
            historiallista tutkimusta siitä, miten meillä on käsitelty sellaista sukupuolen moninaisuutta, joka ylittää 
            yksiselitteisen nais–mies-jaon, tai sellaisia intiimejä suhteita, jotka poikkeavat heteroseksuaalisesta 
            oletuksesta. Seuraavassa puhutaan sukupuolen ja seksuaalisuuden moninaisuutena niistä historiallisista ilmiöistä, 
            joista puhuessamme käyttäisimme nykyisin esimerkiksi sellaisia sanoja kuin muunsukupuolisuus, transsukupuolisuus 
            tai intersukupuolisuus, tai sitten homous, lesbous tai biseksuaalisuus.
          </p>
          <div className="ui divider"/>
          <p>
            Tämän <i>Sateenkaarihistorian hakusanakirjan</i> tarkoituksena on auttaa niin tutkijoita kuin muitakin asiasta 
            kiinnostuneita lähestymään sukupuolen ja seksuaalisuuden moninaisuuden historiaa sanomalehtikirjoittelun 
            varassa. Hakusanakirjaan on kerätty <i>Helsingin Sanomissa</i> vuosina 1904–1939 julkaistuista teksteistä sellaisia 
            1) ilmaisuja, joilla on viitattu sukupuolen 
            ja seksuaalisuuden moninaisuuteen, 2) kulttuurituotteita, joissa näitä aiheita on käsitelty, sekä 3) organisaatioita, 
            jotka ovat olleet asian kanssa tavalla tai toisella tekemisissä.
          </p>
          <div className="ui divider"/>
          <p>
            Lainsäädännön muutokset ovat vaikuttaneet vahvasti nykyisten sukupuolen ja seksuaalisuuden moninaisuutta 
            kuvaavien käsitteiden syntyyn, käyttöön ja erityisesti niiden saamiin merkityksiin. Vuonna 1971 laillistettiin 
            niin naisten kuin miestenkin homoseksuaaliset teot. Näistä oli tullut rikollisia lakiuudistuksen astuttua voimaan
            vuonna 1894, ja teoista voitiin tuomita kaksi vuotta vankeutta. Vuonna 1981 homoseksuaalisuus poistettiin 
            sairausluokituksesta. Lisäksi lesbo- ja homoliike on 1970-luvulta lähtien hyödyntänyt tavoitteittensa ajamisessa 
            avoimuuteen kannustavaa identiteettipolitiikkaa, kuten sittemmin myös sukupuolten moninaisuuden yhdenvertaisuutta 
            ajamaan ryhtynyt transyhteisökin. Tämä poliittinen liikehdintä on ratkaisevasti muuttanut ymmärrystämme 
            seksuaalisuuden ja sukupuolen moninaisuudesta, ja siten myös sanomalehtien kirjoittelua aiheesta. Esimerkiksi 
            muunsukupuolisuudesta, transsukupuolisuudesta ja intersukupuolisuudesta käytävässä keskustelussa viitataan 
            nykyisin usein ihmisoikeuksiin, mikä ei aiemmin olisi monille tullut mieleenkään.
          </p>
          <p>
            Seksuaalisuuden moninaisuudesta 1900-luvun ensimmäisellä puoliskolla käytyä sanomalehtikirjoittelua sen sijaan 
            väritti vielä vahvasti ”samaa sukupuolta olevan henkilön kanssa harjoitetun haureuden” rikollinen ja siksi tuomittavaksi 
            leimattu luonne. Rikosuutisointi oli siksi tavallisimmin se tapa, jolla homoseksuaalisia teemoja käsiteltiin julkisesti. 
            Tuohon aikaan aihepiiriä koskeva sanastokin etsi vielä muotoaan, ja hankalaksi koetusta ilmiöstä puhuttiin kernaasti erilaisia 
            kiertoilmauksia käyttäen. Näitä kiertoilmaisuja on siksi otettu mukaan myös sanakirjaan. Sukupuolen moninaisuudesta taas 
            tavallisimmin vaiettiin lehdistössä. 
            Jos asia nostettiin esille, sitä koskeva käsitteistö oli sangen horjuvaa ja nykypäivästä käsin arvioituna vähintäänkin monimerkityksellistä.
          </p>
          <p>
            Ankarasta lainsäädännöstä huolimatta niin naisten kuin miestenkin rikostuomiot homoseksuaalisista teoista olivat ennen 1950-lukua 
            kaiken kaikkiaan hyvin harvinaisia. Näin ollen sanomalehtien uutisointi antaa meille vain kalpean kuvan siitä, millaista seksuaalisuuden 
            moninaisuuden kanssa eläneiden ihmisten arkielämä on ollut. Rajoittunut uutisointi koskee myös sukupuolen moninaisuutta. Muiden lähteiden 
            nojalla tiedämme kuitenkin, että puhekielessä on käytetty monenlaisia ronskejakin ilmaisuja, joilla vallitsevasta sukupuolen ja seksuaalisuuden
            normistosta poikkeaminen on kuitattu yhteisön sisällä siihen sen 
            kummemmin muuten puuttumatta. Sanomalehtien välityksellä saamme kuitenkin tietoa siitä, miten julkisuudessa on pyritty määrittelemään ja kontrolloimaan poikkeavuuksia. 
          </p>
          <div className="ui divider"/>
          <p>
            Lisätietoja sukupuolen ja seksuaalisuuden moninaisuuden historiaa koskevasta kotimaisesta tutkimuksesta 
            löydät esimerkiksi Sateenkaarihistorian ystävien kotisivuilta <a href="https://sateenkaarihistoria.fi" target="_blank" rel="noopener noreferrer" >sateenkaarihistoria.fi</a>
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
  .ui.medium.header {
    margin-top: 0.5rem;
  }
  .ui.tiny.header {
    margin-top: 0rem;
    margin-bottom: 0rem;
    color: black;
  }
`;

MainStructure.propTypes = {
  className: PropTypes.string,
};

export default RdIntroduction;
