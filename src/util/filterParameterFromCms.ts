import { LocaleDefault, LocaleOption } from "types";

export function filterParameters<
  T extends { [key: string]: LocaleOption<any> | LocaleDefault<string> }
>(list: T[] | undefined, key: keyof T, matchValue: string): T[] | undefined {
  return list?.filter((item) => {
    const keyValue = item[key];
    if (typeof keyValue === "object" && "en-US" in keyValue) {
      return keyValue["en-US"] === matchValue;
    }
    return false;
  });
}
