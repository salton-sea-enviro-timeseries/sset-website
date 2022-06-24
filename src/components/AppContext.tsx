import * as React from "react";
import { Language } from "types";
import useLocalStorage from "./useLocalStorage";

interface AppContextInterface {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const AppContext = React.createContext<AppContextInterface | null>(null);

const AppContextProvider: React.FC = (props) => {
  const [language, setLanguage] = useLocalStorage<Language>("language", "en");
  // const [language, setLanguage] = React.useState<Language>("en");

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return React.useContext(AppContext);
}

export default AppContextProvider;
