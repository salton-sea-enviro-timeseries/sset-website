import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { NestedObjBodyText, LocaleOption } from "util/getCmsContent";
// TODO: add links to definitions
// or add a glossary section ???

type Props = {
  content: {
    body: LocaleOption<NestedObjBodyText>;
    title: LocaleOption<string>;
  };
  locale: string;
};

const AboutUsSection = ({ content: { body, title }, locale }: Props) => {
  const classes = useStyles();
  const bodyText =
    body[locale as keyof LocaleOption<NestedObjBodyText>].content[0].content[0]
      .value;
  return (
    <Section
      style={{
        backgroundColor: colors.teal[50]
      }}
    >
      <Container>
        <Box>
          <SectionHeader
            title={title[locale as keyof LocaleOption<NestedObjBodyText>]}
            titleProps={{
              align: "center",
              className: classes.header,
              display: "inline"
            }}
            display="flex"
            justifyContent="center"
            size={4}
          />

          <Typography>{bodyText}</Typography>
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
