import {
  useReducer,
  ReactNode,
  createContext,
  useContext,
  useEffect,
} from 'react';
import en from '../i18n/en.json';
import es from '../i18n/es.json';
import pt from '../i18n/pt.json';
/*********** date-fns **************/
import enLocale from 'date-fns/locale/en-US';
import ptLocale from 'date-fns/locale/pt-BR';
import esLocale from 'date-fns/locale/es';

type localeType = {
  [key: string]: Locale;
};

const localeMap: localeType = {
  EN: enLocale,
  ES: esLocale,
  PT: ptLocale,
};

export { localeMap };
/************************************/

enum LangActionType {
  SET_LANGUAGE = 'SET_LANGUAGE',
}

interface LangState {
  language: string;
}

interface SetLanguageAction {
  type: typeof LangActionType.SET_LANGUAGE;
  payload: string;
}

interface ContextProps {
  state: LangState;
  dispatch: {
    setLanguage: (lang: string) => void;
    translate: (key: string) => string;
  };
}

const langReducer = (
  state: LangState,
  action: SetLanguageAction
): LangState => {
  switch (action.type) {
    case LangActionType.SET_LANGUAGE:
      return {
        language: action.payload,
      };
    default:
      return state;
  }
};

const localStorageLang = localStorage.getItem('language');

const navigatorLang = () => {
  let lang = navigator.language;
  if (lang.toLowerCase().includes('en')) {
    return 'EN';
  } else if (lang.toLowerCase().includes('es')) {
    return 'ES';
  } else if (lang.toLowerCase().includes('pt')) {
    return 'PT';
  }
  return 'EN';
};

const initialState = {
  language: localStorageLang ? localStorageLang : navigatorLang(),
};

export const LangContext = createContext({} as ContextProps);

export const useLanguage = () => useContext(LangContext);

interface LangStateProps {
  children: ReactNode;
}

const LanguageProvider = ({ children }: LangStateProps) => {
  const [state, dispatch] = useReducer(langReducer, initialState);

  const setLanguage = (lang: string) => {
    localStorage.setItem('language', lang);
    dispatch({
      type: LangActionType.SET_LANGUAGE,
      payload: lang,
    });
  };

  useEffect(() => {
    setLanguage(state.language);
  }, []);

  const translate = (key: string): string => {
    const { language } = state;
    let langData: { [key: string]: string } = {};

    if (language.toLowerCase().includes('en')) {
      langData = en;
    } else if (language.toLowerCase().includes('es')) {
      langData = es;
    } else if (language.toLowerCase().includes('pt')) {
      langData = pt;
    }

    return langData[key];
  };

  return (
    <LangContext.Provider
      value={{ state, dispatch: { setLanguage, translate } }}
    >
      {children}
    </LangContext.Provider>
  );
};

export default LanguageProvider;
