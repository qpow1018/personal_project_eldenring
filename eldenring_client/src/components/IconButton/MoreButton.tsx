import { useState } from 'react';
import {
  Menu,
  ButtonBase,
  Typography
} from '@mui/material';

import IconBase from './IconBase';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function MoreButton(
  props: {
    onClickUpdate: () => void,
    onClickDelete: () => void
  }
) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonBase onClick={(e) => handleClick(e)}>
        <IconBase>
          <MoreVertIcon />
        </IconBase>
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={theme => ({
          '.MuiMenu-paper': {
            backgroundColor: theme.color.background,
            width: 140,
          }
        })}
      >
        <MenuItemView onClick={props.onClickUpdate}>수정하기</MenuItemView>
        <MenuItemView onClick={props.onClickDelete}>삭제하기</MenuItemView>
      </Menu>
    </>
  );
};

function MenuItemView(
  props: {
    onClick: () => void,
    children: React.ReactNode
  }
) {
  return (
    <ButtonBase
      onClick={props.onClick}
      sx={{
        justifyContent: 'flex-start',
        width: '100%',
        height: 40,
        padding: '0 12px'
      }}
    >
      <Typography
        fontSize={13}
        fontWeight={500}
      >
        { props.children }
      </Typography>
    </ButtonBase>
  );
};