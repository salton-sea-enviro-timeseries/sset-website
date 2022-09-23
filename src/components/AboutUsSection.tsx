import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";

import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { getContent } from "util/getContent";
import { useAppContext } from "components/AppContext";

// TODO: add links to definitions
// or add a glossary section ???

type BodyValues = { content: [{ value: string }] };
type NestedObjBodyText = { content: [BodyValues] };
type LocaleOption<T> = {
  "en-US": T;
  es: T;
};
type Props = {
  content: {
    body: LocaleOption<NestedObjBodyText>;
    title: LocaleOption<string>;
  };
};

const AboutUsSection = ({ content: { body, title } }: Props) => {
  const classes = useStyles();
  // @ts-ignore
  const { language } = useAppContext();
  const bodyText =
    body[language === "en" ? "en-US" : "es"].content[0].content[0].value;
  return (
    <Section
      style={{
        backgroundColor: colors.teal[50]
      }}
    >
      <Container>
        <Box>
          <SectionHeader
            title={language === "en" ? title["en-US"] : title["es"]}
            titleProps={{
              align: "center",
              className: classes.header,
              display: "inline"
            }}
            display="flex"
            justifyContent="center"
            size={4}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: bodyText
            }}
          />
        </Box>
      </Container>
    </Section>
  );
};
const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: `inset 0 -5px 0 ${theme.palette.secondary.light}`
  }
}));
export default AboutUsSection;
