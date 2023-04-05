import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Stack,
  Box,
  Typography
} from '@mui/material';

import APIService from 'api/APIService';
import { ElEquipmentWeapon } from 'api/response-type';
import {
  addMiddleDot,
  getCategoryDisplayText,
  getWeaponTypeDisplayText,
  getAttackTypeDisplayText,
  changeNullToDash
} from 'utils';
import useSnackbar from 'hook/useSnackbar';

import ContentContainer from 'components/ContentContainer';
import BoxLoading from 'components/Loading/BoxLoading';
import FixedLoading from 'components/Loading/FixedLoading';
import { Table, TableRow, TableCell } from 'components/Table';
import MoreButton from 'components/IconButton/MoreButton';
import Dialog from 'components/Dialog';

export default function WeaponDetail() {
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const { weaponId } = useParams();
  const [isDataLoadCmpl, setIsDataLoadCmpl] = useState<boolean>(false);
  const [isSubmitLoadCmpl, setIsSubmitLoadCmpl] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [weaponInfo, setWeaponInfo] = useState<ElEquipmentWeapon | null>(null);

  useEffect(() => {
    if (weaponId !== undefined) {
      getWeaponInfoFromServer(Number(weaponId));
    }
  }, [weaponId]);

  const getWeaponInfoFromServer = async (weaponId: number) => {
    try {
      const resData = await APIService.weapon.getDetail(weaponId);
      setWeaponInfo(resData);
      setIsDataLoadCmpl(true);

    } catch (error) {
      console.error('getWeaponInfoFromServer', error);
      alert('getWeaponInfoFromServer Error!');
    }
  }

  const deleteWeaponFromServer = async (weaponId: string | undefined) => {
    if (weaponId === undefined) {
      snackbar.error('잘못된 요청입니다.');
      return;
    }

    setIsSubmitLoadCmpl(false);

    try {
      const _weaponId = Number(weaponId);

      await APIService.weapon.delete(_weaponId);
      snackbar.success('마술이 삭제되었습니다.');

      setIsSubmitLoadCmpl(true);

      navigate('/weapon');

    } catch (error) {
      console.error('deleteMagicFromServer', error);
      snackbar.error('작업을 완료하지 못했습니다.');
      setIsSubmitLoadCmpl(true);
    }
  }

  const attackTypesText = getAttackTypesText();
  function getAttackTypesText(): string {
    if (weaponInfo === null) return '';
    const _attackTypesText = weaponInfo.attackTypes.map(item => getAttackTypeDisplayText(item));
    return addMiddleDot(_attackTypesText);
  }

  const totalDamageText = getTotalDamageText();
  function getTotalDamageText() {
    if (weaponInfo === null) return '';

    const damageArray = [
      weaponInfo.damagePhysics,
      weaponInfo.damageMagic,
      weaponInfo.damageFire,
      weaponInfo.damageThunder,
      weaponInfo.damageDivinity
    ].map(val => {
      if (val === null) return 0;
      return val;
    });

    const total = damageArray.reduce((acc, cur) => acc + cur, 0);
    return total.toLocaleString();
  }

  return (
    <>
      { (isDataLoadCmpl === true && weaponInfo !== null) &&
        <ContentContainer
          title={weaponInfo.name}
          rightView={
            <MoreButton
              onClickUpdate={() => navigate(`/weapon/${weaponId}/update`)}
              onClickDelete={() => setIsDialogOpen(true)}
            />
          }
        >
          <SectionBoxView title='기본 정보'>
            <Box sx={{ marginBottom: '16px' }}>
              <InfoRowView
                label='카테고리'
                value={getCategoryDisplayText(weaponInfo.category)}
              />
              <InfoRowView
                label='무기 타입'
                value={getWeaponTypeDisplayText(weaponInfo.weaponType)}
              />
              <InfoRowView
                label='공격 속성'
                value={attackTypesText}
              />
              <InfoRowView
                label='기본 전회'
                value={changeNullToDash(weaponInfo.skillName)}
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
                <TableCell>{ changeNullToDash(weaponInfo.reqStatusStr) }</TableCell>
                <TableCell>{ changeNullToDash(weaponInfo.reqStatusDex) }</TableCell>
                <TableCell>{ changeNullToDash(weaponInfo.reqStatusInt) }</TableCell>
                <TableCell>{ changeNullToDash(weaponInfo.reqStatusFaith) }</TableCell>
                <TableCell>{ changeNullToDash(weaponInfo.reqStatusArc) }</TableCell>
              </TableRow>
            </Table>
          </SectionBoxView>

          <SectionBoxView title='공격 정보'>
            <Table
              title='공격력'
              grid='1fr 1fr'
              sx={{ marginBottom: '16px' }}
            >
              <TableRow header>
                <TableCell>총합</TableCell>
                <TableCell>{ totalDamageText }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>물리</TableCell>
                <TableCell>{ changeNullToDash(weaponInfo.damagePhysics) }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>마력</TableCell>
                <TableCell>{ changeNullToDash(weaponInfo.damageMagic) }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>화염</TableCell>
                <TableCell>{ changeNullToDash(weaponInfo.damageFire) }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>벼락</TableCell>
                <TableCell>{ changeNullToDash(weaponInfo.damageThunder) }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>신성</TableCell>
                <TableCell>{ changeNullToDash(weaponInfo.damageDivinity) }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>치명</TableCell>
                <TableCell>{ changeNullToDash(weaponInfo.damageCritical) }</TableCell>
              </TableRow>
            </Table>

            <Table
              title='부가 효과'
              grid='1fr 1fr 1fr 1fr'
            >
              <TableRow header>
                <TableCell>붉을 부패</TableCell>
                <TableCell>동상</TableCell>
                <TableCell>출혈</TableCell>
                <TableCell>독</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{ changeNullToDash(weaponInfo.sideEffectCorruption) }</TableCell>
                <TableCell>{ changeNullToDash(weaponInfo.sideEffectFrozon) }</TableCell>
                <TableCell>{ changeNullToDash(weaponInfo.sideEffectBleeding) }</TableCell>
                <TableCell>{ changeNullToDash(weaponInfo.sideEffectPoison) }</TableCell>
              </TableRow>
            </Table>
          </SectionBoxView>

          <SectionBoxView title='특수 기능'>
            <Typography
              fontSize={14}
              sx={{ whiteSpace: 'pre-wrap' }}
            >
              { changeNullToDash(weaponInfo.specialFunction) }
            </Typography>
          </SectionBoxView>

          <SectionBoxView title='메모'>
            <Typography
              fontSize={14}
              sx={{ whiteSpace: 'pre-wrap' }}
            >
              { changeNullToDash(weaponInfo.memo) }
            </Typography>
          </SectionBoxView>
        </ContentContainer>
      }

      { (isDialogOpen === true && weaponInfo !== null) &&
        <Dialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title={'마술 삭제'}
          text={`'${weaponInfo.name}' 마술을 삭제하시겠습니까?`}
          onClickCancelBtn={() => setIsDialogOpen(false)}
          onClickSubmitBtn={() => deleteWeaponFromServer(weaponId)}
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