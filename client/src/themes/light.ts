import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3d5afe',
    },
    secondary: {
      main: '#f50057',
    },
    /*  info: {
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
      primary: '#1c2042',
      secondary: '#696969',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: ['Rubik', 'sans-serif'].join(','),
    /* fontFamily: 'Roboto', */
    fontSize: 14,
  },
});

export default theme;
