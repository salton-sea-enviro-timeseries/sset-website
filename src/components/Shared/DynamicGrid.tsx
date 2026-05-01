import { Grid } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import type { SystemStyleObject, Breakpoint } from "@mui/system";

interface DynamicGridProps {
  items: React.ReactNode[];
  columnSpacing?: number;
  rowSpacing?: number;
  sx?: SxProps<Theme>;
  sizes?: Partial<Record<Breakpoint, number>>;
  paddingBottom?: number;
  centerRows?: boolean;
  // optional prop takes index of grid item and returns set of sx styles
  itemSxGenerator?: (index: number) => SxProps<Theme>;
}

// normalizes any sx into array of objects to be spread into sx prop
function toSxArray(sx: SxProps<Theme> | undefined): SystemStyleObject<Theme>[] {
  if (!sx) return [];
  if (Array.isArray(sx)) return sx as SystemStyleObject<Theme>[];
  return [sx as SystemStyleObject<Theme>];
}

const DynamicGrid = ({
  items,
  paddingBottom = 0,
  centerRows = false,
  columnSpacing = 6.5,
  sizes,
  rowSpacing = 0,
  sx,
  itemSxGenerator
}: DynamicGridProps) => {
  return (
    <Grid
      container
      columnSpacing={{ sm: columnSpacing, xs: 0 }}
      rowSpacing={rowSpacing}
      justifyContent={centerRows ? "center" : undefined}
    >
      {items.map((item, index) => (
        <Grid
          key={(item as React.ReactElement).key ?? undefined}
          size={sizes}
          paddingBottom={paddingBottom}
          sx={[
            // sx props passed to grid
            ...toSxArray(sx),
            //sx props passed to each item for customizability
            ...(itemSxGenerator ? toSxArray(itemSxGenerator(index)) : [])
          ]}
        >
          {item}
        </Grid>
      ))}
    </Grid>
  );
};

export default DynamicGrid;
