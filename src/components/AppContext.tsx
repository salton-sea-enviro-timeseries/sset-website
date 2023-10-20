import * as React from "react";
import { Language } from "types";
import useLocalStorage from "./useLocalStorage";

interface AppContextInterface {
  language: Language;
  setLanguage: (language: Language) => void;
  width: string;
  setWidth: (width: string) => void;
}

export const AppContext = React.createContext<AppContextInterface | null>({
  language: "en",
  setLanguage: () => {},
  width: "100%",
  setWidth: () => {}
});

const AppContextProvider: React.FC = (props) => {
  const [language, setLanguage] = useLocalStorage<Language>("language", "en");
  const [width, setWidth] = React.useState<string>("100%");

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        width,
        setWidth
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
