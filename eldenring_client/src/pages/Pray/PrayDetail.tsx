import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Stack,
  Box,
  Typography
} from '@mui/material';

import APIService from 'api/APIService';
import { ElPray } from 'api/response-type';
import { changeNullToDash } from 'utils';
import useSnackbar from 'hook/useSnackbar';

import ContentContainer from 'components/ContentContainer';
import BoxLoading from 'components/Loading/BoxLoading';
import FixedLoading from 'components/Loading/FixedLoading';
import { Table, TableRow, TableCell } from 'components/Table';
import MoreButton from 'components/IconButton/MoreButton';
import Dialog from 'components/Dialog';

export default function PrayDetail() {
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const { prayId } = useParams();
  const [isDataLoadCmpl, setIsDataLoadCmpl] = useState<boolean>(false);
  const [isSubmitLoadCmpl, setIsSubmitLoadCmpl] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [prayInfo, setPrayInfo] = useState<ElPray | null>(null);

  useEffect(() => {
    if (prayId !== undefined) {
      getPrayDetailFromServer(Number(prayId));
    }
  }, [prayId]);

  const getPrayDetailFromServer = async (prayId: number) => {
    try {
      const resData = await APIService.pray.getDetail(prayId);
      setPrayInfo(resData);
      setIsDataLoadCmpl(true);

    } catch (error) {
      console.error('getPrayDetailFromServer', error);
      alert('getPrayDetailFromServer Error!');
    }
  }

  const deletePrayFromServer = async (prayId: string | undefined) => {
    if (prayId === undefined) {
      snackbar.error('잘못된 요청입니다.');
      return;
    }

    setIsSubmitLoadCmpl(false);

    try {
      const _prayId = Number(prayId);

      await APIService.pray.delete(_prayId);
      snackbar.success('기도가 삭제되었습니다.');

      setIsSubmitLoadCmpl(true);

      navigate('/pray');

    } catch (error) {
      console.error('deletePrayFromServer', error);
      snackbar.error('작업을 완료하지 못했습니다.');
      setIsSubmitLoadCmpl(true);
    }
  }

  return (
    <>
      { (isDataLoadCmpl === true && prayInfo !== null) &&
        <ContentContainer
          title={prayInfo.name}
          rightView={
            <MoreButton
              onClickUpdate={() => navigate(`/pray/${prayId}/update`)}
              onClickDelete={() => setIsDialogOpen(true)}
            />
          }
        >
          <SectionBoxView title='기본 정보'>
            <Box sx={{ marginBottom: '16px' }}>
              <InfoRowView
                label='소모 FP'
                value={changeNullToDash(prayInfo.consumeFp)}
              />
              <InfoRowView
                label='사용 슬롯수'
                value={changeNullToDash(prayInfo.useSlot)}
              />
            </Box>

            <Table
              title='필요 능력치'
              grid='1fr 1fr 1fr 1fr 1fr'
            >
              <TableRow header>
                <TableCell>근력</TableCell>
                <TableCell>기력</TableCell>
                <TableCell>지력</TableCell>
                <TableCell>신앙</TableCell>
                <TableCell>신비</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{ changeNullToDash(prayInfo.reqStatusStr) }</TableCell>
                <TableCell>{ changeNullToDash(prayInfo.reqStatusDex) }</TableCell>
                <TableCell>{ changeNullToDash(prayInfo.reqStatusInt) }</TableCell>
                <TableCell>{ changeNullToDash(prayInfo.reqStatusFaith) }</TableCell>
                <TableCell>{ changeNullToDash(prayInfo.reqStatusArc) }</TableCell>
              </TableRow>
            </Table>
          </SectionBoxView>

          <SectionBoxView title='설명'>
            <Typography
              fontSize={14}
              sx={{ whiteSpace: 'pre-wrap' }}
            >
              { changeNullToDash(prayInfo.description) }
            </Typography>
          </SectionBoxView>

          <SectionBoxView title='메모'>
            <Typography
              fontSize={14}
              sx={{ whiteSpace: 'pre-wrap' }}
            >
              { changeNullToDash(prayInfo.memo) }
            </Typography>
          </SectionBoxView>
        </ContentContainer>
      }

      { (isDialogOpen === true && prayInfo !== null) &&
        <Dialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title={'기도 삭제'}
          text={`'${prayInfo.name}' 기도를 삭제하시겠습니까?`}
          onClickCancelBtn={() => setIsDialogOpen(false)}
          onClickSubmitBtn={() => deletePrayFromServer(prayId)}
        />
      }

      { isDataLoadCmpl === false &&
        <BoxLoading height={'100vh'} />
      }

      { isSubmitLoadCmpl === false &&
        <FixedLoading />
      }
    </>
  );
};

function SectionBoxView(
  props: {
    title: string,
    children?: React.ReactNode
  }
) {
  return (
    <Box
      sx={theme => ({
        padding: '16px',
        borderBottom: `1px solid ${theme.color.border}`
      })}
    >
      <Typography
        fontSize={16}
        fontWeight={700}
        sx={{ marginBottom: '16px' }}
      >
        { props.title }
      </Typography>

      { props.children }
    </Box>
  );
};

function InfoRowView(
  props: {
    label: string,
    value: string
  }
) {
  return (
    <Stack
      direction={'row'}
      sx={{
        fontSize: 14,
        marginBottom: '8px',
        '&:last-of-type': {
          marginBottom: 0
        }
      }}
    >
      <Typography
        variant='inner'
        color={theme => theme.color.text.sub}
        sx={{ flex: 1 }}
      >
        { props.label }
      </Typography>
      <Typography variant='inner'>
        { props.value }
      </Typography>
    </Stack>
  );
};