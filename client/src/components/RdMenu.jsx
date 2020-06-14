import React, { useContext } from 'react';
import styled from 'styled-components';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import UserContext from '../context/userContext';

const MenuKomponentti = ({ className, activeItem, history }) => {
  const sessioData = useContext(UserContext);

  const tutkijaOptions = [
    {
      key: 'omatTiedot',
      icon: 'edit',
      text: 'Omat tiedot',
      value: 'omatTiedot',
      onClick: () => history.push('/omat-tiedot'),
    }, 
    {
      key: 'logout',
      icon: 'sign out',
      text: 'Kirjaudu ulos',
      value: 'logout',
      href: '/',
    },
  ];

  const adminOptions = [
    {
      key: 'omatTiedot',
      icon: 'edit',
      text: 'Omat tiedot',
      value: 'omatTiedot',
      onClick: () => history.push('/omat-tiedot'),
    },    
    {
      key: 'kayttajat',
      icon: 'users',
      text: 'Kaikki Käyttäjät',
      value: 'kayttajat',
      onClick: () => history.push('/kayttajat'),
    },
    {
      key: 'kayttaja',
      icon: 'user plus',
      text: 'Uusi käyttäjä',
      value: 'kayttaja',
      onClick: () => history.push('/kayttajalomake'),
    },
    {
      key: 'logout',
      icon: 'sign out',
      text: 'Kirjaudu ulos',
      value: 'logout',
      href: '/',
    },
  ];

  return (
    <div id="menu" className={className}>
      <Menu stackable size={ sessioData.token? "small": "large" } className="rdmenu">
        <Menu.Item
          name="sanakirja"
          active={activeItem === 'sanakirja'}
          onClick={() => history.push('/sanakirja')}
        />
        <Menu.Item
          name="kulttuurituotteet"
          active={activeItem === 'kulttuurituotteet'}
          onClick={() => history.push('/kulttuurituotteet')}
        />
        <Menu.Item
          name="organisaatiot"
          active={activeItem === 'organisaatiot'}
          onClick={() => history.push('/organisaatiot')}
        />
        { sessioData.rooli
          ? <Menu.Item
              name="sanalomake"
              active={activeItem === 'sanalomake'}
              onClick={() => history.push('/sanalomake')}
            />
          : null }
        <Menu.Item
          name="Johdanto"
          active={activeItem === 'johdanto'}
          onClick={() => history.push('/johdanto')}
        />
        <Menu.Item
          name="Käyttöohje"
          content="Käyttöohje"
          active={activeItem === 'Käyttöohje'}
          onClick={() => history.push('/kayttoohjeet')}
        />
        <Menu.Item
          name="Valinnat"
          active={activeItem === 'valinnat'}
          onClick={() => history.push('/valinnat')}
        />
        <Menu.Item
          name="Taustaa"
          active={activeItem === 'taustaa'}
          onClick={() => history.push('/taustaa')}
        />

        <Menu.Menu position="right">
          { sessioData.rooli ? (
            <Menu.Item active={activeItem === 'käyttäjä'}>
              { sessioData.rooli === 'admin'
                ? <Dropdown
                    icon="user"
                    floating
                    options = { adminOptions }
                    trigger={<React.Fragment />}
                  />
                : <Dropdown
                    icon="user"
                    floating
                    options = { tutkijaOptions }
                    trigger={<React.Fragment />}
                  /> }
            </Menu.Item>
          ) : (
            <Menu.Item
              active={activeItem === 'kirjautuminen'}
              onClick={() => history.push('/kirjautuminen')}
            >
              <Icon name="sign in" />
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </div>
  );
};

const RdMenu = styled(MenuKomponentti)`
  margin-top: 1rem;

  .rdmenu {
    background: red;
    background-color: ${({ theme }) => theme.palette.primary.lighter};
  }

  .ui.menu .item {
    color: ${({ theme }) => theme.palette.primary.darker};
  }
`;

MenuKomponentti.propTypes = {
  activeItem: PropTypes.string,
  history: PropTypes.object,
  className: PropTypes.string,
};

export default RdMenu;
