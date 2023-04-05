import {
  Stack,
  Box,
  Typography
} from '@mui/material';

export default function ContentContainer(
  props: {
    title: string,
    rightView?: React.ReactNode,
    children?: React.ReactNode
  }
) {
  return (
    <Stack sx={{ flex: 1, height: '100%' }}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        sx={theme => ({
          position: 'sticky',
          top: 0,
          zIndex: 10,
          borderBottom: `1px solid ${theme.color.border}`,
          backgroundColor: theme.color.background,
          height: 60,
          padding: '0 12px 0 16px'
        })}
      >
        <Typography
          fontSize={16}
          fontWeight={500}
          sx={{ flex: 1 }}
        >
          { props.title }
        </Typography>

        <Stack
          direction={'row'}
          alignItems={'center'}
          sx={{ flexShrink: 0 }}
        >
          { props.rightView }
        </Stack>
      </Stack>

      <Box sx={{
        flex: 1,
        height: '100%'
      }}>
        { props.children }
      </Box>
    </Stack>
  );
};