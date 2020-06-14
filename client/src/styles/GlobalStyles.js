import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    height: auto;
    font-size: 1rem;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.typography.base.fontFamily};
    width: 100%;
    min-height: 100%;
  }

  h1, h2 {
    font-family: ${({ theme }) => theme.typography.title.fontFamily};
  }

  @media screen and (max-width: 991px) {
    html {
      font-size: 0.93rem;
    }
  }

  @media screen and (max-width: 745px) {
    html {
      font-size: 0.85rem;
    }
  }

  @media screen and (max-width: 537px) {
    html {
      font-size: 0.75rem;
    }
  }

  @media screen and (max-width: 467px) {
    html {
      font-size: 0.65rem;
    }
  }

  @media screen and (max-width: 407px) {
    html {
      font-size: 0.55rem;
    }
  }

  @media screen and (max-width: 347px) {
    html {
      font-size: 0.5rem;
    }
  }
`;

export default GlobalStyles;
