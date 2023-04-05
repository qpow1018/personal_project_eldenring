import {
  Stack,
  Typography
} from '@mui/material';

import BasicInput from './BasicInput';

export default function TextInput(
  props: {
    id?: string,
    value: string,
    onChange: (text: string) => void,
    placeholder?: string,
    suffixText?: string,
    onlyNumber?: boolean,
    rows?: number,
  }
) {
  return (
    <Stack
      direction={'row'}
      sx={[
        (theme => ({
          overflow: 'hidden',
          borderRadius: theme.style.borderRadius,
          border: `1px solid ${theme.color.border}`,
          width: '100%',
          height: theme.style.inputHeight
        })),
        props.rows !== undefined && {
          height: 'auto'
        }
      ]}
    >
      <BasicInput
        id={props.id}
        value={props.value}
        onChange={(val) => props.onChange(val)}
        placeholder={props.placeholder}
        onlyNumber={props.onlyNumber}
        rows={props.rows}
      />

      { props.suffixText !== undefined &&
        <Stack
          direction={'row'}
          alignItems={'center'}
          sx={theme => ({
            flexShrink: 0,
            paddingRight: `${theme.style.inputPadding}px`
          })}
        >
          <Typography
            fontSize={14}
            color={theme => theme.color.text.sub}
          >
            { props.suffixText }
          </Typography>
        </Stack>
      }
    </Stack>
  );
};

// export function getInputValueOnlyNumber(inputValue: string) : number {
//   const _inputValue = Number(inputValue.replaceAll(',', ''));
//   return _inputValue;
// }

// export function addCommaInputNumber(inputValue: string) : string {
//   let count = 1;
//   let reversed = '';
//   let newValue = '';
  
//   for (let i = inputValue.length - 1; i >= 0; --i) {
//     reversed += inputValue[i];

//     if (count % 3 === 0 && i > 0) {
//       reversed += ','
//     }

//     count ++;
//   }

//   for (let i = reversed.length - 1; i >= 0; --i) {
//     newValue += reversed[i];
//   }

//   return newValue;
// }

// export default function TextInputView(
//   props: {
//     id?: string,
//     value: string,
//     onChange: (text: string) => void,
//     placeholder?: string,
    
//     type?: 'number' | 'password',
//     // autoComplete?: 'on' | 'off',
//     // autoFocus?: boolean,
//     // disabled?: boolean,
//     maxNumber?: number,
//     maxLength?: number,
//     rows?: number,
//     onPressEnter?: () => void,
//     onKeyup?: React.KeyboardEventHandler<HTMLInputElement>,
//     prefixText?: string,
//     suffixText?: string,
//     searchIconPosition?: 'prefix' | 'suffix',
//     searchIconStyle?: FbInputIconStyle,
//     appendButtonText?: string,
//     onClickAppendButton?: () => void,
//     appendButtonDisabled?: boolean,
//     appendButtonStyle?: FbInputButtonStyle,
//     style?: FbInputStyle,
//     sx?: any
//   }
// ) {
//   const inputWrapperRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const onChangeInput = (inputValue: string) => {
//     if (props.type !== 'number') {
//       props.onChange(inputValue);
//     } else {
//       let _value = inputValue.replace(/[^0-9]/g, '');
//       _value = rejectFirstZeroAfterNumber(_value);
//       _value = limitMaxNumber(_value);
//       _value = addCommaInputNumber(_value);
//       props.onChange(_value);
//     }
//   }

//   // 첫번째가 0인데 두번째에 다른 숫자 못오게
//   function rejectFirstZeroAfterNumber(inputValue: string) : string {
//     if (inputValue[0] === '0' && 1 < inputValue.length) {
//       inputValue = inputValue.substring(1, inputValue.length);
//     }

//     return inputValue;
//   }

//   // 최대값 처리
//   function limitMaxNumber(inputValue: string) : string {
//     if (props.maxNumber === undefined || inputValue === '') return inputValue;

//     let _value = Number(inputValue);
//     if (props.maxNumber < _value) {
//       _value = props.maxNumber;
//     }

//     return String(_value);
//   }

//   // 멀티라인
//   let isMultiline = false;
//   if (props.rows !== undefined) {
//     isMultiline = true;
//   }

//   const inputFocus = () => {
//     if (inputRef.current !== null) {
//       inputRef.current.focus();
//     }
//   }

//   // 스타일 처리
//   const style = getInputStyle(props.style, isMultiline);
//   const defaultBorderColor = style.container.borderColor;
//   const activeBorderColor = style.activeBorderColor;
//   const [borderColor, setBorderColor] = useState<FbStyleString | undefined>(() => {
//     if (props.autoFocus === true) return activeBorderColor;
//     return defaultBorderColor;
//   });
//   useEffect(() => {
//     const inputElm = inputRef.current;
//     const inputWrapperElm = inputWrapperRef.current;
//     if (inputElm === null || inputWrapperElm === null || props.style?.removeBorder === true) return;

//     inputElm.addEventListener('focus', () => {
//       setBorderColor(activeBorderColor);
//     });

//     inputElm.addEventListener('blur', () => {
//       setBorderColor(defaultBorderColor);
//     });
//   }, [defaultBorderColor, activeBorderColor, props.style]);

//   const buttonStyle = getButtonStyle(props.appendButtonStyle);
//   const iconStyle = getIconStyle(props.searchIconStyle, props.searchIconPosition);

//   return (
//     <Stack
//       ref={inputWrapperRef}
//       direction={'row'}
//       sx={{
//         ...style.container,
//         borderColor: borderColor,
//         ...props.sx
//       }}
//     >
//       <AppendBoxView onClick={inputFocus}>
//         { props.prefixText !== undefined &&
//           <Typography
//             fontSize={'0.938rem'}
//             color={theme => theme.color.text.secondary}
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               paddingLeft: '14px',
//               width: 270,
//               height: '100%',
//               borderRightStyle: 'solid',
//               borderRightWidth: '1px',
//               borderRightColor: borderColor
//             }}
//           >
//             { props.prefixText }
//           </Typography>
//         }

//         { props.searchIconPosition === 'prefix' &&
//           <SearchIcon
//             sx={{ ...iconStyle }}
//           />
//         }
//       </AppendBoxView>

//       <InputBase
//         id={props.id}
//         inputRef={inputRef}
//         value={props.value}
//         onChange={(e) => onChangeInput(e.target.value)}
//         placeholder={props.placeholder}
//         spellCheck={'false'}
//         autoComplete={props.autoComplete}
//         autoFocus={props.autoFocus}
//         type={props.type !== 'password' ? 'text' : 'password'}
//         disabled={props.disabled}
//         inputProps={{
//           maxLength: props.maxLength
//         }}
//         multiline={isMultiline}
//         rows={props.rows}
//         onKeyUp={props.onKeyup}
//         onKeyPress={(e) => {
//           if (e.key === 'Enter') {
//             props.onPressEnter && props.onPressEnter();
//           }
//         }}
//         sx={{
//           width: '100%',
//           height: '100%',
//           '&.MuiInputBase-multiline': {
//             padding: 0
//           },
//           '& .MuiInputBase-input': {
//             ...style.input,
//             '&::placeholder': {
//               ...style.placeholder
//             },
//             '&.Mui-disabled': {
//               color: 'inherit',
//               WebkitTextFillColor: 'inherit'
//             }
//           },
//           '&.Mui-disabled': {
//             color: 'inherit',
//             WebkitTextFillColor: 'inherit'
//           }
//         }}
//       />

//       <AppendBoxView onClick={inputFocus}>
//         { props.suffixText !== undefined &&
//           <Typography
//             fontSize={style.input.fontSize}
//             fontWeight={400}
//             color={theme => theme.color.text.primary}
//             sx={{ paddingRight: style.input.paddingRight }}
//           >
//             { props.suffixText }
//           </Typography>
//         }

//         { props.searchIconPosition === 'suffix' &&
//           <SearchIcon
//             sx={{ ...iconStyle }}
//           />
//         }
//       </AppendBoxView>

//       { props.appendButtonText !== undefined &&
//         <ButtonBase
//           onClick={props.onClickAppendButton}
//           disabled={props.appendButtonDisabled}
//           sx={{
//             ...buttonStyle,
//             flexShrink: 0,
//             borderLeftColor: borderColor
//           }}
//         >
//           <Typography
//             variant='inner'
//             sx={{
//               flexShrink: 0,
//             }}
//           >
//             { props.appendButtonText }
//           </Typography>
//         </ButtonBase>
//       }
//     </Stack>
//   );
// };

// function AppendBoxView(
//   props: {
//     children: React.ReactNode,
//     onClick: () => void
//   }
// ) {
//   return (
//     <Stack
//       onClick={props.onClick}
//       direction={'row'}
//       alignItems={'center'}
//       sx={{
//         cursor: 'text',
//         flexShrink: 0,
//         height: '100%'
//       }}
//     >
//       { props.children }
//     </Stack>
//   );
// };