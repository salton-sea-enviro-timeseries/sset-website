import { Avatar, Box, Container, Divider, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import EmblaCarousel from "../components/Embla/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import Hero from "components/Hero";
import Layout from "components/Layout";
import Meta from "components/Meta";
import PageSection from "components/PageSection";
import Section from "components/Section";
import Translation from "components/Translation";

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
const SECTION_INDEX = 0;
const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
const SLIDE_COUNT = 9;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
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
      {/* <Section>
        <Container>
          <SectionHeader
            title="Questions Asked To Our Community Members"
            titleProps={{
              align: "center",
              className: classes.header,
              display: "inline"
            }}
            display="flex"
            justifyContent="center"
            size={"h4"}
            sectionId={"ourCommunity-section"}
          />
        </Container>
      </Section> */}
      <PageSection
        id="section-about-us"
        bodyText={ABOUT_US_INTRO_TEXT}
        section={SECTION_INDEX}
        title={"Who are We?"}
      />
      <Section>
        {/* <Container>
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </Container> */}
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </Section>
      <Section>
        <Container>
          <Typography
            variant="h4"
            component="header"
            className={classes.header}
            display="inline"
          >
            {"Core Team"}
          </Typography>
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
  }
}));
export default AboutUs;
