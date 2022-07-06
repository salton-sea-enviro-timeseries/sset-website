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

const AboutUsSection = () => {
  const classes = useStyles();
  // @ts-ignore
  const { language } = useAppContext();
  return (
    <Section
      style={{
        backgroundColor: colors.teal[50]
      }}
    >
      <Container>
        <Box>
          <SectionHeader
            title={getContent(
              `pages.home.${language}.content.about_us_section.title`
            )}
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
              __html: getContent(
                `pages.home.${language}.content.about_us_section.content`
              )
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
