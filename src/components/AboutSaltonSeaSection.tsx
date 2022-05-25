import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { makeStyles } from "@material-ui/core/styles";
import { getContent } from "util/getContent";
import { useAppContext } from "components/AppContext";

const AboutSaltonSeaSection = () => {
  const classes = useStyles();
  // @ts-ignore
  const { language } = useAppContext();
  return (
    <Section bgImage="/curves.png">
      <Container>
        <Box>
          <SectionHeader
            title={getContent(language, "home.salton_sea_section.title")}
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
              __html: getContent(language, "home.salton_sea_section.content")
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
