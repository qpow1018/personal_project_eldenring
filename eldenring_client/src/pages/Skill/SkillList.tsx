import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Stack,
  Box,
  Typography
} from '@mui/material';

import APIService from 'api/APIService';
import { ElSkill } from 'api/response-type';
import { getDeteriorationTypeDisplayText } from 'utils';

import ContentContainer from 'components/ContentContainer';
import EmptyBox from 'components/EmptyBox';
import BoxLoading from 'components/Loading/BoxLoading';

import GoToFormButton from 'components/IconButton/GoToFormButton';

export default function SkillList() {
  const [isDataLoadCmpl, setIsDataLoadCmpl] = useState<boolean>(false);
  const [skillList, setSkillList] = useState<ElSkill[]>([]);

  useEffect(() => {
    getSkillListFromServer();
  }, []);

  const getSkillListFromServer = async () => {
    try {
      const resData = await APIService.skill.getList();
      setSkillList(resData);
      setIsDataLoadCmpl(true);

    } catch (error) {
      console.error('getSkillListFromServer', error);
      alert('데이터 로딩 오류');
    }
  }

  return (
    <ContentContainer
      title={`전회 (${skillList.length})`}
      rightView={
        <GoToFormButton link='/skill/create' />
      }
    >
      { isDataLoadCmpl === true &&
        <>
          { 0 < skillList.length ? (
            skillList.map((item, index) =>
              <SkillItemView
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

function SkillItemView(
  props: {
    item: ElSkill
  }
) {
  const { item } = props;

  return (
    <Link to={`/skill/${item.id}`}>
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
            {
              item.deteriorationType !== null
              ? getDeteriorationTypeDisplayText(item.deteriorationType)
              : '-'
            }
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
          <Typography
            variant='inner'
            sx={{ whiteSpace: 'pre-line' }}
            className={'text-cut-1'}
          >
            { item.description || '-' }
          </Typography>
        </Stack>
      </Box>
    </Link>
  );
};