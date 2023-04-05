import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import BottomNavigationBar from 'components/BottomNavigationBar';

export default function RootContainer() {
  return (
    <Stack
      sx={theme => ({
        width: '100%',
        minHeight: '100vh',
        paddingBottom: `${theme.style.bottomNavigationBarHeight}px`,
        backgroundColor: theme.color.black
      })}
    >
      <Outlet />

      <BottomNavigationBar />
    </Stack>
  );
};