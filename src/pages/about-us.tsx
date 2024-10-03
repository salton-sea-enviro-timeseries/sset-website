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
import MemberBio from "components/About-Us/MemberBio";

const ABOUT_US_INTRO_TEXT = (
  <>
    <p>
      Alianza Coachella Valley leads a coalition of mission-aligned residents,
      nonprofits, researchers, and civic leaders committed to bringing about
      real change for a more vibrant and prosperous Salton Sea region by
      addressing the intersectionality of the environment, public health, and
      the economy. Salton Sea communities thrive when we address poor health
      outcomes. We are conducting community science to produce publicly
      available data and inform solutions to the challenges of the receding
      Salton Sea and improve health outcomes for residents.
    </p>
  </>
);

const ABOUT_US_INTRO_TEXT_Section_Two = (
  <>
    <p>
      For a few years, we have routinely gone out to the Salton Sea with local
      residents and partner researchers interested in learning more about the
      quality of water and air impacted by the receding Salton Sea to equip them
      with actionable data for advocacy purposes. Our team is comprised of
      youth, other local residents, partner scientists from esteemed academic
      institutions (Loma Linda, Brown, UCLA) who would like to use their
      collective knowledge for the improved health and economic outcome of
      Salton Sea communities.
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
//TODO add images
const TEAM_BIOS = [
  {
    firstName: "Ryan",
    lastName: "Sinclair",
    title: "Associate Professor of Environmental Microbiology",
    bio: `Dr. Ryan G. Sinclair is an Associate Professor of Environmental Microbiology in the Loma Linda University School of Public Health, holding a joint appointment in the Department of Earth and Biological Sciences. He earned his PhD in water quality from Tulane University and completed postdoctoral research in environmental microbiology at the University of Arizona. Afterward, he worked as a Research Associate with the National Research Council on water infrastructure. His commitment to environmental justice is reflected throughout his research, and he now works as a scientist and advocate on several projects in the inland desert region of Southern California. His dedication earned him the prestigious 2021 SCAQMD Dr. Robert M. Zweig Clean Air Award.`,
    img: ""
  },
  {
    firstName: "Mara",
    lastName: "Freilich",
    title: "Researcher",
    bio: `Mara Freilich is a researcher who focuses on  fluid dynamics in systems such as lakes and oceans and their impact on ecosystems and the climate. She also studies the role of climate models in community justice and infrastructure. She uses methods including theoretical analysis, numerical modeling, interdisciplinary observations, and community-engaged research. She is an assistant professor at Brown University in the Department of Earth, Environmental, and Planetary Sciences and the Division of Applied Mathematics.`,
    img: "/avatar-pics/mara-freilich-avatar.jpg"
  },
  {
    firstName: "Isabella B.",
    lastName: "Arzeno",
    title: "Assistant Professor",
    bio: `Isabella B. Arzeno Soltero is an assistant professor in the department of Civil and Environmental Engineering at the University of California Los Angeles (UCLA) and the Principal Investigator of the Coastal Community Resilience Lab (CCRL). She received her PhD from the Scripps Institution of Oceanography in 2020. That same year, she began to collaborate with communities around the Salton Sea. Her research spans a wide array of topics centered on the ability of communities and ecosystems to adapt and recover from environmental stressors. Arzeno-Soltero cultivates close collaborations with scholars from diverse disciplines to gain a comprehensive understanding of integrated socio-environmental systems, and she places a strong emphasis on active engagement with local communities. Born and raised in Puerto Rico, Arzeno-Soltero enjoys collaborating on issues that particularly affect Latines. When not doing science, Isabella can be found playing music, dancing, or engaged in community activism.`,
    img: "/avatar-pics/isa-arzeno-avatar.jpeg"
  },

  {
    firstName: "Aydee",
    lastName: "Palomino",
    title: "Environmental Justice Project Manager",
    bio: `Works as Alianza Coachella Valley’s environmental justice project manager whose work currently focuses on implementing infrastructure projects that are at the intersection of environmental sustainability, economic development, and social wellbeing at the Salton Sea. Her work is to tackle environmental justice issues from a policy level and make sure that our community has a seat at the table when there are decisions being made. Her work with the Salton Sea campaign is in response to strong community concerns about the environmental degradation of the Salton Sea and its impacts on local public health and economy.`,
    img: "/avatar-pics/aydee-palomino-avatar.jpg"
  },
  {
    firstName: "Juliana",
    lastName: "Taboada",
    title: "Environmental Justice Coordinator",
    bio: `Works as Alianza Coachella Valley’s environmental justice campaign coordinator whose work focuses on improving the socio-economic conditions of communities within the Salton Sea region. As an alumnus of Alianza CV’s Youth Organizing Council (YoC!) Juliana understands the importance of having community members, especially youth at the forefront of social movements. Her work focuses on meaningful community involvement and input on Salton Sea issues. Her work within the Salton Sea campaign responds to community needs and calls to action on Salton Sea issues.`,
    img: "/avatar-pics/juliana-taboada-avatar.jpg"
  },
  {
    firstName: "Diego",
    lastName: "Centeno",
    title: "Research Assistant",
    bio: `Diego Centeno (he/him) is a research assistant in the Department of Earth, Environmental, and Planetary Sciences at Brown University. Originally from the city of North Shore, he is working on the sulfur cycle in the Salton Sea, including geochemistry and impacts on human health. Diego joined this community science space with the hopes of representing his community in scientific political advocacy for Salton Sea restoration plans and aspires to one day hold an academic professor position at a university. When not doing science, he likes to be outdoors or play guitar.`,
    img: ""
  },
  {
    firstName: "Daniel",
    lastName: "Ramirez",
    title: "Asset Management Specialist",
    bio: `Born and raised in the vibrant Eastern Coachella Valley, I proudly earned my B.S. in Biochemistry from UC Riverside. Beyond science, I have a passion for music. As a Mexican folklore dancer and guitarist, I find joy in expressing myself through these art forms. My journey into this space was ignited by a desire to learn about the complexities surrounding the Salton Sea and its impact on local communities' health. Eager to witness firsthand the challenges posed by its water quality, I joined the cause to amplify awareness of the environmental injustices facing underrepresented communities in the Coachella and Imperial Valley. My favorite memory is seeing a diverse group of individuals come together to leverage science to democratize data on the Salton Sea. Across varied backgrounds of education, age, and ethnicity, the Salton Sea Community Science space coalesced to empower our community with knowledge for safer, healthier lives. Looking ahead, my aspirations for the Salton Sea are rooted in the well-being of the communities I call home. I envision a future marked by improved water and air quality, fostering a conducive environment for cultural and economic prosperity.`,
    img: ""
  },
  {
    firstName: "Rushil",
    lastName: "Ladhawala",
    title: "High School Student",
    bio: `Hello! My name is Rushil Ladhawala (he/him). I have been involved in this project since my freshman year, though I am currently a sophomore at Palm Desert High School. Outside of academics, I enjoy playing pickleball, and basketball, and listening to music. I'm fascinated by how abstract mathematical concepts can be applied to design engineering innovations and can shape a sustainable world around us. This space provided me with an amazing opportunity to collect hands-on data utilizing scientific equipment, learn about various data collection methods, and analyze them to form conclusions and recommendations. Furthermore, this project has enabled me to communicate the impact of the Salton Sea's chemistry on public health and the potential socio-economic as well as ecological implications through webinars/workshops to the general public. In particular, however, one aspect of my work with the SSET has stood out as the most memorable; I specifically remember sailing out to collect water samples from the Salton Sea itself, which was an incredible experience that I’ll cherish forever. I hope that in the future, all of the efforts made towards restoring the Salton Sea will create a general increase in quality of life for both the Sea itself and those living in the communities that surround it.`,
    img: ""
  },
  {
    firstName: "Kaily",
    lastName: "Heitz",
    title: "Assistant Professor of Geography",
    bio: `An Assistant Professor of Geography at the University of California, Los Angeles. As a critical human geographer, Dr. Heitz’s work focuses on cultural and community responses to racialized dispossession and gentrification in California. Her research utilizes archival, ethnographic, and sociological methods to examine historical and ongoing trends in the socioeconomic and racial makeup of places in the U.S. West, and the lived experiences thereof. She has also worked professionally as an environmental justice policy advocate and educator. She is currently writing a manuscript entitled Oakland is a Vibe: The Relational Geographies of Black Cultural Development and working with community partners to develop creative writing workshop series on local senses of place.`,
    img: ""
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
      {/* TODO: fix resource links and add timeline navigation for years */}
      {/* <Section>
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
      </Section> */}
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
          {TEAM_BIOS.map((bio, index) => (
            <MemberBio
              key={index}
              firstName={bio.firstName}
              lastName={bio.lastName}
              title={bio.title}
              bio={bio.bio}
              img={bio.img}
            />
          ))}
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
