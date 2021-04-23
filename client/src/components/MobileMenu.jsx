import React from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { useStateValue } from '../context';

const MobileMenu = ({ history, activeItem }) => {
  const [{ user }] = useStateValue();

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
    <Menu style={{ backgroundColor: '#ecf0f1' }}>
      <Menu.Item>
        <Dropdown
          icon="sidebar"
          floating
          options={menuSisalto}
          trigger={<></>}
        />
      </Menu.Item>
      {user ? (
        <Menu.Item
          name="sanalomake"
          active={activeItem === 'sanalomake'}
          onClick={() => history.push('/sanalomake')}
        />
      ) : null}
      <Menu.Menu position="right">
        {user ? (
          <Menu.Item>
            {user.rooli === 'admin' ? (
              <Dropdown
                icon="user"
                floating
                options={adminOptions}
                trigger={<></>}
              />
            ) : (
              <Dropdown
                icon="user"
                floating
                options={tutkijaOptions}
                trigger={<></>}
              />
            )}
          </Menu.Item>
        ) : (
          <Menu.Item onClick={() => history.push('/kirjautuminen')}>
            <Icon name="sign in" />
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default MobileMenu;
