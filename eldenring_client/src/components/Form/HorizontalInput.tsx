import {
  Stack,
  Box
} from '@mui/material';

import BasicInput from 'components/Form/BasicInput';

export function HorizontalInputWrapper(
  props: {
    children: React.ReactNode
  }
) {
  return (
    <Stack
      direction={'row'}
      sx={theme => ({
        borderRadius: theme.style.borderRadius,
        border: `1px solid ${theme.color.border}`,
        width: '100%',
        height: theme.style.inputHeight,
      })}
    >
      { props.children }
    </Stack>
  );
};

export function HorizontalInput(
  props: {
    value: string,
    onChange: (val: string) => void,
    placeholder: string
  }
) {
  return (
    <Box
      sx={theme => ({
        flex: 1,
        borderLeft: `1px solid ${theme.color.border}`,
        '&:first-of-type': {
          borderLeft: 'none'
        }
      })}
    >
      <BasicInput
        value={props.value}
        onChange={(val) => props.onChange(val)}
        placeholder={props.placeholder}
        onlyNumber
        sx={{
          '& .MuiInputBase-input': {
            textAlign: 'center'
          }
        }}
      />
    </Box>
  );
};