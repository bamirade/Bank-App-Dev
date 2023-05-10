import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#050404',
    },
    secondary: {
      main: '#fbbe25',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          background: 'linear-gradient(135deg, #fbbe25 0%, #292929 100%)',
        },
      },
    },
  },
});

export default theme;
