import {
  Stack,
  Box,
  Typography
} from '@mui/material';

export default function FormRow(
  props: {
    label?: string,
    required?: boolean,
    children?: React.ReactNode,
    sx?: any
  }
) {
  return (
    <Box
      sx={{
        marginBottom: '24px',
        ...props.sx
      }}
    >
      { props.label !== undefined &&
        <Stack
          direction={'row'}
          sx={{ marginBottom: '12px' }}
        >
          <Typography
            fontSize={14}
            fontWeight={500}
          >
            { props.label }
          </Typography>

          { props.required === true &&
            <Typography
              fontSize={14}
              color={theme => theme.color.pri.main}
              sx={{ marginLeft: '4px' }}
            >
              (필수)
            </Typography>
          }
        </Stack>
      }
      <Box sx={{ width: '100%' }}>
        { props.children }
      </Box>
    </Box>
  );
};