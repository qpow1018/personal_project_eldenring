import {
  Stack,
  Typography
} from '@mui/material';

EmptyBox.defaultProps = {
  msg: '목록이 없습니다.'
}

export default function EmptyBox(
  props: {
    msg: string,
    sx?: any
  }
) {
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      sx={(theme) => ({
        textAlign: 'center',
        minHeight: 480,
        width: '100%',
        height: '100%',
        fontSize: '0.875rem',
        color: theme.color.text.light,
        ...props.sx
      })}
    >
      <Typography variant='inner'>
        { props.msg }
      </Typography>
    </Stack>
  );
};