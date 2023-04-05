import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Stack,
  Box,
  Typography
} from '@mui/material';

import APIService from 'api/APIService';
import { ElSkill } from 'api/response-type';
import {
  changeNullToDash,
  getDeteriorationTypeDisplayText,
  getCategoryDisplayText
} from 'utils';
import useSnackbar from 'hook/useSnackbar';

import ContentContainer from 'components/ContentContainer';
import BoxLoading from 'components/Loading/BoxLoading';
import FixedLoading from 'components/Loading/FixedLoading';
import MoreButton from 'components/IconButton/MoreButton';
import Dialog from 'components/Dialog';

export default function SkillDetail() {
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const { skillId } = useParams();
  const [isDataLoadCmpl, setIsDataLoadCmpl] = useState<boolean>(false);
  const [isSubmitLoadCmpl, setIsSubmitLoadCmpl] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [skillInfo, setSkillInfo] = useState<ElSkill | null>(null);

  useEffect(() => {
    if (skillId !== undefined) {
      getSkillDetailFromServer(Number(skillId));
    }
  }, [skillId]);

  const getSkillDetailFromServer = async (skillId: number) => {
    try {
      const resData = await APIService.skill.getDetail(skillId);
      setSkillInfo(resData);
      setIsDataLoadCmpl(true);

    } catch (error) {
      console.error('getSkillDetailFromServer', error);
      alert('getSkillDetailFromServer Error!');
    }
  }

  const deleteSkillFromServer = async (skillId: string | undefined) => {
    if (skillId === undefined) {
      snackbar.error('잘못된 요청입니다.');
      return;
    }

    const _skillId = Number(skillId);
    const weaponList = await APIService.weapon.getList();
    console.log('weaponList', weaponList)
    const matchObj = weaponList.find(item => item.skillId === _skillId);
    if (matchObj !== undefined) {
      snackbar.error('해당 전회를 사용하는 무기가 있습니다.');
      return;
    }

    setIsSubmitLoadCmpl(false);

    try {
      await APIService.skill.delete(_skillId);
      snackbar.success('전회가 삭제되었습니다.');

      setIsSubmitLoadCmpl(true);

      navigate('/skill');

    } catch (error) {
      console.error('deleteSkillFromServer', error);
      snackbar.error('작업을 완료하지 못했습니다.');
      setIsSubmitLoadCmpl(true);

    }
  }

  return (
    <>
      { (isDataLoadCmpl === true && skillInfo !== null) &&
        <ContentContainer
          title={skillInfo.name}
          rightView={
            <MoreButton
              onClickUpdate={() => navigate(`/skill/${skillId}/update`)}
              onClickDelete={() => setIsDialogOpen(true)}
            />
          }
        >
          <SectionBoxView title='기본 정보'>
            <Box sx={{ marginBottom: '16px' }}>
              <InfoRowView
                label='기본 속성'
                value={
                  skillInfo.deteriorationType !== null
                  ? getDeteriorationTypeDisplayText(skillInfo.deteriorationType)
                  : '-'
                }
              />

              <InfoRowMultiValueView label='사용 가능 무기'>
                { 0 < skillInfo.availableWeaponCategory.length ? (
                  skillInfo.availableWeaponCategory.map((item, index) =>
                    <Stack
                      key={index}
                      alignItems={'flex-end'}
                    >
                      <Typography variant='inner'>
                        { getCategoryDisplayText(item) }
                      </Typography>
                    </Stack>
                  )
                ) : (
                <Typography variant='inner'>-</Typography>
                )}
              </InfoRowMultiValueView>
            </Box>
          </SectionBoxView>

          <SectionBoxView title='설명'>
            <Typography
              fontSize={14}
              sx={{ whiteSpace: 'pre-wrap' }}
            >
              { changeNullToDash(skillInfo.description) }
            </Typography>
          </SectionBoxView>

          <SectionBoxView title='메모'>
            <Typography
              fontSize={14}
              sx={{ whiteSpace: 'pre-wrap' }}
            >
              { changeNullToDash(skillInfo.memo) }
            </Typography>
          </SectionBoxView>
        </ContentContainer>
      }

      { (isDialogOpen === true && skillInfo !== null) &&
        <Dialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title={'전회 삭제'}
          text={`'${skillInfo.name}' 전회을 삭제하시겠습니까?`}
          onClickCancelBtn={() => setIsDialogOpen(false)}
          onClickSubmitBtn={() => deleteSkillFromServer(skillId)}
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

function InfoRowMultiValueView(
  props: {
    label: string,
    children: React.ReactNode
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
        { props.children }
      </Typography>
    </Stack>
  );
};