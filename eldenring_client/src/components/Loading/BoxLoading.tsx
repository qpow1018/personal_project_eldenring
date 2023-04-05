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

BoxLoading.defaultProps = {
  height: 600
}

export default function BoxLoading(
  props: {
    height: string | number
  }
) {
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        width: '100%',
        height: props.height
      }}
    >
      <Box
        sx={theme => ({
          display: 'block',
          borderRadius: '50%',
          animation: `${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
          width: 60,
          height: 60,
          borderWidth: '6px',
          borderStyle: 'solid',
          borderColor: `${theme.color.white} transparent transparent transparent`
        })}
      ></Box>
    </Stack>
  );
};