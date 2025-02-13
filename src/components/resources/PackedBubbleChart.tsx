import React, { useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";

const PackedBubbleChart: React.FC = () => {
  useEffect(() => {
    const loadHighcharts = async () => {
      const Highcharts = await import("highcharts");
      const HighchartsMore = await import("highcharts/highcharts-more");
      const HighChartsAccessibility = await import(
        "highcharts/modules/accessibility"
      );

      HighchartsMore.default(Highcharts);
      HighChartsAccessibility.default(Highcharts);
      Highcharts.chart({
        colors: ["#544fc5", "#fa4b42", "#2caffe"],
        chart: {
          renderTo: "container",
          type: "packedbubble",
          height: "100%"
        },
        title: {
          text: "Government at the Salton Sea",
          align: "center",

          style: {
            fontSize: "2rem"
          }
        },
        tooltip: {
          useHTML: true,
          pointFormat:
            '<div style="min-width: 300px;"> <b>{point.name}:</b> {point.description} </div>',

          style: {
            whiteSpace: "normal",
            fontSize: "1rem"
          }
        },
        plotOptions: {
          series: {
            cursor: "pointer"
          },

          packedbubble: {
            draggable: false,
            minSize: "30%",
            maxSize: "70%",
            layoutAlgorithm: {
              splitSeries: true,
              seriesInteraction: false,
              dragBetweenSeries: false,
              parentNodeLimit: true,
              //stop animation
              enableSimulation: false,
              friction: -0.9
            },

            dataLabels: {
              useHTML: true,
              enabled: true,
              formatter: function () {
                const pointOptions = this.point.options as any;
                return pointOptions.abbreviation;
              },
              style: {
                color: "white",
                textOutline: "none",
                fontWeight: "bold",
                fontSize: "1.2rem",
                whiteSpace: "normal",
                textDecoration: "none",
                cursor: "pointer"
              }
            },
            point: {
              events: {
                click: function () {
                  window.open((this.options as any).url, "_blank");
                }
              }
            }
          }
        },
        series: [
          {
            name: "State Agency/Major Stakeholder",
            type: "packedbubble",
            data: [
              {
                name: "California Natural Resources Agency",
                abbreviation: "CRNA",
                description:
                  "Helps the CNRA and other agencies assess the impact of current and future projects on local fish and wildlife species",
                value: 100,
                url: "https://saltonsea.ca.gov"
              },
              {
                name: "California Department of Water Resources",
                abbreviation: "DWR",
                description:
                  "Supports the CNRA's SSMP to address the urgent public and ecological health issues resulting from the drying and shrinking of the Salton Sea. Including air quality impacts from dust emissions and loss of important wildlife habitat.",
                value: 80,
                url: "https://water.ca.gov/Programs/Integrated-Regional-Water-Management/Salton-Sea-Unit"
              },
              {
                name: "California Department of Fish and Wildlife",
                abbreviation: "CDFW",
                description:
                  "Helps the CNRA and other agencies assess the impact of current and future projects on local fish and wildlife species",
                value: 75,
                url: "https://wildlife.ca.gov/Regions/6/Salton-Sea-Program"
              },
              {
                name: "CA State Water Resources Control Board",
                abbreviation: "SCWRCB",
                description:
                  "Helps the CNRA with managing the projects and serves as an accountability or regulating entity within the SSMP",
                value: 90,
                url: "https://www.waterboards.ca.gov/waterrights/water_issues/programs/salton_sea/"
              },
              {
                name: "CA Enviornmental Protection Agency",
                abbreviation: "Cal-Epa",
                description:
                  "Is state cabinet-level agency within the government of California. The mission of CalEPA is to restore, protect and enhance the environment, to ensure public health, environmental quality and economic vitality.",
                value: 80,
                url: "https://calepa.ca.gov"
              }
            ]
          },
          {
            name: "Federal Agency",
            type: "packedbubble",
            data: [
              {
                name: "Bureau of Land Reclamation (BLM)",
                value: 80,
                abbreviation: "BLM",
                description:
                  "is a federal agency responsible for administering federal land to sustain the health, diversity, and productivity of public lands for the use and enjoyment of present and future generations including those at the Sea. They manage pockets of land primarily on the east and south of the Sea",
                url: "https://www.blm.gov/visit/dos-palmas-preserve"
              },
              {
                name: "Army Corps of Engineers (USACE)",
                value: 80,
                abbreviation: "USACE",
                description:
                  "s an engineer formation of the United States Army that has three primary mission areas: Engineer Regiment, military construction, and civil works. It conducts feasibility studies for many projects being implemented around the Sea including those in the SSMP and the North Lake Demonstration Project by the SSA. It responds to Senate committees for approval of projects.",
                url: "https://www.spl.usace.army.mil/Missions/Civil-Works/Projects-Studies/Imperial-Streams-Salton-Sea/"
              },
              {
                name: "United Sates Geological Survey (USGS)",
                value: 75,
                abbreviation: "USGS",
                description:
                  "is a federal agency responsible for the sourcing of science-based information on ecosystems, land use, energy and mineral resources, natural hazards, water use and availability, and updated maps and images of the Earth's features available to the public. They work with other agencies to provide useful information about the quick changing landscape of the Sea. It contributes to reports and important monitoring of the Sea.",
                url: "https://www.usgs.gov/special-topics/salton-sea"
              },
              {
                name: "United States Environmental Protection Agency (USEPA)",
                value: 100,
                abbreviation: "USEPA",
                description:
                  "is an independent executive agency of the United States federal government tasked with environmental protection matters. The agency conducts environmental assessment, research, and education. It has the responsibility of maintaining and enforcing national standards under a variety of environmental laws, in consultation with state, tribal, and local governments. EPA enforcement powers include fines, sanctions, and other measures.",
                //TODO:Get URL
                url: ""
              },
              {
                name: "Bureau of Reclamation (BOR)",
                value: 80,
                abbreviation: "BOR",
                description:
                  " works with other state (DWR) and local agencies (SSA) to provide technical and funding assistance on a number of projects including water monitoring and topography. They also manage a majority of the Sea that is not privately-owned with other partner federal agencies.",
                url: "https://www.usbr.gov/lc/region/programs/saltonsea.html"
              }
            ]
          },
          {
            name: "Local Agency/Major Stakeholder",
            type: "packedbubble",
            data: [
              {
                name: "CA Colorado River Basin Regional Water Quality Control Board",
                value: 100,
                abbreviation: "CRBRWQCB",
                description:
                  "Addresses Salton Sea Watershed impairments with its multiple programs of the board including the Total Maximum Daily Load, the Surface Water Ambient Monitoring Program, the Irrigated Lands Regulatory Program, the New River Pollution, the Salton Sea Management Program and Other Programs.",
                url: "https://www.waterboards.ca.gov/coloradoriver/water_issues/programs/salton_sea/"
              },
              {
                name: "Imperial Irrigation District (IID)",
                value: 75,
                abbreviation: "IID",
                description:
                  "Is a member of the Salton Sea Authority's board. It has annual commitments and a framework for Salton Sea restoration and mitigation efforts. IID also owns and manages many parts of the Sea, more notably on the southern part.",
                url: "https://www.iid.com/water/salton-sea"
              },
              {
                name: "Salton Sea Authority",
                value: 80,
                abbreviation: "SSA",
                description:
                  "a joint powers authority whose mission is to revitalize the Sea and whose board is comprised of two members from five major stakeholders at the Sea. One of its main projects is to create the Salton Sea North Lake Pilot Demonstration Project, hoping to provide approximately 156 acres of shallow and deep-water habitat for fish and birds which provides an opportunity to stimulate the local economy and recreational activities.",
                url: "  https://saltonsea.com"
              },
              {
                name: "Torres Martinez Desert Cahuilla Tribe",
                value: 85,
                abbreviation: "TMDCT",
                description:
                  "have inhabited the Martinez Canyon since the early 1800’s. The are major land owners and stewards of the Sea, mainly on the Northwest. One of their main projects is the Torres Martinez wetlands  to benefit birds in and around the Salton Sea, restoring it back to it's main role within its complex ecosystem.",
                url: "https://water.ca.gov/Programs/Integrated-Regional-Water-Management/Salton-Sea-Unit/Torres-Martinez-Wetlands"
              },
              {
                name: "Imperial County Air Pollution Control District (ICAPCD)",
                value: 75,
                abbreviation: "ICAPCD",
                description:
                  "Is a regulatory local agency with authority to fine other stakeholders in the region who are contributing to air pollution in the region and has reponsiblitiy to monitor air quality of its assigned area under CARB. ",
                url: "https://ww2.arb.ca.gov/sites/default/files/2020-06/ICAPCD%20Community%20Air%20Protection%20Program%20Apr%2030%202018_0_acc.pdf"
              },
              {
                name: "South Coast Air Quality Management District (SCAQMD)",
                value: 90,
                abbreviation: "SCAQMD",
                description:
                  "established a community-based program to reduce air pollution in communities that are most impacted in response to Assembly Bill (AB) 617. California Air Resources Board (CARB) and SCAQMD will work with community members to develop measures that reduce air pollution. Additionally, South Coast AQMD will collaborate with state and local agencies (e.g., Imperial County Air Pollution Control District) to address community air quality concerns including those stemming from the Salton Sea",
                // TODO: get url
                url: ""
              },
              {
                name: "Coachella Valley Water District (CVWD)",
                value: 90,
                abbreviation: "CVWD",
                description:
                  "A founding member of the Salton Sea Authority (SSA).  Two CVWD board members concurrently serve on the Salton Sea Authority board. It supports a practical, reasonable solution to what is a complex environmental challenge at the Salton Sea. It also is a landowner and manager of the Sea.",
                url: "http://www.cvwd.org/169/Salton-Sea"
              },
              {
                name: "*Local Communities and Residents*",
                value: 70,
                abbreviation: "LCR",
                description:
                  "the Salton Sea region is vibrant, primarily made up of indigenous and Latine people living throughout the Eeastern Coachella Vallety (ECV) and Imperial Valley in the communities of Mecca, Oasis, Thermal, North Shore, Bombay Beach, Salton City, Westmorland, Niland, Calipatria, El Centro ,and Brawley. The community envisions a more beautiful, healthy, thriving, and united Salton Sea Region so that both the environment and its people can prosper.",
                //TODO get url
                url: ""
              }
            ]
          }
        ],

        caption: {
          text: "<b>Government Agencies Involved with the Salton Sea.</b><br><em>This chart illustrates the various governmental agencies active in the Salton Sea region, categorized as State, Federal, or Local agencies.</em>"
        }
      });
    };
    loadHighcharts();
  }, []);

  return (
    <Container>
      <StyledHighChartsFigure>
        <div id="container" />
      </StyledHighChartsFigure>
    </Container>
  );
};

const StyledHighChartsFigure = styled("figure")({
  "& a": {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

const StyledHighChartsTable = styled("table")({
  fontFamily: "Verdana, sans-serif",
  borderCollapse: "collapse",
  border: "1px solid #ebebeb",
  margin: "10px auto",
  textAlign: "center",
  width: "100%",
  maxWidth: "500px",
  "& caption": {
    padding: "1em 0",
    fontSize: "1.2em",
    color: "#555"
  },
  "& th": {
    fontWeight: 600,
    padding: "0.5em"
  },
  "& td, & th, & caption": {
    padding: "0.5em"
  },
  "& thead tr, & tr:nth-child(even)": {
    background: "#f8f8f8"
  },
  "& tr:hover": {
    background: "#f1f7ff"
  }
});
export default PackedBubbleChart;
