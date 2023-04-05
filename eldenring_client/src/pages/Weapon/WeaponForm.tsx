import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Stack,
  Box,
  Typography,
  ButtonBase
} from '@mui/material';

import APIService from 'api/APIService';
import { ElEquipmentWeapon } from 'api/response-type';
import { ElSubmitEquipmentWeapon } from 'api/request-type';
import {
  FormPageType,
  WeaponCategorys,
  WeaponTypes,
  DefaultWeaponType,
  AttackTypes
} from 'define';
import useSnackbar from 'hook/useSnackbar';
import {
  changeBlankToNumberOrNull,
  changeNullToBlank
} from 'utils';
import FormValidator from 'utils/FormValidator';

import ContentContainer from 'components/ContentContainer';
import BoxLoading from 'components/Loading/BoxLoading';
import FixedLoading from 'components/Loading/FixedLoading';
import FormRow from 'components/Form/FormRow';
import TextInput from 'components/Form/TextInput';
import Select, { EdSelectMenu } from 'components/Form/Select';
import BasicInput from 'components/Form/BasicInput';
import Button from 'components/Button';

type ElAttackTypeValue = {
  code: string,
  displayText: string,
  isChecked: boolean
}

const AttackTypeValues = AttackTypes.map(item => {
  return {
    ...item,
    isChecked: false
  }
});

const SkillMenuEmptyValue: EdSelectMenu = {
  code: '',
  displayText: '-'
}

export default function WeaponForm(
  props: {
    pageType: FormPageType
  }
) {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { weaponId } = useParams();
  const { pageType } = props;

  const [isDataLoadCmpl, setIsDataLoadCmpl] = useState<boolean>(false);
  const [isSubmitLoadCmpl, setIsSubmitLoadCmpl] = useState<boolean>(true);
  const [weaponInfo, setWeaponInfo] = useState<ElEquipmentWeapon | null>(null);
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [attackTypes, setAttackTypes] = useState<ElAttackTypeValue[]>(AttackTypeValues);
  const [weaponType, setWeaponType] = useState<string>(DefaultWeaponType.code);
  
  
  const [skillMenus, setSkillMenus] = useState<EdSelectMenu[]>([]);
  const [basicSkill, setBasicSkill] = useState<string>('');
  
  
  const [reqStatusStr, setReqStatusStr] = useState<string>('');
  const [reqStatusDex, setReqStatusDex] = useState<string>('');
  const [reqStatusInt, setReqStatusInt] = useState<string>('');
  const [reqStatusFaith, setReqStatusFaith] = useState<string>('');
  const [reqStatusArc, setReqStatusArc] = useState<string>('');
  const [damagePhysics, setDamagePhysics] = useState<string>('');
  const [damageMagic, setDamageMagic] = useState<string>('');
  const [damageFire, setDamageFire] = useState<string>('');
  const [damageThunder, setDamageThunder] = useState<string>('');
  const [damageDivinity, setDamageDivinity] = useState<string>('');
  const [damageCritical, setDamageCritical] = useState<string>('');
  const [sideEffectCorruption, setSideEffectCorruption] = useState<string>('');
  const [sideEffectFrozon, setSideEffectFrozon] = useState<string>('');
  const [sideEffectBleeding, setSideEffectBleeding] = useState<string>('');
  const [sideEffectPoison, setSideEffectPoison] = useState<string>('');
  const [specialFunction, setSpecialFunction] = useState<string>('');
  const [memo, setMemo] = useState<string>('');

  useEffect(() => {
    getSkillListFromServer();
  }, []);

  const getSkillListFromServer = async () => {
    try {
      const resData = await APIService.skill.getList();
      const _skillMenus = resData.map(item => ({ code: String(item.id), displayText: item.name }));
      setSkillMenus([
        SkillMenuEmptyValue,
        ..._skillMenus
      ]);

    } catch (error) {
      console.error('getSkillListFromServer', error);
      alert('전회 목록을 가져오지 못했습니다.');

    }
  }

  useEffect(() => {
    if (skillMenus.length === 0) return;

    if (pageType === FormPageType.create) {
      setIsDataLoadCmpl(true);

    } else if (pageType === FormPageType.update) {
      const _weaponId = Number(weaponId);
      getWeaponInfoFromServer(_weaponId);

    }
  }, [skillMenus, pageType, weaponId]);

  const getWeaponInfoFromServer = async (weaponId: number) => {
    try {
      const resData = await APIService.weapon.getDetail(weaponId);
      setWeaponInfo(resData);

    } catch (error) {
      console.error('getWeaponInfoFromServer', error);
      alert('getWeaponInfoFromServer Error!');
    }
  }

  useEffect(() => {
    if (weaponInfo === null) return;

    const item = weaponInfo;

    setName(item.name);
    setCategory(item.category);

    const _AttackTypeValues = AttackTypeValues.map(val => {
      if (item.attackTypes.includes(val.code) === true) {
        val.isChecked = true;
      }
      return val;
    });
    setAttackTypes(_AttackTypeValues);

    setWeaponType(item.weaponType);
    setBasicSkill(changeNullToBlank(item.skillId))
    setReqStatusStr(changeNullToBlank(item.reqStatusStr));
    setReqStatusDex(changeNullToBlank(item.reqStatusDex));
    setReqStatusInt(changeNullToBlank(item.reqStatusInt));
    setReqStatusFaith(changeNullToBlank(item.reqStatusFaith));
    setReqStatusArc(changeNullToBlank(item.reqStatusArc));
    setDamagePhysics(changeNullToBlank(item.damagePhysics));
    setDamageMagic(changeNullToBlank(item.damageMagic));
    setDamageFire(changeNullToBlank(item.damageFire));
    setDamageThunder(changeNullToBlank(item.damageThunder));
    setDamageDivinity(changeNullToBlank(item.damageDivinity));
    setDamageCritical(changeNullToBlank(item.damageCritical));
    setSideEffectCorruption(changeNullToBlank(item.sideEffectCorruption));
    setSideEffectFrozon(changeNullToBlank(item.sideEffectFrozon));
    setSideEffectBleeding(changeNullToBlank(item.sideEffectBleeding));
    setSideEffectPoison(changeNullToBlank(item.sideEffectPoison));
    setSpecialFunction(changeNullToBlank(item.specialFunction));
    setMemo(changeNullToBlank(item.memo));

    setIsDataLoadCmpl(true);
  }, [weaponInfo]);

  const toggleAttackType = (index: number) => {
    const updateList = [ ...attackTypes ];
    updateList[index] = {
      ...updateList[index],
      isChecked: !updateList[index].isChecked
    }
    setAttackTypes(updateList);
  }

  const onSubmit = () => {
    const nameValidator = new FormValidator(name).required('이름을 입력하세요.').check();
    if (nameValidator.pass === false) {
      snackbar.error(nameValidator.errorMsg);
      return;
    }

    const categoryValidator = new FormValidator(category).required('카테고리를 선택하세요.').check();
    if (categoryValidator.pass === false) {
      snackbar.error(categoryValidator.errorMsg);
      return;
    }

    const checkedAttackTypesCode = attackTypes.filter(item => item.isChecked === true).map(item => item.code);
    const attackTypesValidator = new FormValidator(checkedAttackTypesCode).minSize(1, '공격 속성을 최소 1개 이상 선택하세요.').check();
    if (attackTypesValidator.pass === false) {
      snackbar.error(attackTypesValidator.errorMsg);
      return;
    }

    const weaponTypeValidator = new FormValidator(weaponType).required('무기 타입을 선택하세요.').check();
    if (weaponTypeValidator.pass === false) {
      snackbar.error(weaponTypeValidator.errorMsg);
      return;
    }

    const params: ElSubmitEquipmentWeapon = {
      name: name,
      category: category,
      attackTypes: checkedAttackTypesCode,
      weaponType: weaponType,
      skillId: changeBlankToNumberOrNull(basicSkill),
      reqStatusStr: changeBlankToNumberOrNull(reqStatusStr),
      reqStatusDex: changeBlankToNumberOrNull(reqStatusDex),
      reqStatusInt: changeBlankToNumberOrNull(reqStatusInt),
      reqStatusFaith: changeBlankToNumberOrNull(reqStatusFaith),
      reqStatusArc: changeBlankToNumberOrNull(reqStatusArc),
      damagePhysics: changeBlankToNumberOrNull(damagePhysics),
      damageMagic: changeBlankToNumberOrNull(damageMagic),
      damageFire: changeBlankToNumberOrNull(damageFire),
      damageThunder: changeBlankToNumberOrNull(damageThunder),
      damageDivinity: changeBlankToNumberOrNull(damageDivinity),
      damageCritical: changeBlankToNumberOrNull(damageCritical),
      sideEffectCorruption: changeBlankToNumberOrNull(sideEffectCorruption),
      sideEffectFrozon: changeBlankToNumberOrNull(sideEffectFrozon),
      sideEffectBleeding: changeBlankToNumberOrNull(sideEffectBleeding),
      sideEffectPoison: changeBlankToNumberOrNull(sideEffectPoison),
      specialFunction: specialFunction.trim() !== '' ? specialFunction : null,
      memo: memo.trim() !== '' ? memo : null
    }

    setIsSubmitLoadCmpl(false);
    submitWeaponFromServer(params);
  }

  const submitWeaponFromServer = async (params: ElSubmitEquipmentWeapon) => {
    try {
      if (pageType === FormPageType.create) {
        await APIService.weapon.insert(params);
        snackbar.success('무기 등록이 완료되었습니다.');

        setIsSubmitLoadCmpl(true);

        navigate('/weapon');

      } else if (pageType === FormPageType.update) {
        await APIService.weapon.update(Number(weaponId), params);
        snackbar.success('무기 수정이 완료되었습니다.');

        setIsSubmitLoadCmpl(true);

        navigate(`/weapon/${weaponId}`, { replace: true });

      }
    } catch (error) {
      console.error('submitEquipmentWeaponFromServer', error);
      snackbar.error('작업을 완료하지 못했습니다.');
      setIsSubmitLoadCmpl(true);
    }
  }

  return (
    <>
      { isDataLoadCmpl === true &&
        <ContentContainer
          title={pageType === FormPageType.create ? '무기 정보 등록' : '무기 정보 수정'}
          rightView={
            <Button
              onClick={onSubmit}
              sx={{ height: 32 }}
            >
              {pageType === FormPageType.create ? '등록하기' : '수정하기'}
            </Button>
          }
        >
          <Box sx={{ padding: '16px' }}>
            <FormRow label='이름' required>
              <TextInput
                value={name}
                onChange={(val) => setName(val)}
                placeholder='이름'
              />
            </FormRow>

            <FormRow label='카테고리' required>
              <Select
                menus={WeaponCategorys}
                value={category}
                onChange={(val) => setCategory(String(val))}
                placeholder='카테고리'
              />
            </FormRow>

            <FormRow label='공격 속성' required>
              <Stack direction={'row'}>
                { attackTypes.map((item, index) =>
                  <ButtonBase
                    key={index}
                    onClick={() => toggleAttackType(index)}
                    sx={[
                      (theme => ({
                        borderRadius: theme.style.borderRadius,
                        border: `1px solid ${theme.color.border}`,
                        flex: 1,
                        height: theme.style.inputHeight,
                        fontSize: 14,
                        color: theme.color.text.sub,
                        marginRight: '12px',
                        '&:last-of-type': {
                          marginRight: 0
                        }
                      })),
                      item.isChecked === true && (theme => ({
                        color: theme.color.pri.main,
                        background: theme.color.pri.light,
                        fontWeight: 500
                      }))
                    ]}
                  >
                    { item.displayText }
                  </ButtonBase>
                )}
              </Stack>
            </FormRow>

            <FormRow label='무기 타입' required>
              <Stack
                direction={'row'}
                sx={theme => ({
                  overflow: 'hidden',
                  borderRadius: theme.style.borderRadius,
                  border: `1px solid ${theme.color.border}`,
                  width: '100%',
                  height: theme.style.inputHeight
                })}
              >
                { WeaponTypes.map((item, index) =>
                  <Box
                    key={index}
                    sx={theme => ({
                      flex: 1,
                      height: '100%',
                      borderLeft: `1px solid ${theme.color.border}`,
                      '&:first-of-type': {
                        borderLeft: 'none'
                      }
                    })}
                  >
                    <ButtonBase
                      onClick={() => setWeaponType(item.code)}
                      sx={[
                        {
                          width: '100%',
                          height: '100%',
                          fontSize: 14,
                          color: theme => theme.color.text.sub
                        },
                        weaponType === item.code && (theme => ({
                          color: theme.color.pri.main,
                          background: theme.color.pri.light,
                          fontWeight: 500
                        }))
                      ]}
                    >
                      { item.displayText }
                    </ButtonBase>
                  </Box>
                )}
              </Stack>
            </FormRow>

            <FormRow label='기본 전회 선택'>
              <Select
                menus={skillMenus}
                value={basicSkill}
                onChange={(val) => setBasicSkill(String(val))}
                placeholder='기본 전회'
              />
            </FormRow>

            <FormRow label='필요 요구치'>
              <HorizontalInputWrapperView>
                <HorizontalInputView
                  value={reqStatusStr}
                  onChange={(val) => setReqStatusStr(val)}
                  placeholder='근력'
                />
                <HorizontalInputView
                  value={reqStatusDex}
                  onChange={(val) => setReqStatusDex(val)}
                  placeholder='기력'
                />
                <HorizontalInputView
                  value={reqStatusInt}
                  onChange={(val) => setReqStatusInt(val)}
                  placeholder='지력'
                />
                <HorizontalInputView
                  value={reqStatusFaith}
                  onChange={(val) => setReqStatusFaith(val)}
                  placeholder='신앙'
                />
                <HorizontalInputView
                  value={reqStatusArc}
                  onChange={(val) => setReqStatusArc(val)}
                  placeholder='신비'
                />
              </HorizontalInputWrapperView>
            </FormRow>

            <FormRow label='공격력'>
              <RowInputView
                label='물리'
                value={damagePhysics}
                onChangeValue={(val) => setDamagePhysics(val)}
              />
              <RowInputView
                label='마력'
                value={damageMagic}
                onChangeValue={(val) => setDamageMagic(val)}
              />
              <RowInputView
                label='화염'
                value={damageFire}
                onChangeValue={(val) => setDamageFire(val)}
              />
              <RowInputView
                label='벼락'
                value={damageThunder}
                onChangeValue={(val) => setDamageThunder(val)}
              />
              <RowInputView
                label='신성'
                value={damageDivinity}
                onChangeValue={(val) => setDamageDivinity(val)}
              />
              <RowInputView
                label='치명'
                value={damageCritical}
                onChangeValue={(val) => setDamageCritical(val)}
              />
            </FormRow>

            <FormRow label='부가 효과'>
              <HorizontalInputWrapperView>
                <HorizontalInputView
                  value={sideEffectCorruption}
                  onChange={(val) => setSideEffectCorruption(val)}
                  placeholder='붉은 부패'
                />
                <HorizontalInputView
                  value={sideEffectFrozon}
                  onChange={(val) => setSideEffectFrozon(val)}
                  placeholder='동상'
                />
                <HorizontalInputView
                  value={sideEffectBleeding}
                  onChange={(val) => setSideEffectBleeding(val)}
                  placeholder='출혈'
                />
                <HorizontalInputView
                  value={sideEffectPoison}
                  onChange={(val) => setSideEffectPoison(val)}
                  placeholder='독'
                />
              </HorizontalInputWrapperView>
            </FormRow>

            <FormRow label='특수 기능'>
              <TextInput
                value={specialFunction}
                onChange={(val) => setSpecialFunction(val)}
                placeholder='특수 기능'
                rows={4}
              />
            </FormRow>

            <FormRow label='메모' sx={{ marginBottom: 0 }}>
              <TextInput
                value={memo}
                onChange={(val) => setMemo(val)}
                placeholder='메모'
                rows={4}
              />
            </FormRow>
          </Box>
        </ContentContainer>
      }

      { isDataLoadCmpl === false &&
        <BoxLoading />
      }

      { isSubmitLoadCmpl === false &&
        <FixedLoading />
      }
    </>
  );
};

function HorizontalInputWrapperView(
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

function HorizontalInputView(
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

function RowInputView(
  props: {
    label: string,
    value: string,
    onChangeValue: (val: string) => void
  }
) {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      sx={{
        marginBottom: '8px',
        '&:last-of-type': {
          marginBottom: 0
        }
      }}
    >
      <Typography
        fontSize={'0.875rem'}
        color={theme => theme.color.text.light}
        sx={{
          flexShrink: 0,
          width: 80
        }}
      >
        { props.label }
      </Typography>

      <Box sx={{ flex: 1 }}>
        <TextInput
          value={props.value}
          onChange={(val) => props.onChangeValue(val)}
          placeholder={props.label}
          onlyNumber
        />
      </Box>
    </Stack>
  );
};