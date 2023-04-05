import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';

export default function useAppbarInfo() {
  const appbarInfo = useSelector((state: RootState) => state.appbarReducer);

  return {
    pageTitle: appbarInfo.pageTitle,
    rightButtonLink: appbarInfo.rightButtonLink
  };
};