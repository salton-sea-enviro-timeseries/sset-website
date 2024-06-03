import { Tooltip, makeStyles } from "@material-ui/core";

interface LegendItem {
  color: string;
  label: string;
  link?: string;
}

interface LegendProps {
  items?: LegendItem[];
}

const Legend: React.FC<LegendProps> = ({ items = [] }) => {
  const classes = useStyles();
  // Default items, can be overridden by props
  //Remove purple air legend for now
  const defaultItems: LegendItem[] = [
    { color: "#040273", label: "AQMD & QUANT_AQ" }
    // {
    //   color: "rgb(170, 68, 170)",
    //   label: "Purple Air Sensors",
    //   link: "https://map.purpleair.com/1/mAQI/a10/p604800/cC0#12/33.52245/-115.91447"
    // }
  ];
  const legendItems = items.length ? items : defaultItems;
  return (
    <div className={classes.legend}>
      {legendItems.map((item, index) => (
        <div key={index} className={classes.legendItem}>
          <span
            style={{ background: item.color }}
            className={classes.legendColor}
          />
          {item.link ? (
            <Tooltip
              title="View Purple air sensor data"
              arrow
              classes={{ tooltip: classes.tooltip }}
            >
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className={classes.link}
              >
                {item.label}
              </a>
            </Tooltip>
          ) : (
            <span>{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Legend;
const useStyles = makeStyles(() => ({
  legend: {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "10px",
    borderRadius: "5px",
    zIndex: 1
  },

  legendItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px"
  },

  legendColor: {
    width: "20px",
    height: "20px",
    marginRight: "5px"
  },
  tooltip: {
    fontSize: 12,
    whiteSpace: "nowrap",
    display: "flex",
    justifyContent: "center"
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      color: "rgb(170, 68, 170)"
    }
  }
}));
