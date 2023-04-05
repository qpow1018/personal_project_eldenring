import {
  Modal,
  Stack,
  Box,
  Typography,
  ButtonBase
} from '@mui/material';

import Button, { ButtonThemes } from 'components/Button';
import CloseIcon from '@mui/icons-material/Close';

Dialog.defaultProps = {
  cancelBtnText: '취소',
  submitBtnText: '확인'
}

export default function Dialog(
  props: {
    isOpen: boolean,
    onClose: () => void,
    title?: string,
    text?: string,
    cancelBtnText: string,
    onClickCancelBtn?: () => void,
    submitBtnText: string,
    onClickSubmitBtn?: () => void
  }
) {
  return (
    <Modal
      open={props.isOpen}
      onClose={props.onClose}
      sx={theme => ({
        '& > .MuiBackdrop-root': {
          transition: theme.style.transition
        }
      })}
    >
      <Stack
        sx={theme => ({
          boxShadow: theme.style.shadow,
          borderRadius: theme.style.borderRadius,
          overflow: 'hidden',
          position: 'absolute',
          top: '50%',
          left: '5%',
          transform: 'translateY(-50%)',
          width: '90%',
          minHeight: 80,
          maxWidth: '600px',
          maxHeight: 'calc(100% - 160px)',
          background: theme.color.background
        })}
      >
        <Box sx={{ padding: '16px' }}>
          <ButtonBase
            onClick={props.onClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              borderRadius: '50%',
              width: 36,
              height: 36
            }}
          >
            <CloseIcon
              sx={{
                fontSize: 20,
                color: '#fff'
              }}
            />
          </ButtonBase>

          { props.title !== undefined &&
            <Typography
              fontSize={'0.938rem'}
              fontWeight={700}
              sx={{ marginBottom: '8px' }}
            >
              { props.title }
            </Typography>
          }

          { props.text !== undefined &&
            <Typography
              fontSize={'0.875rem'}
              color={theme => theme.color.text.sub}
            >
              { props.text }
            </Typography>
          }

          <Stack
            direction={'row'}
            justifyContent={'flex-end'}
            sx={{
              marginTop: '20px',
              '& > button': {
                marginRight: '10px',
                '&:last-of-type': {
                  marginRight: 0
                }
              }
            }}
          >
            { props.onClickCancelBtn !== undefined &&
              <Button
                onClick={props.onClickCancelBtn}
                theme={ButtonThemes.bdGray}
                sx={{
                  width: 'auto',
                  minWidth: 64,
                  padding: '0 12px'
                }}
              >
                { props.cancelBtnText }
              </Button>
            }
            { props.onClickSubmitBtn !== undefined &&
              <Button
                onClick={props.onClickSubmitBtn}
                sx={{
                  width: 'auto',
                  minWidth: 64,
                  padding: '0 12px'
                }}
              >
                { props.submitBtnText }
              </Button>
            }
          </Stack>
        </Box>
      </Stack>
    </Modal>
  );
};