import { Avatar, Box, Container, Paper, Typography } from "@material-ui/core";
import { Timeline } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import EmblaCarousel from "../components/Embla/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import Hero from "components/Hero";
import Layout from "components/Layout";
import Meta from "components/Meta";
import Section from "components/Section";
import Translation from "components/Translation";
import SectionHeader from "components/SectionHeader";
import TimelineYear from "components/TimeLine/TimelineYear";
import NavigationTimeline from "components/TimeLine/NavigationTimeline";

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

const timelineData = [
  {
    year: "2016",
    contents: [
      {
        title: "Revealing the Invisible Coachella Valley",
        description:
          "A report in collaboration with BHC (Alianza), UC Davis, CIRS, Loma Linda, and Pueblo Unido.",
        result:
          "Widespread awareness of the EJ issues present in the Eastern Coachella Valley ",
        communityAgeGroup: ["ECV"],
        documentOrMedia: {
          docTitle: "Revealing the Invisible Valley",
          src: "https://cirsinc.org/wp-content/uploads/2021/06/Revealing-the-Invisible-Coachella-Valley.pdf"
        }
      },
      {
        title: "EJ Data Project",
        description:
          "A survey questionnaire and environmental assessment of over 1600 individuals in the ECV. This in-person survey used real-time instruments in homes to inform the community about environmental health risks around the home. It also provided a first look at Asthma prevalence.",
        result:
          "This data-informed priorities of the current Alianza, described EJ issues.",
        communityAgeGroup: [
          "Oasis",
          "Coachella",
          "Mecca",
          " North Shore",
          "Thermal"
        ],
        documentOrMedia: {
          docTitle: "",
          src: ""
        }
      }
    ]
  },
  {
    year: "2017",
    contents: [
      {
        title: "Purple Air Monitors Outside the Homes of ECV Residents",
        description:
          "Ten outdoor air monitors, provided by BHC and Calendow, were placed around ECV residences for 18 months to address concerns about nearby agricultural and Salton Sea pollution, filling information gaps from local agencies. BHC, Loma Linda, PUCDC, and CIRS.",
        result:
          "The 2018 white paper, recommending increased regulatory monitoring at the northern Salton Sea, led to CARB implementing such programs. This prompted SCAQMD to include the ECV in AB617-funded CAMP and CERP programs, expanding monitoring and emission reduction solutions, including $1 million for air filtration in homes and schools, and additional funding for paving projects in ECV mobile home parks. This second white paper was read by many SCAQMD staff who reached out to Dr. Sinclair for corrections.",
        communityAgeGroup: ["Mecca", "North Shore", "Oasis"],
        documentOrMedia: {
          docTitle: "Air Sensor White Paper",
          src: "https://drive.google.com/open?id=1O0imjnsW6MKcj0VB57I6RVyP2MGAUJFJ&usp=drive_fs"
        }
      },
      {
        title: "Infrastructure: Water and Public Spaces",
        description:
          "A trailer was constructed with KDI to display EJ issues that were common in the Valley. This trailer was a platform to conduct qualitative interviews with residents around EJ and Economy issues that residents have.This is called the “KDI Productive Public Spaces” campaign.",
        result: "It informed the BHC Economic Justice campaign.",
        communityAgeGroup: ["Alianza", "KDI"],
        documentOrMedia: {
          docTitle: "ECV Public Space Network",
          src: "https://www.kounkuey.org/projects/eastern_coachella_valley_pps_network"
        }
      },
      {
        title: "BHC Community Survey of Water Sources in ECV with CIRS",
        description:
          "We generated evidence from the EJ data project in 2016 to highlight water quality concerns in the ECV, particularly within the Oasis Mobile Home Park:  2016 study of water quality in the ECV.",
        result:
          "Water filtration systems were installed in CVUSD schools, providing students access to clean water fill stations.",
        communityAgeGroup: ["Mecca", "Thermal", "Oasis", "North Shore"],
        documentOrMedia: {
          docTitle: "Water Quality Study in the ECV",
          src: "https://drive.google.com/open?id=1Oxfkp1WcBi_4cpdBpz7TXesAZzZ1moE1&usp=drive_fs"
        }
      }
    ]
  },
  {
    year: "2018",
    contents: [
      {
        title: "Wastewater assessment in the ECV",
        description:
          "Soil samples were taken around the ECV to assess concentrations of Listeria, Campylobacter and Salmonella. This was in conjunction with LCJA",
        result:
          "This informed the priority for improved wastewater service to the ECV.",
        communityAgeGroup: ["Oasis", "North Shore", "BHC", "LCJA"],
        documentOrMedia: {
          docTitle: "Wastewater HIA-LCJA",
          src: "https://leadershipcounsel.org/wp-content/uploads/2020/07/Wastewater-HIA-LCJA-2020.pdf"
        }
      },
      {
        title: "Water Presentation at DM",
        description: "",
        result: "",
        communityAgeGroup: ["Oasis"],
        documentOrMedia: {
          docTitle: "",
          src: ""
        }
      },
      {
        title:
          "Air Quality Education and AirWalks with Coachella Unincorporated(now YLI)",
        description: "",
        result:
          "Increased education, awareness, and power building with you, cannot directly tie to policy and increase in resource allocation.",
        communityAgeGroup: ["Mecca", "North Shore"],
        documentOrMedia: {
          docTitle: "",
          src: ""
        }
      },
      {
        title: "COD Talks on the Salton Sea ",
        description: "",
        result: "",
        communityAgeGroup: ["Mecca", "North Shore"],
        documentOrMedia: {
          docTitle: "",
          src: ""
        }
      },
      {
        title:
          "Asthma Risk Associated with Indoor Mold Contamination in Hispanic Communities in Eastern Coachella Valley, California",
        description:
          "As part of the EJ data project, this initiative linked Asthma in the valley with high mold contamination in the homes of the ECV.",
        result:
          "Brought more attention to the housing issues associated with farmworker housing in the ECV. ",
        communityAgeGroup: ["Mecca", "Coachella"],
        documentOrMedia: {
          docTitle: "Published Research Paper",
          src: "https://pubmed.ncbi.nlm.nih.gov/30410546/"
        }
      },
      {
        title: "Air Quality Bike Ride",
        description: "Used Airbeams and road bicycles around Mecca, CA. ",
        result:
          "Increase community science literacy and engagement, specifically around air quality and the Salton Sea. Raise awareness about the receding shoreline.",
        communityAgeGroup: ["Community Partners", "LCJA", "YLI"],
        documentOrMedia: {
          docTitle: "Air Beam Walk",
          src: "https://www.arcgis.com/apps/MapJournal/index.html?appid=8dc038aa682c4920bc824fe836b7d277"
        }
      },
      {
        title: "Save Our Sea-: Sierra Club + BHC ",
        description: "",
        result: "Vision document Copy of SSMP Vision Document_reduced.pdf",
        communityAgeGroup: [],
        documentOrMedia: {
          docTitle: "SSMP Vison Document",
          src: "https://drive.google.com/open?id=1Ma809QQcj2dW5u1ZDmvyKnG3TN7V31xv&usp=drive_fs"
        }
      },
      {
        title: "Estamos Aqui Documentary with Coachella Unincorporated",
        description: "",
        result:
          "Increased visibility and start of balloon mapping in community engagement to talk about the receding Salton Sea.",
        communityAgeGroup: ["ECV"],
        documentOrMedia: {
          docTitle: "Estamos Aqui",
          src: "https://youtu.be/MLLVWKwl-RU?si=fH6hVkgUriR2CKMM"
        }
      },
      {
        title: "Balloon Mapping at DM and North Shore Park",
        description:
          "This project heard the resilient Salton Sea community’s priority for understanding the oncoming shoreline reduction that was anticipated after QSA mitigation ended.",
        result:
          "Increased awareness within the community and more education in the community. This also increased knowledge around the expected deterioration of AQ after the playa increases. It was a response to the 2017 Dust suppression action plan related to the SSMP.",
        communityAgeGroup: ["Youth and adults in the ECV"],
        documentOrMedia: {
          docTitle: "Shrinking of Salton Sea",
          src: "https://www.arcgis.com/apps/MapJournal/index.html?appid=a42efbc8264f4a48b369889f5cbfc936"
        }
      }
    ]
  },
  {
    year: "2019",
    contents: [
      {
        title: "Dust Suppression Action Plan Draft",
        description:
          "This is a public comment letter Alianza made to the DSAP draft.",
        result:
          "This letter was written by LLU, Alianza, CIRS, KDI, Sierra Club, Audubon. It was the first time mentioning Algae, inconsistency in wind, the close proximity of the community to the Salton Sea, and the need for more air sensors.",
        communityAgeGroup: ["Alianza"],
        documentOrMedia: {
          docTitle: "Action Plan Draft",
          src: "https://drive.google.com/drive/u/3/search?q=Salton%20Sea%20Dust%20Control%20Issue%20Brief"
        }
      },
      {
        title: "North Shore Park events: Education about Air Monitors",
        description: "",
        result: "North Shore Park Coachella Union  ",
        communityAgeGroup: [],
        documentOrMedia: {
          docTitle: "North Shore Park Events",
          src: "https://medium.com/@CoachellaUninc/north-shore-park-5616c235deee"
        }
      },
      {
        title: "Advocacy for TMDLs in the Triennial Review",
        description: "",
        result:
          "2020 review comment FAQ from waterkeepers about triennial review",
        communityAgeGroup: ["Alianza", "Coachella Valley", "Water Keeper"],
        documentOrMedia: {
          docTitle: "FAQ",
          src: "https://drive.google.com/open?id=1MWtAJpCi3bcH0UfP3JL-V5cqOQFAz5xW&usp=drive_fs"
        }
      },
      {
        title: "Resilient Salton Sea",
        description:
          " Alianza, KDI, Sierra Club, CIRS, and others convene a community group to discuss issues",
        result:
          "This group informs the formation of the community science initiatives to follow and develops Salton Sea related priorities for Alianza.",
        communityAgeGroup: ["Alianza", "North Shore"],
        documentOrMedia: {
          docTitle: "",
          src: ""
        }
      },
      {
        title: "Thermal Dump Fire",
        description: "",
        result:
          "https://coachellaunincorporated.org/2019/10/24/thermal-dump-fire-creates-hazardous-air-quality/ Raises awareness",
        communityAgeGroup: ["Thermal"],
        documentOrMedia: {
          docTitle: "",
          // Link does not work
          // "https://coachellaunincorporated.org/2019/10/24/thermal-dump-fire-creates-hazardous-air-quality/"
          src: ""
        }
      },
      {
        title: "Community Science: Drinking Water Quality",
        description:
          "A community science intro for DM students to explore water contamination. ",
        result:
          "A community science intro for DM students to explore water contamination.",
        communityAgeGroup: ["Alianza", "LLU", "YLI in Desert Mirage"],
        documentOrMedia: {
          docTitle: "Drinking Water Quality",
          src: "https://publiclab.org/notes/enviromicro/11-15-2019/community-science-drinking-water-quality"
        }
      }
    ]
  },
  {
    year: "2020",
    contents: [
      {
        title: "Advocacy letter from Olivia from YLI about COVID – with BHC",
        description: "",
        result:
          "Valley Voice: Salton Sea communities needed relief long before coronavirus | Audubon California ",
        communityAgeGroup: [],
        documentOrMedia: {
          docTitle: "Valley Voice",
          src: "https://ca.audubon.org/news/valley-voice-salton-sea-communities-needed-relief-long-coronavirus"
        }
      },
      {
        title: "Comment from dust suppression action plan",
        description:
          "Ryan Sinclair gives public comment at SWRCB and Regional Water Board Triennial review.",
        result:
          "This was the first time Ryan Sinclair mentioned issues about boat launching conditions, water monitoring, TMDLs, wetlands, and the canceled monitoring by the RWQCB. https://docs.google.com/document/d/1rUoLgEghIuFJ-RZxmCl2Oqwf8MTDqFwbtHGc82so15g/edit  It should be on public record for the two meetings (SWRCB at RWQB triennial review) Alianza public comment to DSAP https://drive.google.com/drive/u/3/search?q=Salton%20Sea%20Dust%20Control%20Issue%20Brief ",
        communityAgeGroup: ["SWRCB"],
        documentOrMedia: {
          docTitle: "SWRCB at RWQB triennial review",
          src: "https://docs.google.com/document/d/1rUoLgEghIuFJ-RZxmCl2Oqwf8MTDqFwbtHGc82so15g/edit"
        }
      },
      {
        title: "North Shore Balloon Mapping ",
        description: "",
        result:
          "The previous SSMP 2018 Dust Suppression Action Plan draft didn’t include projects in the North Shore and then after mapping, they included the North Shore community after advocacy letter was sent in the 2020 draft DSAP. Advocacy letter. Page 47 https://saltonsea.ca.gov/wp-content/uploads/2020/08/DSAP-20200731-Appendix-B-Electronic.pdf ",
        communityAgeGroup: [
          "Unincorporated ECV",
          "Appendix B Draft DSAP Comments"
        ],
        documentOrMedia: {
          docTitle: "Appendix B Draft DSAP Comments",
          src: "https://saltonsea.ca.gov/wp-content/uploads/2020/08/DSAP-20200731-Appendix-B-Electronic.pdf"
        }
      },
      {
        title: "",
        description:
          "Summer Community Science Water Quality Curriculum. An educational session for high school and college-age individuals in the ECV. Alianza delivered water quality testing kits to 12 participants throughout the pandemic summer for students to explore their water quality in 8 educational sessions from August - September.",
        result:
          "Raised awareness in the community, Alianza youth, and Alianza about the Salton Sea water testing needed at the Salton Sea.  Curriculum",
        communityAgeGroup: ["Alianza Youth"],
        documentOrMedia: {
          docTitle: "",
          src: ""
        }
      }
    ]
  },
  {
    year: "2021",
    contents: [
      {
        title: "Salton Sea Water Quality Monitoring ",
        description:
          "Alianza in partnership with Dr. Ryan Sinclair and scientists from the Thriving Earth Exchange start periodic (monthly to quarterly) water quality monitoring at select locations in the northern Salton Sea with community scientists in order to fill data gaps created by regional water board and other agencies not conducting water quality monitoring at the Sea.",
        result:
          "The regional water board resuming water quality monitoring in the Salton Sea and the possibility of development for Salton Sea-specific TMDL after a public comment letter for TMDL was sent.",
        communityAgeGroup: ["Unincorporated ECV"],
        documentOrMedia: {
          docTitle: "",
          src: ""
        }
      },
      {
        title: "Air monitor placement preference",
        description:
          "This was a survey of community members detailing where they would like Air monitors placed around the valley.",
        result:
          "This Story Map helped the SCAQMD justify where they put community monitors for PM2.5, PM10, NO2 and Ozone. https://storymaps.arcgis.com/stories/5603453900a0428d946f3c818d539d2d.",
        communityAgeGroup: [
          "SCAQMD community steering committee and community"
        ],
        documentOrMedia: {
          docTitle: "AB617 ECV Air Sensor Preference",
          src: "https://storymaps.arcgis.com/stories/5603453900a0428d946f3c818d539d2d"
        }
      }
    ]
  },
  {
    year: "2023",
    contents: [
      {
        title:
          "Community panel at annual State Water Board Salton Sea Workshop",
        description:
          "Community Scientists present at a community projects panel, uplifting their work in community science, its importance and why there needs to be more built infrastructure projects in the region that can tackle air quality as well as other recreational, environmental, and economic needs for local communities.",
        result:
          "SSMP recognizes the need for better communication of ongoing work to the public via recommendations in a community needs report on increased collaboration with local partners which includes data collection, data communication, and solutions such as infrastructure projects that include amenities projects to local communities such as a trail system that can incorporate various elements.",
        communityAgeGroup: [
          "Community and agencies involved in Salton Sea restoration efforts"
        ],
        documentOrMedia: {
          docTitle: "",
          src: ""
        }
      },
      {
        title:
          "Aeroqual Sensor deployment in response to the community's concern about hydrogen sulfide emissions",
        description:
          "Salton Sea Air Quality Monitoring in conjunction with continued water quality monitoring for link through the deployment of an air quality monitoring sensor on top of the water to measure hydrogen sulfide (rotten egg smell) and other pollutants being emitted from the Sea.",
        result:
          "SSMP is trying to make more community-facing information such as the project tracker.",
        communityAgeGroup: [
          "Communities in the Salton Sea, local and state agencies"
        ],
        documentOrMedia: {
          docTitle: "",
          src: ""
        }
      }
    ]
  }
];

// TODO: change bgImage
const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
const AboutUs = () => {
  const classes = useStyles();
  return (
    <Layout className={classes.root}>
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
      <Section>
        <Container className={classes.timeLineWrapper}>
          <NavigationTimeline />
          <Paper className={classes.timeLineContainer} elevation={0}>
            <Timeline align="alternate">
              {timelineData.map((item, index) => (
                <TimelineYear
                  key={item.year}
                  year={item.year}
                  contents={item.contents}
                  timelineNav={false}
                />
              ))}
            </Timeline>
          </Paper>
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
export default AboutUs;
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "800px"
  },
  header: {
    boxShadow: `inset 0 -5px 0 ${theme.palette.secondary.light}`
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    float: "left",
    shapeOutside: "circle(50%)",
    marginRight: "1rem"
  },
  avatarOdd: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    float: "right",
    shapeOutside: "circle(50%)",
    marginRight: "1rem"
  },
  topIntroSection: {
    paddingBottom: "2rem"
  },
  bottomIntroSection: {
    paddingTop: "2rem "
  },
  pageWrapper: {
    //breakpoint at wich timeline is no longer correctly visible
    minWidth: "800px"
  },
  timeLineWrapper: {
    display: "flex"
  },
  timeLineContainer: {
    height: "100vh",
    overflowY: "scroll",
    //hiding scrollbar for diff browsers
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
}));
