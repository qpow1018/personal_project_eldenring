import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Stack,
  Box,
  Typography,
  Tabs,
  Tab
} from '@mui/material';

import APIService from 'api/APIService';
import { ElEquipmentWeapon } from 'api/response-type';
import {
  addMiddleDot,
  getCategoryDisplayText,
  getWeaponTypeDisplayText
} from 'utils';
import { WeaponCategorys } from 'define';

import ContentContainer from 'components/ContentContainer';
import EmptyBox from 'components/EmptyBox';
import BoxLoading from 'components/Loading/BoxLoading';

import GoToFormButton from 'components/IconButton/GoToFormButton';

const WEAPON_CATEGORY_VALUE_ALL = 'all';

const WeaponCategoryTabs = [
  {
    code: WEAPON_CATEGORY_VALUE_ALL,
    displayText: '전체'
  },
  ...WeaponCategorys
]

export default function WeaponList() {
  const [isDataLoadCmpl, setIsDataLoadCmpl] = useState<boolean>(false);
  const [weapons, setWeapons] = useState<ElEquipmentWeapon[]>([]);
  const [displayWeapons, setDisplayWeapons] = useState<ElEquipmentWeapon[]>([]);
  const [activeTab, setActiveTab] = useState<string>(WEAPON_CATEGORY_VALUE_ALL);

  useEffect(() => {
    getEquipmentWeaponsFromServer();
  }, []);

  const getEquipmentWeaponsFromServer = async () => {
    try {
      const resData = await APIService.weapon.getList();
      setWeapons(resData);
      setIsDataLoadCmpl(true);

    } catch (error) {
      console.error('getEquipmentWeaponFromServer', error);
      alert('데이터 로딩 오류');
    }
  }

  useEffect(() => {
    const allList = [ ...weapons ];

    if (activeTab === WEAPON_CATEGORY_VALUE_ALL) {
      setDisplayWeapons(allList);
    } else {
      const filterList = allList.filter(item => item.category === activeTab);
      setDisplayWeapons(filterList);
    }
  }, [weapons, activeTab]);

  return (
    <ContentContainer
      title={`무기 목록 (${weapons.length})`}
      rightView={
        <GoToFormButton link='/weapon/create' />
      }
    >
      { isDataLoadCmpl === true &&
        <>
          <Stack
            sx={theme => ({
              borderBottom: `1px solid ${theme.color.border}`
            })}
          >
            <Tabs
              value={activeTab}
              variant='scrollable'
              orientation='horizontal'
              scrollButtons='auto'
            >
              { WeaponCategoryTabs.map((item, index) =>
                <Tab
                  key={index}
                  onClick={() => setActiveTab(item.code)}
                  value={item.code}
                  label={item.displayText}
                  sx={{
                    minWidth: 'unset',
                    padding: '0 16px',
                    height: 60,
                    color: '#fff',
                    fontWeight: 400,
                    '&.Mui-selected': {
                      fontWeight: 700
                    }
                  }}
                />
              )}
            </Tabs>
          </Stack>

          { 0 < displayWeapons.length ? (
            displayWeapons.map((item, index) =>
              <WeaponItemView
                key={index}
                item={item}
              />
            )
          ) : (
            <EmptyBox />
          )}
        </>
      }

      { isDataLoadCmpl === false &&
        <BoxLoading />
      }
    </ContentContainer>
  );
};

function WeaponItemView(
  props: {
    item: ElEquipmentWeapon
  }
) {
  const { item } = props;

  const bottomText = getBottomText();
  function getBottomText(): string {
    const textArr = [];
    const weaponType = getWeaponTypeDisplayText(item.weaponType);
    textArr.push(weaponType);

    if (item.skillId !== null) {
      const skillName = item.skillName;
      textArr.push(skillName);
    }

    return addMiddleDot(textArr);
  }

  return (
    <Link to={`/weapon/${item.id}`}>
      <Box
        sx={theme => ({
          position: 'relative',
          padding: '16px',
          borderBottom: `4px solid ${theme.color.border}`
        })}
      >
        <Box sx={{ marginBottom: '12px' }}>
          <Typography
            fontSize={13}
            fontWeight={500}
            color={theme => theme.color.pri.main}
            sx={{ marginBottom: '2px' }}
          >
            { getCategoryDisplayText(item.category) }
          </Typography>
          <Typography
            fontSize={15}
            fontWeight={700}
          >
            { item.name }
          </Typography>
        </Box>

        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={theme => ({
            fontSize: 13,
            color: theme.color.text.light,
          })}
        >
          <Typography variant='inner'>
            { bottomText }
          </Typography>
        </Stack>
      </Box>
    </Link>
  );
};