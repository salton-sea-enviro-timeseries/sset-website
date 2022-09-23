import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { makeStyles } from "@material-ui/core/styles";
import { useAppContext } from "components/AppContext";

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

const AboutSaltonSeaSection = ({ content: { body, title } }: Props) => {
  const classes = useStyles();
  // @ts-ignore
  const { language } = useAppContext();
  const bodyText =
    body[language === "en" ? "en-US" : "es"].content[0].content[0].value;

  return (
    <Section bgImage="/curves.png">
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
export default AboutSaltonSeaSection;
