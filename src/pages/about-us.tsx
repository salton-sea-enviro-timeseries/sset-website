import { Avatar, Box, Container, Divider, Typography } from "@material-ui/core";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector
} from "@material-ui/lab";
import {
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from "@material-ui/lab";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import EmblaCarousel from "../components/Embla/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import Hero from "components/Hero";
import Layout from "components/Layout";
import Meta from "components/Meta";
import PageSection from "components/PageSection";
import Section from "components/Section";
import Translation from "components/Translation";
import SectionHeader from "components/SectionHeader";

const ABOUT_US_INTRO_TEXT = (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat, mi
      et dictum semper, ex tortor bibendum sem, eget suscipit nunc diam feugiat
      diam. Vestibulum nec ante justo. Ut vulputate arcu id venenatis dapibus.
      Cras mollis eros sit amet velit egestas, eu egestas lectus imperdiet.
      Integer non ornare sem. Donec pulvinar enim at scelerisque tempus. Fusce
      bibendum fermentum hendrerit. Proin imperdiet lobortis mauris sed
      facilisis. Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Nulla lorem nibh, iaculis eleifend nunc lobortis, convallis sagittis
      mauris. Vivamus ac justo ac felis maximus volutpat a vitae augue.
    </p>
  </>
);

const ABOUT_US_INTRO_TEXT_Section_Two = (
  <>
    <p>
      Phasellus tincidunt sem mollis libero cursus, et vulputate lorem vehicula.
      Vivamus pretium nec metus non maximus. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Aliquam mattis quam vel molestie fringilla.
      Curabitur fringilla feugiat dui eleifend tempus. Fusce sagittis
      sollicitudin imperdiet. Pellentesque sed cursus odio. Donec vel euismod
      nibh. Quisque tristique maximus dolor, nec sollicitudin dolor scelerisque
      non. Nulla nec nibh lacus. Pellentesque ipsum nulla, congue sed tortor
      sed, porttitor egestas elit. Sed semper mattis sagittis. Pellentesque
      tristique arcu vel eros sodales, eget semper ipsum gravida. Proin a eros
      eleifend, pellentesque urna non, placerat ex.
    </p>
    <p>
      Suspendisse hendrerit est non mauris malesuada, quis mattis orci
      imperdiet. Donec pharetra tincidunt magna quis feugiat. Quisque sit amet
      nisi id metus gravida viverra. Aenean mi diam, molestie non purus vitae,
      posuere hendrerit diam.
    </p>
    <p>
      Vivamus pharetra maximus mattis. Cras iaculis ultricies erat, et congue
      neque ultricies bibendum.
    </p>
  </>
);

// TODO: change bgImage
const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
const AboutUs = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Meta title="About Us | Salton Sea Environmental Timeseries" />
      <Translation
        path="site.language.navLinks.about"
        propsToTranslate={{
          title: "site.language.navLinks.about"
        }}
      >
        <Hero bgColor="secondary" size="medium" />
      </Translation>
      {/* TODO make its own component */}
      <Section className={classes.topIntroSection} bgImage={"/curves.png"}>
        <Container>
          <Box>
            <SectionHeader
              title={"Who Are We?"}
              sectionId={"section-about-us"}
              titleProps={{
                align: "center",
                className: classes.header,
                display: "inline"
              }}
              display="flex"
              justifyContent="center"
              size={"h4"}
            />
            <Typography component="div">{ABOUT_US_INTRO_TEXT}</Typography>
          </Box>
        </Container>
      </Section>
      <EmblaCarousel options={OPTIONS} />
      <Section className={classes.bottomIntroSection} bgImage={"/curves.png"}>
        <Container>
          <Box>
            <Typography component="div">
              {ABOUT_US_INTRO_TEXT_Section_Two}
            </Typography>
          </Box>
        </Container>
      </Section>
      {/* embla section end */}
      {/* TODO : add timeline here */}
      <Section>
        <Container>
          <Timeline align="alternate">
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography color="textSecondary">2016</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6">
                  Revealing the Invisible Coachella Valley
                </Typography>
                <Typography variant="h6">EJ Data Project</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography color="textSecondary">2017</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6">
                  Purple Air Monitors Outside the Homes of ECV Residents
                </Typography>
                <Typography variant="h6">
                  Infrastructure: Water and Public Spaces
                </Typography>
                <Typography variant="h6">
                  BHC Community Survey of Water Sources in ECV with CIRS
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography color="textSecondary">2018</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6">
                  Wastewater Assessment in the ECV{" "}
                </Typography>
                <Typography variant="h6">Water Presentation at DM </Typography>
                <Typography variant="h6">
                  Air Quality Education and AirWalks with Coachella
                  Unincorporated(now YLI) /COD Talks on the Salton Sea
                </Typography>
                <Typography variant="h6">
                  Asthma Risk Associated with Indoor Mold Contamination in
                  Hispanic Communities in Eastern Coachella Valley, California{" "}
                </Typography>
                <Typography variant="h6">Air Quality Bike Ride </Typography>
                <Typography variant="h6">
                  Save Our Sea-: Sierra Club + BHC{" "}
                </Typography>
                <Typography variant="h6">
                  Estamos Aqui Documentary with Coachella Unincorporated(Video)
                </Typography>
                <Typography variant="h6">
                  Balloon Mapping at DM and North Shore Park
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography color="textSecondary">2019</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6">
                  Dust Suppression Action Plan Draft
                </Typography>
                <Typography variant="h6">
                  North Shore Park events: Education about Air Monitors
                </Typography>
                <Typography variant="h6">
                  Advocacy for TMDLs in the Triennial Review
                </Typography>
                <Typography variant="h6">Resilient Salton Sea</Typography>
                <Typography variant="h6">Thermal Dump Fire</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography color="textSecondary">2020</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6">
                  Advocacy Letter From Oliviea from YLI about COVID with BHC
                </Typography>
                <Typography variant="h6">
                  Comment from Dust Suppression Action Plan
                </Typography>
                <Typography variant="h6"></Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Container>
      </Section>
      {/* Timeline end */}
      <Section>
        <Container>
          <SectionHeader
            title={"Core Team"}
            sectionId={"section-core-team"}
            titleProps={{
              align: "center",
              className: classes.header,
              display: "inline"
            }}
            display="flex"
            justifyContent="center"
            size={"h4"}
          />

          <Box marginTop={4}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              className={classes.avatar}
            />
            <Box>
              <Typography variant="h5" display="block">
                Firstname Lastname
              </Typography>
              <Typography variant="body1" display="inline">
                Phasellus tincidunt sem mollis libero cursus, et vulputate lorem
                vehicula. Vivamus pretium nec metus non maximus. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Aliquam mattis quam
                vel molestie fringilla. Curabitur fringilla feugiat dui eleifend
                tempus. Fusce sagittis sollicitudin imperdiet. Pellentesque sed
                cursus odio. Donec vel euismod nibh. Quisque tristique maximus
                dolor, nec sollicitudin dolor scelerisque non. Nulla nec nibh
                lacus. Pellentesque ipsum nulla, congue sed tortor sed,
                porttitor egestas elit. Sed semper mattis sagittis. Pellentesque
                tristique arcu vel eros sodales, eget semper ipsum gravida.
                Proin a eros eleifend, pellentesque urna non, placerat ex.
                Pellentesque ipsum nulla, congue sed tortor sed, porttitor
                egestas elit. Sed semper mattis sagittis. Pellentesque tristique
                arcu vel eros sodales, eget semper ipsum gravida. Proin a eros
                eleifend, pellentesque urna non, placerat ex.
              </Typography>
            </Box>
          </Box>

          <Box marginTop={4}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              className={classes.avatarOdd}
            />
            <Box>
              <Typography variant="h5" display="block">
                Firstname Lastname
              </Typography>
              <Typography variant="body1" display="inline">
                Phasellus tincidunt sem mollis libero cursus, et vulputate lorem
                vehicula. Vivamus pretium nec metus non maximus. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Aliquam mattis quam
                vel molestie fringilla. Curabitur fringilla feugiat dui eleifend
                tempus. Fusce sagittis sollicitudin imperdiet. Pellentesque sed
                cursus odio. Donec vel euismod nibh. Quisque tristique maximus
                dolor, nec sollicitudin dolor scelerisque non. Nulla nec nibh
                lacus. Pellentesque ipsum nulla, congue sed tortor sed,
                porttitor egestas elit. Sed semper mattis sagittis. Pellentesque
                tristique arcu vel eros sodales, eget semper ipsum gravida.
                Proin a eros eleifend, pellentesque urna non, placerat ex.
                Pellentesque ipsum nulla, congue sed tortor sed, porttitor
                egestas elit. Sed semper mattis sagittis. Pellentesque tristique
                arcu vel eros sodales, eget semper ipsum gravida. Proin a eros
                eleifend, pellentesque urna non, placerat ex.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Section>
    </Layout>
  );
};
const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: `inset 0 -5px 0 ${theme.palette.secondary.light}`
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    float: "left",
    shapeOutside: "circle(50%)",
    marginRight: "1rem"
    // shapeMargin: "1rem"
  },
  avatarOdd: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    float: "right",
    shapeOutside: "circle(50%)",
    marginRight: "1rem"
    // shapeMargin: "1rem"
  },
  topIntroSection: {
    paddingBottom: "2rem"
  },
  bottomIntroSection: {
    paddingTop: "2rem "
  }
}));
export default AboutUs;
