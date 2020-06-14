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
          <RdMenu history={history} activeItem="taustaa" />
        </Responsive>
        <h1 id="infoHeader" className="ui header">TAUSTAA</h1>
        <div className="ui padded segment">
          <h2 id="tekijat"className="ui header">Tekijät</h2>
          <p>
            <i>Sateenkaarihistorian hakusanakirjan</i> ideoi keväällä 2019 Turku Institute for Advanced Studiesissa kollegiumtutkijana työskennellyt dosentti Tuula Juvonen. 
          </p>
            <p>Hän sai tukea hankkeen sisällölliseen kehittämiseen ohjausryhmältä, johon kuuluivat:</p> 
            <div className="ui list">
              <div className="item">Professori Jarmo Jantunen, Jyväskylän yliopisto</div>
              <div className="item">Yliopistonlehtori Unni-Päivä Leino, Tampereen yliopisto</div>
              <div className="item">Yliopistonlehtori Juhani Norri, Tampereen yliopisto</div>
              <div className="item">VTT Riikka Taavetti, Helsingin yliopisto</div>
            </div>
          <div className="ui divider"/>
          <p>
            <i>Sateenkaarihistorian hakusanakirjan </i>teknisestä toteutuksesta vastasivat tietojenkäsittelyopin 
            yliopistolehtori Timo Porasen ohjaamat opiskelijat Tampereen yliopistosta. Syksyllä 2019 ohjelmiston 
            rakentamisen aloittivat Ilmari Saaren johdolla Marjaana Laine ja Riku Mäenpää. Keväällä 2020 työtä 
            jatkoivat muun muassa Arttu Ylikotilan johdolla Jarno Ihalainen, Roope Putila ja Christian Schmidlechner. 
          </p>
          <div className="ui divider"/>
          <p>
            <i>Sateenkaarihistorian hakusanakirjaa</i> varten tehtävän aineistonkeruun toteuttivat dosentti Tuula Juvonen yhteistyössä 
            XX ja XX kanssa kesällä ja syksyllä 2020. Keruun toteuttaminen sai taloudellista tukea XXltä. 
          </p>
          <p>
            <i>Sateenkaarihistorian hakusanakirjan</i> loppusijoituksesta Kielipankin Sanat-sivustolle vastasi palvelun pääylläpitäjä Martin Matthiesen. 
          </p>
          <p>
            <i>Sateenkaarihistorian hakusanakirja</i> julkaistiin osoitteessa XX XXkuussa 2021. 
          </p>
        </div>
        <div className="ui padded segment">
          <h2 className="ui header">Ohjelmiston tekniset tiedot</h2>
          <p>
            Sateenkaarihistorian hakusanakirja on toteutettu käyttäen React-sovelluskehystä.
          </p>
          <p>
            <a href="https://github.com/sateenkaarihistoria/sateenkaarisanakirja" target="_blank" rel="noopener noreferrer">Linkki GitHubiin</a>
          </p>
        </div>
        <div className="ui padded segment">
          <h2 id="yhteydenotot" className="ui header">Yhteydenotot</h2>
          <p>
            <i>Sateenkaarihistorian hakusanakirjan</i> sisällöllisiä ratkaisuja koskeviin tiedusteluihin ja sen käyttöä historiantutkimuksessa 
            koskeviin kysymyksiin vastaa dosentti Tuula Juvonen: puheenjohtaja[AT]sateenkaarihistoria.fi.
          </p>
          <p>
            Sanakirjan käyttöä lingvistisessä tutkimuksessa koskeviin tiedusteluihin vastaa professori Jarmo Jantunen: jarmo.h.jantunen[AT]jyu.fi
          </p>
          <p>
            Palvelun käyttöä koskeviin teknisiin tiedusteluihin vastaa palvelun pääylläpitäjä XX: XX
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
`;

MainStructure.propTypes = {
  className: PropTypes.string,
};

export default RdBackround;
