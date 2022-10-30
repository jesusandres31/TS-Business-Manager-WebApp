import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';
// global state
import { useAuthSelector } from '../features/auth/authSlice';
// context
import LanguageProvider from '../context/LanguageContext';
import DarkModeProvider from '../context/ModeContext';
import SnackbarProvider from '../context/SnackbarContext';
// layout
import Layout from '../layout';
// children components
import GlobalSnackbar from '../common/GlobalSnackbar';
// pages
import { Login, NotFound } from '../pages';
import { Loading } from '../common';
// import lazy components
const Dashboard = lazy(() =>
  import('../pages/').then((module) => ({
    default: module.Dashboard,
  }))
);
const Profile = lazy(() =>
  import('../pages/').then((module) => ({
    default: module.Profile,
  }))
);

function App(): JSX.Element {
  const { loggedIn } = useAuthSelector((state) => state.auth);

  return (
    <LanguageProvider>
      <DarkModeProvider>
        <SnackbarProvider>
          <Layout>
            <Router>
              <Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path="/">
                    {<Redirect to="/login" />}
                  </Route>
                  <Route exact path={'/dashboard'}>
                    {loggedIn ? <Dashboard /> : <Redirect to="/login" />}
                  </Route>
                  <Route exact path={'/login'}>
                    {loggedIn ? <Redirect to="/dashboard" /> : <Login />}
                  </Route>
                  <Route exact path={'/profile'}>
                    {loggedIn ? <Profile /> : <Redirect to="/login" />}
                  </Route>
                  <Route component={NotFound} />
                </Switch>
              </Suspense>
            </Router>
            <GlobalSnackbar />
          </Layout>
        </SnackbarProvider>
      </DarkModeProvider>
    </LanguageProvider>
  );
}

export default App;
