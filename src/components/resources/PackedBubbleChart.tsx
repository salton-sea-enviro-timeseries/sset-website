import React, { useEffect, useRef } from "react";
// import Highcharts from "highcharts";
import { makeStyles } from "@material-ui/core/styles";
// import HighchartsMore from "highcharts/highcharts-more";
import Container from "@material-ui/core/Container";
import { container } from "googleapis/build/src/apis/container";

// if (typeof Highcharts === "object") {
//   HighchartsMore(Highcharts);
// }
// TODO add links to each site
const PackedBubbleChart: React.FC = () => {
  const classes = useStyles();

  useEffect(() => {
    const loadHighcharts = async () => {
      const Highcharts = await import("highcharts");
      const HighchartsMore = await import("highcharts/highcharts-more");
      const HighChartsAccessibility = await import(
        "highcharts/modules/accessibility"
      );

      HighchartsMore.default(Highcharts);
      HighChartsAccessibility.default(Highcharts);
      //   HighchartsAccessibility(Highcharts);
      Highcharts.chart({
        colors: ["#fe6a35", "#fa4b42", "#feb56a"],
        chart: {
          renderTo: "container",
          type: "packedbubble",
          height: "100%"
          //   animation: false
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
          // pointFormat: "<b>{point.name}:</b> {point.description}",
          pointFormat:
            '<div style="min-width: 300px;"> <b>{point.name}:</b> {point.description} </div>',
          // className: `${styles.tooltip}`,
          style: {
            whiteSpace: "normal"
          }
        },
        plotOptions: {
          series: {
            // animation: false,
            // allowPointSelect: false
            // states: {
            //   hover: {
            //     enabled: false
            //   },
            //   select: {
            //     enabled: false
            //   }
            // }
            // dragDrop: {
            //   draggableX: false,
            //   draggableY: false
            // }
          },

          packedbubble: {
            draggable: false,
            minSize: "30%",
            maxSize: "70%",
            // useSimulation: false,
            layoutAlgorithm: {
              // gravitationalConstant: 0.1,
              splitSeries: true,
              seriesInteraction: false,
              dragBetweenSeries: false,
              parentNodeLimit: true,
              //stop animation
              enableSimulation: false,
              friction: -0.9
            },

            dataLabels: {
              // useHTML: true,
              enabled: true,
              // formatter: function () {
              //   return (
              //     `<div>` +
              //     this.point.abbreviation +
              //     `</div><div style="font-size: .5rem; width:">` +
              //     this.point.description +
              //     `</div>`
              //   );
              // },
              format: "{point.abbreviation}",
              // filter: {
              //   property: "y",
              //   operator: ">",
              //   value: 250
              // },
              style: {
                color: "black",
                textOutline: "none",
                fontWeight: "normal",
                fontSize: "1rem",
                whiteSpace: "normal"
              }
            }
          }
        },
        series: [
          {
            name: "State Agency/Major Stakeholder",
            type: "packedbubble",
            //sizes of bubbles
            data: [
              {
                name: "California Natural Resources Agency",
                abbreviation: "CRNA",
                description:
                  "helps the CNRA and other agencies assess the impact of current and future projects on local fish and wildlife species",
                value: 100
                // color: "red"
              },
              {
                name: "California Department of Water Resources",
                abbreviation: "DWR",
                description: "",
                value: 70
              },
              {
                name: "California Department of Fish and Wildlife",
                abbreviation: "CDFW",
                description: "",
                value: 75
              },
              {
                name: "CA State Water Resources Control Board",
                abbreviation: "SCWRCB",
                description: "",
                value: 75
              },
              {
                name: "CA Enviornmental Protection Agency",
                abbreviation: "Cal-Epa",
                description: "",
                value: 80
              }
            ]
          },
          {
            name: "Federal Agency",
            type: "packedbubble",
            data: [
              {
                name: "El Salvador",
                value: 80
              },
              {
                name: "Uruguay",
                value: 80
              },
              {
                name: "Bolivia",
                value: 75
              },
              {
                name: "Trinidad and Tobago",
                value: 100
              },
              {
                name: "Ecuador",
                value: 80
              }
            ]
          },
          {
            name: "Local Agency/Major Stakeholder",
            type: "packedbubble",
            data: [
              {
                name: "Nepal",
                value: 70
              },
              {
                name: "Georgia",
                value: 75
              },
              {
                name: "Brunei Darussalam",
                value: 80
              },
              {
                name: "Kyrgyzstan",
                value: 85
              },
              {
                name: "Afghanistan",
                value: 75
              },
              {
                name: "Myanmar",
                value: 70
              },
              {
                name: "Mongolia",
                value: 90
              }
            ]
          }
          // ... add other series
        ],
        caption: {
          text: "<b>The caption renders at the bottom of the chart, and is included if the chart is exported.</b><br><em>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</em>"
        }
      });
    };
    loadHighcharts();
  }, []);

  return (
    <Container>
      <figure className={classes.highchartsFigure}>
        <div id="container" />
        {/* <p className="highcharts-description">
          This chart shows how packed bubble charts can be grouped by series,
          creating a hierarchy.
        </p> */}
      </figure>
    </Container>
  );
};
const useStyles = makeStyles({
  highchartsFigure: {
    // backgroundColor: "red"
    // width: "100%",
    minWidth: "320px"
    // maxWidth: "800px",
    // margin: "1em auto"
  },
  highchartsDataTable: {
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
  }
});
export default PackedBubbleChart;
