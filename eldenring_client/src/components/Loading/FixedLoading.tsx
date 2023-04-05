import { keyframes } from '@mui/material/styles';
import {
  Stack,
  Box
} from '@mui/material';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export default function FixedLoading() {
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <Box
        sx={theme => ({
          display: 'block',
          borderRadius: '50%',
          animation: `${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
          width: 80,
          height: 80,
          borderWidth: '6px',
          borderStyle: 'solid',
          borderColor: `${theme.color.white} transparent transparent transparent`
        })}
      ></Box>
    </Stack>
  );
};