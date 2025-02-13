import { Box, Tooltip, styled } from "@mui/material";

interface LegendItem {
  color: string;
  label: string;
  link?: string;
}

interface LegendProps {
  items?: LegendItem[];
}

const Legend: React.FC<LegendProps> = ({ items = [] }) => {
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
    <LegendContainer>
      {legendItems.map((item, index) => (
        <LegendItem key={index}>
          <LegendColor style={{ background: item.color }} />
          {item.link ? (
            <StyledTooltip title="View Purple air sensor data" arrow>
              <StyledLink href={item.link} target="_blank" rel="noreferrer">
                {item.label}
              </StyledLink>
            </StyledTooltip>
          ) : (
            <span>{item.label}</span>
          )}
        </LegendItem>
      ))}
    </LegendContainer>
  );
};

const LegendContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "10px",
  left: "10px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  padding: "10px",
  borderRadius: "5px",
  zIndex: 1
}));

const LegendItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "5px"
}));

const LegendColor = styled("span")(({ theme }) => ({
  width: "20px",
  height: "20px",
  marginRight: "5px",
  backgroundColor: "transparent" // Placeholder for dynamic color
}));

const StyledTooltip = styled(Tooltip)(({ theme }) => ({
  fontSize: 12,
  whiteSpace: "nowrap",
  display: "flex",
  justifyContent: "center"
}));

const StyledLink = styled("a")(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    color: "rgb(170, 68, 170)"
  }
}));

export default Legend;
