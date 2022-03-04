import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";

// TODO: add links to definitions
// or add a glossary section ???

const AboutUsSection = () => {
  const classes = useStyles();
  return (
    <Section
      style={{
        backgroundColor: colors.teal[50]
      }}
    >
      <Container>
        <Box>
          <SectionHeader
            title="About Us"
            titleProps={{
              align: "center",
              className: classes.header,
              display: "inline"
            }}
            display="flex"
            justifyContent="center"
            size={"h4"}
          />
          <p>
            We are a team of non-local scientists and community members (with
            scientific and non- scientific careers) developing a water
            monitoring program to collect information on the Salton Sea that can
            be used for further advocacy efforts. We are also dedicated to
            having an easily understood data dashboard (here) to better
            communicate with the community our observations and any existing
            publicly available data. We currently measure temperature, salinity,
            turbidity (water murkiness), oxygen, bacteria, nutrient
            concentrations, and air particles at various points along the
            northern region of the Sea (see map).
          </p>
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
