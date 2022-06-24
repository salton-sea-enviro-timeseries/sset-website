import React from "react";

import { getContent } from "util/getContent";
import { useAppContext } from "components/AppContext";
import { Typography, TypographyProps } from "@material-ui/core";

interface TranslationProps extends TypographyProps {
  component?: React.ElementType;
  children?: React.ReactNode;
  propsToTranslate?: {
    [prop: string]: string;
  };
  path: string;
}

export default function Translation({
  path,
  children,
  propsToTranslate,
  ...props
}: TranslationProps) {
  // @ts-ignore
  const { language } = useAppContext();
  const content = React.useMemo(
    () => getContent(language, path),
    [language, path]
  );

  if (!content) {
    console.warn(`Translation not found for path: ${path}`);
    return null;
  }

  if (children) {
    // translate props if the are provided
    const translatedProps: { [prop: string]: string } = {};
    if (propsToTranslate) {
      Object.keys(propsToTranslate).forEach((key) => {
        translatedProps[key] = getContent(language, propsToTranslate[key]);
      });
    }

    // return children with content as props
    return React.cloneElement(children as React.ReactElement, {
      ...translatedProps,
      children: content
    });
  }

  return (
    <Typography
      {...props}
      dangerouslySetInnerHTML={{
        __html: getContent(language, path)
      }}
    />
  );
}
