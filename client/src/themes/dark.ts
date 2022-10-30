import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3d5afe',
    },
    secondary: {
      main: '#f50057',
    },
    /* info: {
      main: '#9c27b0',
    },
    warning: {
      main: '#ff3d00',
    },
    error: {
      main: '#f44336',
    },
    success: {
      main: '#4caf50',
    }, */
    text: {
      primary: '#f5f5f5',
      //secondary: '#e3e3e3',
    },
    background: {
      default: '#181a1b',
      paper: '#181a1b',
    },
  },
  typography: {
    fontFamily: ['Rubik', 'sans-serif'].join(','),
    /* fontFamily: 'Roboto', */
    fontSize: 14,
  },
});

export default theme;
