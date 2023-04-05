import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import APIService from 'api/APIService';
import { ElPray } from 'api/response-type';
import { ElSubmitPray } from 'api/request-type';
import { FormPageType } from 'define';
import useSnackbar from 'hook/useSnackbar';
import {
  changeBlankToStringOrNull,
  changeBlankToNumberOrNull,
  changeNullToBlank
} from 'utils';
import FormValidator from 'utils/FormValidator';

import ContentContainer from 'components/ContentContainer';
import BoxLoading from 'components/Loading/BoxLoading';
import FixedLoading from 'components/Loading/FixedLoading';
import FormRow from 'components/Form/FormRow';
import TextInput from 'components/Form/TextInput';
import { HorizontalInputWrapper, HorizontalInput } from 'components/Form/HorizontalInput';
import Button from 'components/Button';

export default function PrayForm(
  props: {
    pageType: FormPageType
  }
) {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { prayId } = useParams();
  const { pageType } = props;

  const [isDataLoadCmpl, setIsDataLoadCmpl] = useState<boolean>(false);
  const [isSubmitLoadCmpl, setIsSubmitLoadCmpl] = useState<boolean>(true);
  const [prayInfo, setPrayInfo] = useState<ElPray | null>(null);
  const [name, setName] = useState<string>('');
  const [consumeFp, setConsumeFp] = useState<string>('');
  const [useSlot, setUseSlot] = useState<string>('');
  const [reqStatusStr, setReqStatusStr] = useState<string>('');
  const [reqStatusDex, setReqStatusDex] = useState<string>('');
  const [reqStatusInt, setReqStatusInt] = useState<string>('');
  const [reqStatusFaith, setReqStatusFaith] = useState<string>('');
  const [reqStatusArc, setReqStatusArc] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [memo, setMemo] = useState<string>('');

  useEffect(() => {
    if (pageType === FormPageType.create) {
      setIsDataLoadCmpl(true);

    } else if (pageType === FormPageType.update) {
      const _prayId = Number(prayId);
      getPrayIdDetailFromServer(_prayId);

    }
  }, [pageType, prayId]);

  const getPrayIdDetailFromServer = async (prayId: number) => {
    try {
      const resData = await APIService.pray.getDetail(prayId);
      setPrayInfo(resData);

    } catch (error) {
      console.error('getPrayIdDetailFromServer', error);
      alert('getPrayIdDetailFromServer Error!');
    }
  }

  useEffect(() => {
    if (prayInfo !== null) {
      const item = prayInfo;

      setName(item.name);
      setConsumeFp(changeNullToBlank(item.consumeFp));
      setUseSlot(changeNullToBlank(item.useSlot));
      setReqStatusStr(changeNullToBlank(item.reqStatusStr));
      setReqStatusDex(changeNullToBlank(item.reqStatusDex));
      setReqStatusInt(changeNullToBlank(item.reqStatusInt));
      setReqStatusFaith(changeNullToBlank(item.reqStatusFaith));
      setReqStatusArc(changeNullToBlank(item.reqStatusArc));
      setDescription(changeNullToBlank(item.description));
      setMemo(changeNullToBlank(item.memo));

      setIsDataLoadCmpl(true);
    }
  }, [prayInfo]);

  const onSubmit = () => {
    const nameValidator = new FormValidator(name).required('이름을 입력하세요.').check();
    if (nameValidator.pass === false) {
      snackbar.error(nameValidator.errorMsg);
      return;
    }

    const params: ElSubmitPray = {
      name: name,
      consumeFp: changeBlankToNumberOrNull(consumeFp),
      useSlot: changeBlankToNumberOrNull(useSlot),
      reqStatusStr: changeBlankToNumberOrNull(reqStatusStr),
      reqStatusDex: changeBlankToNumberOrNull(reqStatusDex),
      reqStatusInt: changeBlankToNumberOrNull(reqStatusInt),
      reqStatusFaith: changeBlankToNumberOrNull(reqStatusFaith),
      reqStatusArc: changeBlankToNumberOrNull(reqStatusArc),
      description: changeBlankToStringOrNull(description),
      memo: changeBlankToStringOrNull(memo)
    }

    setIsSubmitLoadCmpl(false);
    submitPrayFromServer(params);
  }

  const submitPrayFromServer = async (params: ElSubmitPray) => {
    try {
      if (pageType === FormPageType.create) {
        await APIService.pray.insert(params);
        snackbar.success('기도 등록이 완료되었습니다.');

        setIsSubmitLoadCmpl(true);

        navigate('/pray');

      } else if (pageType === FormPageType.update) {
        await APIService.pray.update(Number(prayId), params);
        snackbar.success('기도 수정이 완료되었습니다.');

        setIsSubmitLoadCmpl(true);

        navigate(`/pray/${prayId}`, { replace: true });

      }
    } catch (error) {
      console.error('submitPrayFromServer', error);
      snackbar.error('작업을 완료하지 못했습니다.');
      setIsSubmitLoadCmpl(true);
    }
  }

  return (
    <>
      { isDataLoadCmpl === true &&
        <ContentContainer
          title={pageType === FormPageType.create ? '기도 정보 등록' : '기도 정보 수정'}
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

            <FormRow label='소모 FP'>
              <TextInput
                value={consumeFp}
                onChange={(val) => setConsumeFp(val)}
                placeholder='소모 FP'
                onlyNumber
              />
            </FormRow>

            <FormRow label='사용 슬롯수'>
              <TextInput
                value={useSlot}
                onChange={(val) => setUseSlot(val)}
                placeholder='사용 슬롯수'
                onlyNumber
              />
            </FormRow>

            <FormRow label='필요 요구치'>
              <HorizontalInputWrapper>
                <HorizontalInput
                  value={reqStatusStr}
                  onChange={(val) => setReqStatusStr(val)}
                  placeholder='근력'
                />
                <HorizontalInput
                  value={reqStatusDex}
                  onChange={(val) => setReqStatusDex(val)}
                  placeholder='기력'
                />
                <HorizontalInput
                  value={reqStatusInt}
                  onChange={(val) => setReqStatusInt(val)}
                  placeholder='지력'
                />
                <HorizontalInput
                  value={reqStatusFaith}
                  onChange={(val) => setReqStatusFaith(val)}
                  placeholder='신앙'
                />
                <HorizontalInput
                  value={reqStatusArc}
                  onChange={(val) => setReqStatusArc(val)}
                  placeholder='신비'
                />
              </HorizontalInputWrapper>
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