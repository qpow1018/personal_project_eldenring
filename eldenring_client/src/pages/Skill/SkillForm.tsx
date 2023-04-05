import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import APIService from 'api/APIService';
import { ElSkill } from 'api/response-type';
import { ElSubmitSkill } from 'api/request-type';
import {
  FormPageType,
  DeteriorationTypes,
  WeaponCategorys
} from 'define';
import useSnackbar from 'hook/useSnackbar';
import {
  changeBlankToStringOrNull,
  changeNullToBlank
} from 'utils';
import FormValidator from 'utils/FormValidator';

import ContentContainer from 'components/ContentContainer';
import BoxLoading from 'components/Loading/BoxLoading';
import FixedLoading from 'components/Loading/FixedLoading';
import FormRow from 'components/Form/FormRow';
import TextInput from 'components/Form/TextInput';
import Select from 'components/Form/Select';
import Button from 'components/Button';
import ToggleButton from 'components/ToggleButton';

type ElWeaponCategoryMenu = {
  code: string,
  displayText: string,
  isAvailable: boolean
}

const WeaponCategoryMenus = WeaponCategorys.map(item => {
  return {
    ...item,
    isAvailable: false
  }
});

export default function SkillForm(
  props: {
    pageType: FormPageType
  }
) {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { skillId } = useParams();
  const { pageType } = props;

  const [isDataLoadCmpl, setIsDataLoadCmpl] = useState<boolean>(false);
  const [isSubmitLoadCmpl, setIsSubmitLoadCmpl] = useState<boolean>(true);
  const [skillInfo, setSkillInfo] = useState<ElSkill | null>(null);
  const [name, setName] = useState<string>('');
  const [deteriorationType, setDeteriorationType] = useState<string>('');
  const [weaponCategory, setWeaponCategory] = useState<ElWeaponCategoryMenu[]>(WeaponCategoryMenus);
  const [description, setDescription] = useState<string>('');
  const [memo, setMemo] = useState<string>('');

  useEffect(() => {
    if (pageType === FormPageType.create) {
      setIsDataLoadCmpl(true);

    } else if (pageType === FormPageType.update) {
      const _skillId = Number(skillId);
      getSkillDetailFromServer(_skillId);

    }
  }, [pageType, skillId]);

  const getSkillDetailFromServer = async (skillId: number) => {
    try {
      const resData = await APIService.skill.getDetail(skillId);
      setSkillInfo(resData);

    } catch (error) {
      console.error('getSkillDetailFromServer', error);
      alert('getSkillDetailFromServer Error!');
    }
  }

  useEffect(() => {
    if (skillInfo !== null) {
      const item = skillInfo;

      setName(item.name);
      setDeteriorationType(changeNullToBlank(item.deteriorationType));

      const updateList = WeaponCategoryMenus.map(e => {
        if (item.availableWeaponCategory.includes(e.code)) {
          e.isAvailable = true;
        }
        return e;
      });
      setWeaponCategory(updateList);

      setDescription(changeNullToBlank(item.description));
      setMemo(changeNullToBlank(item.memo));

      setIsDataLoadCmpl(true);
    }
  }, [skillInfo]);

  const toggleAvailableWeaponCategory = (index: number) => {
    const updateList = [ ...weaponCategory ];
    updateList[index] = {
      ...updateList[index],
      isAvailable: !updateList[index].isAvailable
    }
    setWeaponCategory(updateList);
  }

  const onSubmit = () => {
    const nameValidator = new FormValidator(name).required('이름을 입력하세요.').check();
    if (nameValidator.pass === false) {
      snackbar.error(nameValidator.errorMsg);
      return;
    }

    const availableWeaponCategorys = weaponCategory.filter(item => item.isAvailable === true);
    const availableWeaponCategorysCode = availableWeaponCategorys.map(item => item.code);

    const params: ElSubmitSkill = {
      name: name,
      deteriorationType: changeBlankToStringOrNull(deteriorationType),
      availableWeaponCategory: availableWeaponCategorysCode,
      description: changeBlankToStringOrNull(description),
      memo: changeBlankToStringOrNull(memo)
    }

    setIsSubmitLoadCmpl(false);
    submitSkillFromServer(params);
  }

  const submitSkillFromServer = async (params: ElSubmitSkill) => {
    try {
      if (pageType === FormPageType.create) {
        await APIService.skill.insert(params);
        snackbar.success('전회 등록이 완료되었습니다.');

        setIsSubmitLoadCmpl(true);

        navigate('/skill');

      } else if (pageType === FormPageType.update) {
        await APIService.skill.update(Number(skillId), params);
        snackbar.success('전회 수정이 완료되었습니다.');

        setIsSubmitLoadCmpl(true);

        navigate(`/skill/${skillId}`, { replace: true });

      }
    } catch (error) {
      console.error('submitSkillFromServer', error);
      snackbar.error('작업을 완료하지 못했습니다.');
      setIsSubmitLoadCmpl(true);
    }
  }

  return (
    <>
      { isDataLoadCmpl === true &&
        <ContentContainer
          title={pageType === FormPageType.create ? '전회 정보 등록' : '전회 정보 수정'}
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

            <FormRow label='기본 속성'>
              <Select
                menus={DeteriorationTypes}
                value={deteriorationType}
                onChange={(val) => setDeteriorationType(String(val))}
                placeholder='기본 속성'
              />
            </FormRow>

            <FormRow label='사용 가능 무기'>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  columnGap: '12px',
                  rowGap: '12px'
                }}
              >
                { weaponCategory.map((item, index) =>
                  <ToggleButton
                    key={index}
                    onClick={() => toggleAvailableWeaponCategory(index)}
                    isActive={item.isAvailable}
                  >
                    { item.displayText }
                  </ToggleButton>
                )}
              </Box>
            </FormRow>

            <FormRow label='설명'>
              <TextInput
                value={description}
                onChange={(val) => setDescription(val)}
                placeholder='설명'
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