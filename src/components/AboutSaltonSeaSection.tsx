import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { makeStyles } from "@material-ui/core/styles";
import { NestedObjBodyText, LocaleOption } from "util/getCmsContent";

type Props = {
  content: {
    body: LocaleOption<NestedObjBodyText>;
    title: LocaleOption<string>;
  };
  locale: string;
};

const AboutSaltonSeaSection = ({ content: { body, title }, locale }: Props) => {
  const classes = useStyles();

  const bodyText =
    body[locale as keyof LocaleOption<NestedObjBodyText>].content[0].content[0]
      .value;

  return (
    <Section bgImage="/curves.png">
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
