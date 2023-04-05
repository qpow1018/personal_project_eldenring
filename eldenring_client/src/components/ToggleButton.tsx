
import { ButtonBase } from '@mui/material';

export default function ToggleButton(
  props: {
    onClick?: () => void,
    isActive?: boolean,
    children: React.ReactNode
  }
) {
  return (
    <ButtonBase
      onClick={props.onClick}
      sx={[
        (theme => ({
          borderRadius: theme.style.borderRadius,
          border: `1px solid ${theme.color.border}`,
          flex: 1,
          width: '100%',
          height: theme.style.inputHeight,
          fontSize: 14,
          color: theme.color.text.sub
        })),
        props.isActive === true && (theme => ({
          color: theme.color.pri.main,
          background: theme.color.pri.light,
          fontWeight: 500
        }))
      ]}
    >
      { props.children }
    </ButtonBase>
  );
};