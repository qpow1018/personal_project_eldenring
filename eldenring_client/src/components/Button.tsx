import { useTheme } from "@mui/material/styles";
import {
  Stack,
  Box,
  ButtonBase
} from '@mui/material';
import { keyframes } from '@mui/material/styles';

type ElButtonColor = {
  color?: string,
  backgroundColor?: string,
  borderColor?: string,
  disabledColor?: string,
  disabledBgColor?: string,
  disabledBorderColor?: string,
}

export enum ButtonThemes {
  bgPri = 'bg-pri',
  bdPri = 'bd-pri',
  bdGray = 'bd-gray'
}

Button.defaultProps = {
  disabled: false,
  loading: false
}

export default function Button(
  props: {
    children: React.ReactNode,
    onClick?: () => void,
    theme?: ButtonThemes,
    disabled: boolean,
    loading: boolean,
    sx?: any,
  }
) {
  let isDisabled = props.disabled;
  const isLoading = props.loading;
  if (isLoading === true) {
    isDisabled = true;
  }

  const theme = useTheme();
  const buttonColor: ElButtonColor = {
    color: theme.color.text.main,
    backgroundColor: theme.color.pri.main,
    borderColor: theme.color.pri.main,
    disabledColor: theme.color.text.sub,
    disabledBgColor: theme.color.pri.disabled,
    disabledBorderColor: 'transparent',
  };

  switch (props.theme) {
    case ButtonThemes.bgPri:
      break;

    case ButtonThemes.bdPri:
      buttonColor.color = theme.color.pri.main;
      buttonColor.backgroundColor = 'transparent';
      buttonColor.borderColor = theme.color.pri.main;
      buttonColor.disabledColor = theme.color.pri.disabled
      buttonColor.disabledBgColor = 'transparent';
      buttonColor.disabledBorderColor = theme.color.pri.disabled;
      break;

    case ButtonThemes.bdGray:
      buttonColor.color = theme.color.text.main;
      buttonColor.backgroundColor = 'transparent';
      buttonColor.borderColor = theme.color.border;
      buttonColor.disabledColor = theme.color.border;
      buttonColor.disabledBgColor = theme.color.border;
      buttonColor.disabledBorderColor = 'transparent';
      break;

  }

  return (
    <ButtonBase
      onClick={props.onClick}
      disabled={isDisabled}
      sx={[
        (theme => ({
          position: 'relative',
          flexDirection: 'row',
          flexShrink: 0,
          transition: theme.style.transition,
          letterSpacing: theme.style.letterSpacing,
          borderRadius: theme.style.borderRadius,
          width: 'auto',
          minHeight: 32,
          padding: '0 16px',
          fontSize: 14,
          fontWeight: 500,
          borderWidth: '1px',
          borderStyle: 'solid',
          color: buttonColor.color,
          backgroundColor: buttonColor.backgroundColor,
          borderColor: buttonColor.borderColor,
        })),
        isDisabled === true && {
          color: buttonColor.disabledColor,
          backgroundColor: buttonColor.disabledBgColor,
          borderColor: buttonColor.disabledBorderColor
        },
        isLoading === true && {
          color: 'transparent',
          backgroundColor: buttonColor.backgroundColor,
          borderColor: buttonColor.borderColor,
        },
        {
          ...props.sx
        }
      ]}
    >
      { props.children }

      { props.loading === true &&
        <ButtonLoadingIcon
          buttonColor={buttonColor}
        />
      }
    </ButtonBase>
  );
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
function ButtonLoadingIcon(
  props: {
    buttonColor: ElButtonColor
  }
) {
  const { buttonColor } = props;

  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}
    >
      <Box
        sx={{
          display: 'block',
          borderRadius: '50%',
          animation: `${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
          width: 22,
          height: 22,
          borderWidth: '3px',
          borderStyle: 'solid',
          borderColor: `${buttonColor.color} transparent transparent transparent`
        }}
      ></Box>
    </Stack>
  );
};