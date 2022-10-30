import React from 'react';
// material ui
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
// themes
import darkTheme from '../themes/dark';
import lightTheme from '../themes/light';
// context
import { useDarkMode } from '../context/ModeContext';

export default function Layout(props: any): JSX.Element {
  const { darkMode } = useDarkMode();

  return (
    <ThemeProvider
      theme={darkMode ? createMuiTheme(darkTheme) : createMuiTheme(lightTheme)}
    >
      <Paper style={{ height: '100vh' /* max-content */ }}>
        <CssBaseline />
        <main>{props.children}</main>
      </Paper>
    </ThemeProvider>
  );
}
