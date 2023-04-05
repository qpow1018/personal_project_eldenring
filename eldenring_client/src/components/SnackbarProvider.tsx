import { useState, forwardRef, createContext } from 'react';
import {
  Snackbar,
  Stack,
  Typography
} from '@mui/material';

import {
  CheckCircleOutlineOutlined as SuccessIcon,
  ErrorOutlineOutlined as ErrorIcon
} from '@mui/icons-material'

export type ElSnackBar = {
  success: (message: string) => void,
  error: (message: string) => void
}

type ElSnackbarState = {
  type: SnackbarType | null,
  message: string | null
}

enum SnackbarType {
  success = 'success',
  error = 'error'
}

const INIT_STATE: ElSnackbarState = {
  type: null,
  message: null
}

export const SnackbarContext = createContext<any>(null);

const Alert = forwardRef((props: {
  onClick: () => void,
  state: ElSnackbarState
}, ref) => {
  return (
    <Stack
      ref={ref}
      onClick={props.onClick}
      direction={'row'}
      alignItems={'center'}
      sx={[
        (theme => ({
          boxShadow: theme.style.shadow,
          borderRadius: theme.style.borderRadius,
          width: '100%',
          maxWidth: 480,
          minHeight: 46,
          color: '#fff',
          padding: '0 16px',
          fontSize: 14,
          fontWeight: 500
        })),
        props.state.type === SnackbarType.success && {
          backgroundColor: theme => theme.color.suc
        },
        props.state.type === SnackbarType.error && {
          backgroundColor: theme => theme.color.err
        }
      ]}
    >
      { props.state.type === SnackbarType.success
        ? <SuccessIcon />
        : <ErrorIcon />
      }

      <Typography
        variant='inner'
        sx={{ marginLeft: '12px' }}
      >
        { props.state.message }
      </Typography>
    </Stack>
  )
});

export default function SnackbarProvider(
  props: {
    children: React.ReactNode
  }
) {
  const [state, setState] = useState<ElSnackbarState>(INIT_STATE);

  const snackbarContext = {
    success: (message: string) => {
      setState({
        type: SnackbarType.success,
        message
      });
    },
    error: (message: string) => {
      setState({
        type: SnackbarType.error,
        message
      });
    }
  };

  return (
    <SnackbarContext.Provider value={snackbarContext}>
      {props.children}

      <Snackbar
        open={Boolean(state.message)}
        autoHideDuration={4000}
        onClose={() => setState(INIT_STATE)}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top'
        }}
      >
        <Alert
          onClick={() => setState(INIT_STATE)}
          state={state}
        />
      </Snackbar>
    </SnackbarContext.Provider>
  );
};