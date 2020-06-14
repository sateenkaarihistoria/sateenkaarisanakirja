const baseFonts = [
  'Open Sans',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'sans-serif',
];

export default {
  palette: {
    primary: {
      lighter: '#ecf0f1',
      light: '#bdc3c7',
      main: '#ffffffe6',
      dark: '#8e44ad',
      darker: '#2c3e50',
    },
    secondary: {
      lighter: '#7E6ACC',
      light: '#5E45B9',
      main: '#4428AE',
      dark: '#2D1392',
      darker: '#220C73',
    },
    tertiary: {
      lighter: '#57C0B8',
      light: '#31A89F',
      main: '#139B92',
      dark: '#018279',
      darker: '#00675F',
    },
  },
  typography: {
    base: {
      fontFamily: baseFonts.join(','),
    },
    title: {
      fontFamily: ['Vollkorn', ...baseFonts].join(','),
    },
  },
};
