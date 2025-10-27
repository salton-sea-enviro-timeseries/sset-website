import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";

type Device = {
  sensorId: string | number;
  site: string;
  latitude: number;
  longitude: number;
  color: string;
};

type LegendProps = {
  devices: Device[];
  activeId: string | number | null;
  setActiveId: (id: string | number | null) => void;
};
// TODO:Update and get legend on map for device id's
export function TooltipLegend({ devices, activeId, setActiveId }: LegendProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        right: 10,
        width: 260,
        height: "100%",
        bgcolor: "rgba(20,20,20,0.65)",
        color: "#fff",
        borderRadius: 2,
        backdropFilter: "blur(2px)",
        boxShadow: 3,
        p: 1
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ px: 1, pt: 1, pb: 0.5, opacity: 0.9 }}
      >
        Devices
      </Typography>
      <List dense disablePadding>
        {devices.map((d) => {
          const selected = activeId === d.sensorId;
          console.log("selceted: ", selected);

          return (
            <ListItemButton
              key={d.sensorId}
              onMouseEnter={() => setActiveId(d.sensorId)}
              onMouseLeave={() => setActiveId(null)}
              onClick={() => setActiveId(selected ? null : d.sensorId)}
              sx={{
                gap: 1,
                px: 1.25,
                py: 0.5,
                borderRadius: 1.5,
                ...(selected && { bgcolor: "rgba(255,255,255,0.08)" })
              }}
            >
              <ListItemIcon sx={{ minWidth: 24 }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    background: d.color,
                    boxShadow: selected
                      ? "0 0 0 2px rgba(255,255,255,0.5)"
                      : "none"
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  noWrap: true,
                  fontSize: 13,
                  title: d.site,
                  sx: { opacity: selected ? 1 : 0.9 }
                }}
                primary={d.site}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
