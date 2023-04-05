import { Link } from 'react-router-dom';
import {
  Stack,
  Box,
  Typography
} from '@mui/material';

import {
  Colorize as WeaponIcon,
  Games as SkillIcon,
  ElectricBolt as MagicIcon,
  SelfImprovement as PrayIcon
} from '@mui/icons-material';

type ElMenu = {
  link: string,
  displayText: string,
  icon: React.ReactNode
}

const iconSizeProps = {
  fontSize: 'inherit'
}

const Menus: ElMenu[] = [
  {
    link: '/weapon',
    displayText: '무기',
    icon: <WeaponIcon sx={{ ...iconSizeProps }} />
  },
  {
    link: '/skill',
    displayText: '전회',
    icon: <SkillIcon sx={{ ...iconSizeProps }} />
  },
  {
    link: '/magic',
    displayText: '마술',
    icon: <MagicIcon sx={{ ...iconSizeProps }} />
  },
  {
    link: '/pray',
    displayText: '기도',
    icon: <PrayIcon sx={{ ...iconSizeProps }} />
  }
];

export default function BottomNavigationBar() {
  return (
    <Stack
      direction={'row'}
      sx={theme => ({
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: theme.style.bottomNavigationBarHeight,
        backgroundColor: theme.color.background
      })}
    >
      { Menus.map((item, index) =>
        <Box
          key={index}
          sx={{
            flex: 1,
            height: '100%'
          }}
        >
          <Link to={item.link}>
            <Stack
              alignItems={'center'}
              justifyContent={'center'}
              sx={{ height: '100%' }}
            >
              <Box
                sx={theme => ({
                  marginBottom: '4px',
                  color: theme.color.text.main,
                  fontSize: '20px'
                })}
              >
                { item.icon }
              </Box>

              <Typography
                fontSize={12}
              >
                { item.displayText }
              </Typography>
            </Stack>
          </Link>
        </Box>
      )}
    </Stack>
  );
};

// function SideBarView(
//   props: {
//     isOpen: boolean,
//     onClose: () => void
//   }
// ) {
//   return (
//     <Drawer
//       anchor={'left'}
//       open={props.isOpen}
//       onClose={props.onClose}
//       PaperProps={{
//         sx: {
//           width: 280
//         }
//       }}
//     >
//       <Box
//         sx={{
//           padding: '8px 0',
//           borderBottom: '1px solid #e5e5e5'
//         }}
//       >
//         { Menus.map((item, index) =>
//           <Link
//             key={index}
//             to={item.link}
//           >
//             <ButtonBase
//               sx={{
//                 justifyContent: 'flex-start',
//                 width: '100%',
//                 height: 40,
//                 padding: '0 20px',
//               }}
//             >
//               <Typography
//                 fontSize={'0.938rem'}
//                 fontWeight={700}
//                 color={'#616161'}
//               >
//                 { item.displayText }
//               </Typography>
//             </ButtonBase>
//           </Link>
//         )}
//       </Box>

//       <Box>
//         <Box>기타 기능 생각</Box>
//         <Box>빌드</Box>
//         <Box>퀘스트라인</Box>
//         <Box>지도</Box>
//       </Box>

//       <Box>
//         <Box>추가 연습</Box>

//         <Box>snackbar, context, hook, 리덕스</Box>
//         <Box>
//           DOMAIN
//           개발환경, 배포환경 구분
//           {/* export const DOMAIN: string = process.env.REACT_APP_SERVER_API_DOMAIN; */}
//           {/* if (process.env.NODE_ENV !== 'production') {
//               console.log(`\n👉      url - ${url}`);
//               console.log(`      token - ${axiosInst.defaults.headers.common['Authorization']}`);
//               console.info(`       body - `, reqData);
//               console.log('\n')
//           } */}
          
//           토큰관리
//           {/* export function setAccessToken(accessToken: string) {
//               axiosInst.defaults.headers.common['Authorization'] = accessToken;
//           }
//           export function removeAccesToken() {
//               delete axiosInst.defaults.headers.common['Authorization'];
//           } */}
//           {/* const CancelToken = axios.CancelToken;
//           const source = CancelToken.source(); */}
          
//           FormData, 파일 관리, 업로드 등 (멀티파트) FormData
//           {/* multipart(formData: FormData): APIRequestBuilder {
//               this._isFormData = true;
//               this._formData = formData;
//               return this;
//           } */}
          
//           ServerDefinedError
//           {/* export type ServerDefinedError = {
//               code: number,
//               detailMessage: string,
//               msg: string
//           };
//           export function isServerDefinedError(data: any): boolean {
//               return data !== undefined && data !== null 
//                   && typeof data.code === 'number'
//                   && typeof data.msg === 'string'
//                   && typeof data.detailMessage === 'string'
//           } */}
//           {/* axios.isAxiosError(error) */}
          
//           타입스크립트 제네릭 / 프로토타입
//         </Box>
//       </Box>
//     </Drawer>
//   );
// };