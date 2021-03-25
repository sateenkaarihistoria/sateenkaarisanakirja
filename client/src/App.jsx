import React, { useEffect } from 'react';
import 'fomantic-ui-css/semantic.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WebFont from 'webfontloader';
import { ThemeProvider } from 'styled-components';

import { useStateValue, setUser } from './context';

import Sanakirja from './components/sanakirjaView/Sanakirja';
import Organisaatiot from './components/organisaatioView/Organisaatiot';
import Kulttuurituotteet from './components/kulttuurituoteView/Kulttuurituotteet';
import RdIntroduction from './components/RdIntroduction';
import RdLogin from './components/RdLogin';
import SyottoLomake from './components/syottolomakeView/SyottoLomake';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import * as routes from './constants/routes';
import RdBackround from './components/RdBackround';
import RdInformation from './components/RdInformation';
import RdInstruction from './components/RdInstruction';
import Kayttajat from './components/kayttajaView/Kayttajat';
import KayttajaLomake from './components/kayttajaView/KayttajaLomake';
import OmatTiedot from './components/kayttajaView/OmatTiedot';
import SuojattuReitti from './components/SuojattuReitti';

WebFont.load({
  google: {
    families: ['Vollkorn:700', 'Open Sans:300,400,600,800'],
  },
});

const App = function AppContent() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('loginData'));
    if (data) {
      console.log(data);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route exact path={routes.ROOT} component={Sanakirja} />
            <Route path={routes.DICTIONARY} component={Sanakirja} />
            <Route
              path={routes.CULTUREPRODUCTS}
              component={Kulttuurituotteet}
            />
            <Route path={routes.ORGANIZATIONS} component={Organisaatiot} />
            <Route path={routes.LOGIN} component={RdLogin} />
            <SuojattuReitti path={routes.WORDFORM} comp={SyottoLomake} />
            <Route path={routes.BACKROUND} component={RdBackround} />
            <Route path={routes.INFORMATION} component={RdInformation} />
            <Route path={routes.INSTRUCTION} component={RdInstruction} />
            <SuojattuReitti path={routes.USERS} comp={Kayttajat} />
            <SuojattuReitti path={routes.NEWUSER} comp={KayttajaLomake} />
            <Route
              exact
              path={routes.INTRODUCTION}
              component={RdIntroduction}
            />
            <Route exact path={routes.OWNDATA} component={OmatTiedot} />
          </Switch>
        </Router>
      </>
    </ThemeProvider>
  );
};

export default App;
