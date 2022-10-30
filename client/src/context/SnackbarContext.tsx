import { useReducer, ReactNode, createContext, useContext } from 'react';
import { useLanguage } from '../context/LanguageContext';

enum SnackbarActionType {
  SET_SNACKBAR = 'SET_SNACKBAR',
}

interface SnackbarState {
  open: boolean;
  message: string;
}

export const initialState: SnackbarState = {
  open: false,
  message: '',
};

interface SetSnackbarAction {
  type: typeof SnackbarActionType.SET_SNACKBAR;
  payload: SnackbarState;
}

interface ContextProps {
  state: SnackbarState;
  dispatch: {
    setSnackbar: (open: boolean, message: string) => void;
    errorSnackbar: () => void;
    resetSnackbar: () => void;
  };
}

const snackbarReducer = (
  state: SnackbarState,
  action: SetSnackbarAction
): SnackbarState => {
  switch (action.type) {
    case SnackbarActionType.SET_SNACKBAR:
      return {
        open: action.payload.open,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export const SnackbarContext = createContext({} as ContextProps);

export const useSnackbar = () => useContext(SnackbarContext);

interface SnackbarStateProps {
  children: ReactNode;
}

const SnackbarProvider = ({ children }: SnackbarStateProps) => {
  const {
    dispatch: { translate },
  } = useLanguage();

  const [state, dispatch] = useReducer(snackbarReducer, initialState);

  const setSnackbar = (open: boolean, message: string) => {
    dispatch({
      type: SnackbarActionType.SET_SNACKBAR,
      payload: { open, message },
    });
  };

  const resetSnackbar = () => {
    setSnackbar(false, '');
  };

  const errorSnackbar = () => {
    setSnackbar(true, translate('somethingWentWrong'));
  };

  return (
    <SnackbarContext.Provider
      value={{ state, dispatch: { setSnackbar, errorSnackbar, resetSnackbar } }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
