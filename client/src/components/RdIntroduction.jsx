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
          <RdMenu history={history} activeItem="johdanto" />
        </Responsive>
        <h1 id="infoHeader" className="ui header">
          JOHDANTO
        </h1>
        <div className="ui padded segment">
          <p>
            Ihmiset ovat kaikkina aikoina ilmaisseet sukupuoltaan monin tavoin,
            etsineet intiimiä läheisyyttä toisistaan ja harrastaneet
            seksuaalisia tekoja keskenään. Mutta se, mitä merkityksiä näille
            teoille on annettu, miten niihin on suhtauduttu, miten niistä on
            puhuttu ja mitä niistä on kirjoitettu, riippuu ratkaisevasti
            kulloisestakin ajasta ja paikasta. Suomessa on tehty toistaiseksi
            vain vähän historiallista tutkimusta siitä, miten meillä on
            käsitelty sellaista sukupuolen moninaisuutta, joka ylittää
            yksiselitteisen nais–mies-jaon, tai sellaisia intiimejä suhteita,
            jotka poikkeavat heteroseksuaalisesta oletuksesta. Käsillä olevassa
            <i>Sateenkaarihistorian hakusanakirjassa</i> tuodaan esiin
            sukupuolen ja seksuaalisuuden moninaisuutta, eli sellaisia
            historiallisia ilmiöitä, joista puhuessamme käyttäisimme nykyisin
            esimerkiksi sanoja muunsukupuolisuus, transsukupuolisuus tai
            intersukupuolisuus, tai sitten homous, lesbous, bi- tai
            panseksuaalisuus.
          </p>
          <div className="ui divider" />
          <p>
            <i>Sateenkaarihistorian hakusanakirjan</i> tarkoituksena on auttaa
            niin tutkijoita kuin muitakin asiasta kiinnostuneita lähestymään
            sukupuolen ja seksuaalisuuden moninaisuuden historiaa
            sanomalehtikirjoittelun varassa. Hakusanakirjaan on kerätty
            <i>Helsingin Sanomissa</i> vuosina 1904–1939 julkaistuista
            teksteistä löytyneitä 1) sanoja ja ilmaisuja, joilla on viitattu
            sukupuolen ja seksuaalisuuden moninaisuuteen, 2) kulttuurituotteita,
            joissa näitä aiheita on käsitelty, sekä 3) organisaatioita, jotka
            ovat olleet asian kanssa tavalla tai toisella tekemisissä.
          </p>
          <div className="ui divider" />
          <p>
            Sanakirjan hakusanoja ja niiden taustalla olevia uutisia
            tarkasteltaessa on hyvä muistaa, että lainsäädännön muutokset ovat
            vaikuttaneet vahvasti nykyisten sukupuolen ja seksuaalisuuden
            moninaisuutta kuvaavien käsitteiden syntyyn, käyttöön ja erityisesti
            niiden saamiin merkityksiin. Vuonna 1894 Suomessa tuli voimaan
            lakimuutos, jonka myötä niin naisten kuin miestenkin
            homoseksuaaliset teot määriteltiin rikoksiksi, ja tekoihin
            syyllistyneet voitiin tuomita kahdeksi vuodeksi vankeuteen. Tämä
            laki kumottiin vuonna 1971, jolloin aikuisten väliset
            homoseksuaaliset teot lakkasivat olemasta rikoksia. Vuonna 1981
            homoseksuaalisuus poistettiin sairausluokituksesta. Lisäksi lesbo-
            ja homoliike on 1970-luvulta lähtien hyödyntänyt tavoitteittensa
            ajamisessa avoimuuteen kannustavaa identiteettipolitiikkaa, kuten
            sittemmin myös sukupuolten moninaisuuden yhdenvertaisuutta ajamaan
            ryhtynyt transyhteisökin. Tämä poliittinen liikehdintä on
            ratkaisevasti muuttanut ymmärrystämme seksuaalisuuden ja sukupuolen
            moninaisuudesta ja siten myös sanomalehtien kirjoittelua aiheesta.
            Esimerkiksi muunsukupuolisuudesta, transsukupuolisuudesta ja
            intersukupuolisuudesta käytävässä keskustelussa viitataan nykyisin
            usein ihmisoikeuksiin, mikä ei aiemmin olisi monille tullut
            mieleenkään.
          </p>
          <p>
            Seksuaalisuuden moninaisuudesta 1900-luvun ensimmäisellä puoliskolla
            käyty sanomalehtikirjoittelu puolestaan käsitteli usein rikoksia,
            joten sitä väritti vahvasti ”samaa sukupuolta olevan henkilön kanssa
            harjoitetun haureuden” paheksunta. Myös ajatus homoseksuaalisuudesta
            luonnottomana poikkeavuutena oli tuolloin yleinen. Mutta
            kulttuurituotteita koskevasta uutisoinnista löytyy myös yrityksiä
            ymmärtää heteroseksuaalisuudesta poikkeavia haluja. Sukupuolen
            moninaisuutta koskeva uutisointi puolestaan käsitteli lähinnä niissä
            tilanteissa syntynyttä hämmennystä, joissa henkilön sukupuoli ei
            vastannutkaan sille asetettuja odotuksia.
          </p>
          <p>
            Sanakirjan selaaminen tuo hyvin esiin sen, kuinka 1900-luvun
            alkuvuosikymmeninä seksuaalisuuden moninaisuutta koskeva sanasto
            etsi muotoaan ja myös vakiintunutta kirjoitustapaa. Hankalaksi
            koetusta ilmiöstä puhuttiin kernaasti erilaisia kiertoilmauksia
            käyttäen, ja siksi niitäkin on otettu mukaan sanakirjaan. Samoin
            sukupuolen moninaisuutta koskeva käsitteistö oli sangen horjuvaa ja
            nykypäivästä käsin arvioituna vähintäänkin monimerkityksellistä.
          </p>
          <p>
            Sanomalehtien välityksellä saamme tietoa lähinnä siitä, miten
            julkisuudessa on pyritty määrittelemään ja kontrolloimaan
            poikkeavuuksia. Siksi se antaa meille vain kapean käsityksen siitä,
            millaista sukupuolen tai seksuaalisuuden moninaisuuden kanssa
            eläneiden ihmisten arkielämä on ollut. Toivottavasti
            Sateenkaarihistorian hakusanakirja auttaa käyttäjiään löytämään myös
            muita aineistoja, joiden varassa ymmärryksemme sukupuolen ja
            seksuaalisuuden moninaisuuden historiasta voi avartua edelleen.
          </p>
          <p>
            Sateenkaarihistorian hakusanakirjassa esiintyvien hakusanojen
            varassa itse kukin voi tehdä omia hakujaan Kansalliskirjaston
            digitoiduista sanomalehtikokoelmista:{' '}
            <a
              href="https://digi.kansalliskirjasto.fi/collections?id=82"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://digi.kansalliskirjasto.fi/collections?id=82
            </a>
          </p>
          <div className="ui divider" />
          <p>
            Lisätietoja sukupuolen ja seksuaalisuuden moninaisuuden historiaa
            koskevasta kotimaisesta tutkimuksesta löydät esimerkiksi
            Sateenkaarihistorian ystävien kotisivuilta{' '}
            <a
              href="https://sateenkaarihistoria.fi"
              target="_blank"
              rel="noopener noreferrer"
            >
              sateenkaarihistoria.fi
            </a>
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
`;

export default RdIntroduction;
