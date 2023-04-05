import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Stack,
  Box,
  Typography
} from '@mui/material';

import APIService from 'api/APIService';
import { ElMagic } from 'api/response-type';

import ContentContainer from 'components/ContentContainer';
import EmptyBox from 'components/EmptyBox';
import BoxLoading from 'components/Loading/BoxLoading';

import GoToFormButton from 'components/IconButton/GoToFormButton';

export default function MagicList() {
  const [isDataLoadCmpl, setIsDataLoadCmpl] = useState<boolean>(false);
  const [magicList, setMagicList] = useState<ElMagic[]>([]);

  useEffect(() => {
    getMagicListFromServer();
  }, []);

  const getMagicListFromServer = async () => {
    try {
      const resData = await APIService.magic.getList();
      setMagicList(resData);
      setIsDataLoadCmpl(true);

    } catch (error) {
      console.error('getMagicListFromServer', error);
      alert('데이터 로딩 오류');
    }
  }

  return (
    <ContentContainer
      title={`마술 (${magicList.length})`}
      rightView={
        <GoToFormButton link='/magic/create' />
      }
    >
      { isDataLoadCmpl === true &&
        <>
          { 0 < magicList.length ? (
            magicList.map((item, index) =>
              <MagicItemView
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

function MagicItemView(
  props: {
    item: ElMagic
  }
) {
  const { item } = props;

  return (
    <Link to={`/magic/${item.id}`}>
      <Box
        sx={theme => ({
          position: 'relative',
          padding: '16px',
          borderBottom: `4px solid ${theme.color.border}`
        })}
      >
        <Box sx={{ marginBottom: '12px' }}>
          <Typography
            fontSize={15}
            fontWeight={700}
          >
            { item.name }
          </Typography>
          <Typography
            fontSize={13}
            color={theme => theme.color.text.light}
            sx={{ marginTop: '2px' }}
          >
            소모 FP. { item.consumeFp || '-' }
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