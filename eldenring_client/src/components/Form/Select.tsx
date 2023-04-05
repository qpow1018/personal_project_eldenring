import {
  Select,
  MenuItem,
  Typography
} from '@mui/material';

export type EdSelectMenu = {
  displayText: string,
  code: string | number
}

export default function FlaboSelectView(
  props: {
    menus: EdSelectMenu[],
    value: string | number | null,
    placeholder?: string,
    onChange: (value: string | number) => void
  }
) {
  return (
    <Select
      variant='standard'
      displayEmpty={true}
      value={props.value !== null ? props.value : ''}
      onChange={(e) => props.onChange(e.target.value)}
      renderValue={selected => {
        const selectedValue = props.menus.find(item => item.code === selected);
        if (selectedValue === undefined) {
          return (
            <PlaceholderView
              text={props.placeholder}
            />
          );
        } else {
          return (
            <SelectedValueView
              text={selectedValue.displayText}
            />
          );
        }
      }}
      sx={theme => ({
        borderRadius: theme.style.borderRadius,
        border: `1px solid ${theme.color.border}`,
        width: '100%',
        height: theme.style.inputHeight,
        '&.MuiInput-root .MuiSelect-select': {
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          padding: `0 ${theme.style.inputPadding}px`,
          fontFamily: theme.style.fontFamily,
          fontSize: 14,
          color: theme.color.text.main
        },
        '& .MuiSelect-select:focus': {
          backgroundColor: 'transparent',
        },
        '&::before': { display: 'none' },
        '&::after': { display: 'none' },
        '& .MuiSelect-icon': {
          fontSize: 20,
          color: theme.color.text.light,
          marginRight: '8px'
         }
      })}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        PaperProps: {
          sx: (theme) => ({
            marginTop: '8px',
            borderRadius: theme.style.borderRadius,
            backgroundColor: theme.color.background,
            boxShadow: theme.style.shadow
          })
        },
        MenuListProps: {
          sx: theme => ({
            padding: '8px 0',
            '&.MuiList-root > li': {
              letterSpacing: theme.style.letterSpacing,
              height: 36,
              fontFamily: theme.style.fontFamily,
              fontWeight: 400,
              color: theme.color.text.main,
              fontSize: 14,
              padding: `0 ${theme.style.inputPadding}px`,
              backgroundColor: theme.color.background,
              '&:hover': {
                backgroundColor: theme.color.background,
              },
              '&.Mui-selected': {
                fontWeight: 500,
                color: theme.color.pri.main,
                backgroundColor: theme.color.pri.light,
                '&.Mui-focusVisible': {
                  backgroundColor: theme.color.pri.light,
                },
                '&:hover': {
                  backgroundColor: theme.color.pri.light,
                }
              }
            }
          })
        }
      }}
    >
      { props.menus.map((item, index) =>
        <MenuItem
          key={index}
          value={item.code}
        >
          { item.displayText }
        </MenuItem>
      )}
    </Select>
  );
};

function PlaceholderView(
  props: {
    text?: string,
  }
) {
  return (
    <Typography
      variant='inner'
      color={theme => theme.color.text.light}
    >
      { props.text }
    </Typography>
  );
};

function SelectedValueView(
  props: {
    text: string
  }
) {
  return (
    <Typography
      variant='inner'
    >
      { props.text }
    </Typography>
  );
};