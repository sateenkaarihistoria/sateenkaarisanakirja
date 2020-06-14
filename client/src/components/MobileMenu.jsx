import React, { useContext } from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import UserContext from '../context/userContext';

const MobileMenu = ({ history, activeItem }) => {
  const sessioData = useContext(UserContext);
  
  const menuSisalto = [
    {
      key: 'sanak',
      text: 'Sanakirja',
      value: 'sanakirja',
      onClick: () => history.push('/sanakirja'),
    },
    {
      key: 'kult',
      text: 'Kulttuurituotteet',
      value: 'kulttuurituotteet',
      onClick: () => history.push('/kulttuurituotteet'),
    },
    {
      key: 'org',
      text: 'Organisaatiot',
      value: 'organisaatiot',
      onClick: () => history.push('/organisaatiot'),
    },
    {
      key: 'johd',
      text: 'Johdanto',
      value: 'johdanto',
      onClick: () => history.push('/johdanto'),
    },
    {
      key: 'käyt',
      text: 'Käyttöohje',
      value: 'käyttöohje',
      onClick: () => history.push('/kayttoohjeet'),
    },
    {
      key: 'val',
      text: 'Valinnat',
      value: 'valinnat',
      onClick: () => history.push('/valinnat'),
    },
    {
      key: 'taus',
      text: 'Taustaa',
      value: 'taustaa',
      onClick: () => history.push('/taustaa'),
    },
  ];

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
    <Menu style={{backgroundColor: '#ecf0f1' }}>
      <Menu.Item>
        <Dropdown
          icon="sidebar"
          floating
          options={ menuSisalto }
          trigger={<React.Fragment />}
        />
      </Menu.Item>
      { sessioData.rooli
          ? <Menu.Item
              name="sanalomake"
              active={activeItem === 'sanalomake'}
              onClick={() => history.push('/sanalomake')}
            />
          : null }
      <Menu.Menu position="right">
          { sessioData.rooli ? (
            <Menu.Item>
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
              onClick={() => history.push('/kirjautuminen')}
            >
              <Icon name="sign in" />
            </Menu.Item>
          )}
        </Menu.Menu>
    </Menu>
  );
}

export default MobileMenu;