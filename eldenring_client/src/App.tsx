import ErrorBoundary from './components/ErrorBoundary';
import { Provider as ReduxProvider } from 'react-redux';
import store from 'redux/store';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './theme';
import SnackbarProvider from 'components/SnackbarProvider';
import RootRouter from './pages/RootRouter';

function App() {
  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <ThemeProvider theme={Theme}>
          <SnackbarProvider>
            <RootRouter />
          </SnackbarProvider>
        </ThemeProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
}

export default App;