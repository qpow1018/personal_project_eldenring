import { InputBase } from '@mui/material';

export default function BasicInput(
  props: {
    id?: string,
    value: string,
    onChange: (text: string) => void,
    placeholder?: string,
    onlyNumber?: boolean,
    rows?: number,
    sx?: any
  }
) {
  // textarea
  const isMultiline = props.rows !== undefined ? true : false;

  return (
    <InputBase
      id={props.id}
      value={props.value}
      onChange={(e) => {
        const value = e.currentTarget.value;
        if (props.onlyNumber === true) {
          const _value = value.replace(/[^0-9]/g, '');
          props.onChange(_value);
        } else {
          props.onChange(value);
        }
      }}
      placeholder={props.placeholder}
      spellCheck={'false'}
      multiline={isMultiline}
      rows={props.rows}
      // onKeyUp={props.onKeyup}
      // onKeyPress={(e) => {
      //   if (e.key === 'Enter') {
      //     props.onPressEnter && props.onPressEnter();
      //   }
      // }}
      sx={[
        (theme => ({
          width: '100%',
          height: '100%',
          '&.MuiInputBase-multiline': {
            padding: 0
          },
          '& .MuiInputBase-input': {
            padding: `0 ${theme.style.inputPadding}px`,
            height: '100%',
            fontFamily: theme.style.fontFamily,
            fontSize: 14,
            color: theme.color.text.main,
            '&::placeholder': {
              opacity: 1,
              color: theme.color.text.light
            }
          },
        })),
        isMultiline === true && {
          '& .MuiInputBase-input': {
            paddingTop: '12px',
            paddingBottom: '12px'
          }
        },
        {
          ...props.sx
        }
      ]}
    />
  );
};