import { useContext, useMemo } from 'react'
import { SnackbarContext, ElSnackBar } from 'components/SnackbarProvider';

const useSnackbar = () => {
  const snackbarContext = useContext(SnackbarContext)

  const snackbar: ElSnackBar = useMemo(() => {
    return snackbarContext;
  }, [snackbarContext]);

  return snackbar
}

export default useSnackbar;