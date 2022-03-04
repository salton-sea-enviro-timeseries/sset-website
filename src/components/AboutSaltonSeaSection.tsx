import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { makeStyles } from "@material-ui/core/styles";

const AboutSaltonSeaSection = () => {
  const classes = useStyles();

  return (
    <Section bgImage="/curves.png">
      <Container>
        <Box>
          <SectionHeader
            title="The Salton Sea"
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
            The Salton Sea is a hypersaline inland lake that plays an important
            role in the surrounding communities and ecology. Located in
            Riverside and Imperial counties, it constitutes part of unceded
            Torres Martinez Desert Cahuilla Indian territory and is an important
            stopover for migratory birds along the Pacific Flyway. The origin of
            the current Salton Sea traces back to 1905, when Colorado River
            water breached an irrigation canal and spilled into the Salton Sink.
            Since then, the Salton Sea has been fed by agricultural runoff and
            outflows from local rivers such as the New River, Alamo River and
            Whitewater River. Unfortunately, decades of detrimental policies
            have turned this region into an environmental disaster.
          </p>
          <p>
            Normally fed by offshoots of the Colorado river, redistribution of
            water allocation from the Colorado river has led to a significant
            reduction in water inflow to the lake over the recent years. In
            2003, the Quantification Settlement Agreement between the Imperial
            Irrigation District, the San Diego Water Quality Control Board, and
            other government entities, agreed to divert water from the Imperial
            Valley to San Diego County, reducing the inflow available to the
            Salton Sea and causing the Sea’s water volume to begin shrinking.
            From 2003 to 2017, mitigation water (105,000 acre-feet) was
            allocated to the Salton Sea, abating the dropping sea level.
            However, the Salton Sea surface area has been rapidly declining
            since mitigation water ceased to be allocated to the region in 2017,
            altering the water properties of the Sea, exposing miles of dry
            playa, and contributing to a public health crisis. In fact, over the
            past few years, the Salton Sea sea level has been declining at a
            rate of about 0.3 meters a year (1 foot per year). The Salton Sea
            has been classified as an impaired body of water by the US EPA and
            the California State Water Resources Control Board.
          </p>
          <p>
            The accumulation of runoff water in the Salton Sea, combined with
            rapid evaporation and detrimental policies, have led to an increased
            salinity, hypoxia, the proliferation of harmful bacteria, the
            exudation of foul smells, and the accumulation of toxins in the
            soil. Wind blowing over the Salton Sea releases toxic dust from the
            previously covered lakebed (often referred to as playa) and
            aerolizes chemicals from the surface of the water, leading to
            chronic respiratory illnesses in surrounding communities.
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
export default AboutSaltonSeaSection;
