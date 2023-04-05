import { Stack } from '@mui/material';

export default function IconBase(
  props: {
    onClick?: () => void,
    children?: React.ReactNode
  }
) {
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        borderRadius: '50%',
        width: 36,
        height: 36,
      }}
    >
      { props.children }
    </Stack>
  );
};