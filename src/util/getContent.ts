import { get } from "lodash";
import { Language } from "types";
import content from "../content.json";

export const getContent = (language: Language, path: string) => {
  return get(content[language], path);
};
