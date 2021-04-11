import React from 'react';
import styled from 'styled-components';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useStateValue, logOut } from '../context';

const MenuKomponentti = ({ className, activeItem, history }) => {
  const [{ user }, dispatch] = useStateValue();

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
      onClick: () => dispatch(logOut()),
    },
  ];

  const adminOptions = [
    tutkijaOptions[0],
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
    tutkijaOptions[1],
  ];

  return (
    <div id="menu" className={className}>
      <Menu stackable size={user ? 'small' : 'large'} className="rdmenu">
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
        {user ? (
          <Menu.Item
            name="sanalomake"
            active={activeItem === 'sanalomake'}
            onClick={() => history.push('/sanalomake')}
          />
        ) : null}
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
        { user
          ? <Menu.Item
              name="Tulostusversio"
              active={activeItem === 'tulostus'}
              onClick={() => history.push('/tulostus')}
            />
          : null }

        <Menu.Menu position="right">
          {user ? (
            <Menu.Item active={activeItem === 'käyttäjä'}>
              {user.rooli === 'admin' ? (
                <Dropdown
                  icon="user"
                  floating
                  options={adminOptions}
                  trigger={<React.Fragment />}
                />
              ) : (
                <Dropdown
                  icon="user"
                  floating
                  options={tutkijaOptions}
                  trigger={<React.Fragment />}
                />
              )}
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
