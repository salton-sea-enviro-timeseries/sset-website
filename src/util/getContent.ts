import { get } from "lodash";
import { Language } from "types";
import content from "../content.json";
import contact from "../../__store__/pages/contact.json";
import dashboard from "../../__store__/pages/dashboard.json";
import home from "../../__store__/pages/home.json";
import parameters from "../../__store__/parameters.json";
import site from "../../__store__/site.json";

const Store = {
  pages: {
    contact,
    dashboard,
    home
  },
  parameters,
  site
};

export const getContent = (path: string) => {
  return get(Store, path);
};
