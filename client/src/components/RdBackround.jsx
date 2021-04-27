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
          <RdMenu history={history} activeItem="taustaa" />
        </Responsive>
        <h1 id="infoHeader" className="ui header">
          TAUSTAA
        </h1>
        <div className="ui padded segment">
          <h2 id="tekijat" className="ui header">
            Tekijät
          </h2>
          <p>
            <i>Sateenkaarihistorian hakusanakirjan</i> ideoi keväällä 2019 Turun
            yliopiston Turku Institute for Advanced Studiesissa
            kollegiumtutkijana työskennellyt dosentti Tuula Juvonen.
          </p>
          <p>
            Hankkeen sisällöllistä kehittämistä tuki ohjausryhmä, johon
            kuuluivat:
          </p>
          <div className="ui list">
            <div className="item">
              Professori Jarmo Jantunen, Jyväskylän yliopisto
            </div>
            <div className="item">
              Yliopistonlehtori Unni-Päivä Leino, Tampereen yliopisto
            </div>
            <div className="item">
              Yliopistonlehtori Juhani Norri, Tampereen yliopisto
            </div>
            <div className="item">VTT Riikka Taavetti, Helsingin yliopisto</div>
          </div>
          <div className="ui divider" />
          <p>
            <i>Sateenkaarihistorian hakusanakirjan </i>teknisestä toteutuksesta
            vastasivat tietojenkäsittelyopin yliopistolehtori Timo Porasen
            ohjaamat opiskelijat Tampereen yliopistosta. Syksyllä 2019
            ohjelmiston rakentamisen aloittivat Ilmari Saaren johdolla Marjaana
            Laine ja Riku Mäenpää. Keväällä 2020 työtä jatkoivat muun muassa
            Arttu Ylikotilan johdolla Jarno Ihalainen, Roope Putila ja Christian
            Schmidlechner. Keväällä 2021 projektia jatkoivat Tuomas Henrikssonin johdolla 
            muun muassa Sauli Nevalainen.
          </p>
          <div className="ui divider" />
          <p>
            <i>Sateenkaarihistorian hakusanakirjan</i> aineistonkeruun
            toteuttivat dosentti Tuula Juvosen johdolla tutkimusavustajat Ida
            Korppineva ja Mandi Markkanen syksyllä 2020. Tampereen yliopiston
            yhteiskuntatieteellinen tiedekunta mahdollisti aineistonkeruun
            toteuttamisen taloudellisella tuellaan.
          </p>
          <p>
            Sateenkaarihistorian ystävät ry. otti{' '}
            <i>Sateenkaarihistorian hakusanakirjan</i> ystävällisesti osaksi
            verkkopalveluaan, jonka osaksi se liitettiin keväällä 2021.
          </p>
        </div>
        <div className="ui padded segment">
          <h2 className="ui header">Ohjelmiston tekniset tiedot</h2>
          <p>
            Sateenkaarihistorian hakusanakirja on toteutettu käyttäen
            React-sovelluskehystä.
          </p>
          <p>
            <a
              href="https://github.com/sateenkaarihistoria/sateenkaarisanakirja"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkki GitHubiin
            </a>
          </p>
        </div>
        <div className="ui padded segment">
          <h2 id="yhteydenotot" className="ui header">
            Yhteydenotot
          </h2>
          <p>
            <i>Sateenkaarihistorian hakusanakirjan</i> sisällöllisiä ratkaisuja
            koskeviin tiedusteluihin vastaa dosentti Tuula Juvonen:
            puheenjohtaja[AT]sateenkaarihistoria.fi.
          </p>
          <p>
            Sanakirjan käyttöä lingvistisessä tutkimuksessa koskeviin
            tiedusteluihin vastaa professori Jarmo Jantunen:
            jarmo.h.jantunen[AT]jyu.fi.
          </p>
        </div>
      </Container>
    </div>
  );
};

const RdBackround = styled(MainStructure)`
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
`;

export default RdBackround;
