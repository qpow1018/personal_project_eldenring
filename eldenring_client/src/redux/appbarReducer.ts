const SET_PAGE_APPBAR = 'SET_PAGE_APPBAR' as const;

export const setPageAppbar = (data: { pageTitle: string, rightButtonLink?: string }) => ({
  type: SET_PAGE_APPBAR,
  payload: data
});

type AppbarAction = ReturnType<typeof setPageAppbar>;

type AppbarState = {
  pageTitle: string,
  rightButtonLink?: string
};

const initialState: AppbarState = {
  pageTitle: ''
};

function appbarReducer(
  state: AppbarState = initialState,
  action: AppbarAction
): AppbarState {
  switch (action.type) {
    case SET_PAGE_APPBAR:
      return {
        pageTitle: action.payload.pageTitle,
        rightButtonLink: action.payload.rightButtonLink
      };
    default:
      return state;
  }
}

export default appbarReducer;