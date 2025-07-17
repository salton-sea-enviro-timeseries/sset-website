import { useMemo } from "react";
import Grid2 from "@mui/material/Grid2";
import WithLoading from "components/WithLoading";
import { useAppContext } from "components/AppContext";
import { colorScale } from "utils";
import DownloadDataButtonsSection from "components/Dashboard/DownloadDataButtonsSection";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { Parameter, MenuItemFields } from "types";
import { filterParameters } from "util/filterParameterFromCms";
import ContinuousColorLegend from "components/ContinuousColorLegend";

interface ParameterControlsProps {
  parameter: Parameter;
  setParameter: (value: Parameter) => void;
  activeRange: {
    min?: number;
    max?: number;
    mid: number;
  };
  isDataLoading: boolean;
  parameterList?: MenuItemFields[];
  downloadTexts: {
    nutrients?: string;
    sensor?: string;
    readMeUrl?: string;
  };
  downloadReadMERef?: string;
}

const ParameterControls = ({
  parameter,
  setParameter,
  activeRange,
  isDataLoading,
  parameterList,
  downloadTexts
}: ParameterControlsProps) => {
  // @ts-ignore
  const { language } = useAppContext();
  const locale = language === "en" ? "en-US" : "es";

  const parameterFilter = useMemo(
    () =>
      filterParameters<MenuItemFields>(parameterList, "paramKey", parameter),
    [parameterList, parameter]
  );

  const handleChangeParameter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParameter(event.target.value as Parameter);
  };

  return (
    <Grid2 container alignItems="center" size={{ xs: 12 }}>
      {/* Param and legend section */}
      <Grid2
        container
        display={"flex"}
        alignItems="center"
        size={{ xs: 12, md: 6 }}
      >
        {/* Parameter dropdown */}
        <Grid2 size={6}>
          <WithLoading
            variant="rectangular"
            height={40}
            isLoading={isDataLoading}
          >
            <TextField
              fullWidth
              id="parameter-select"
              label="Parameter"
              name="parameter"
              select
              size="small"
              variant="outlined"
              value={parameter}
              onChange={handleChangeParameter}
              SelectProps={{
                native: true
              }}
            >
              {parameterList?.map(({ name, paramKey }) => (
                <option key={paramKey["en-US"]} value={paramKey["en-US"]}>
                  {name[locale]}
                </option>
              ))}
            </TextField>
          </WithLoading>
        </Grid2>
        {/* Parameter Legend */}
        <Grid2 size={6}>
          <WithLoading
            variant="rectangular"
            height={40}
            isLoading={isDataLoading}
          >
            <Box pl={0.5}>
              <Typography variant="caption">
                {parameterFilter && parameterFilter[0].unit["en-US"]}
              </Typography>
              {activeRange.min !== undefined &&
                activeRange.mid !== undefined &&
                activeRange.max !== undefined && (
                  <ContinuousColorLegend
                    height={15}
                    startColor={colorScale[0]}
                    startTitle={activeRange.min}
                    midColor={colorScale[Math.floor(colorScale.length / 2)]}
                    midTitle={activeRange.mid}
                    endColor={colorScale[colorScale.length - 1]}
                    endTitle={activeRange.max}
                  />
                )}
            </Box>
          </WithLoading>
        </Grid2>
      </Grid2>
      {/* Param and legend section end */}
      {/* Download section */}
      <Grid2
        container
        display={"flex"}
        alignItems="center"
        justifyContent={{ md: "flex-end", sm: "flex-start" }}
        size={{ xs: 12, md: 6 }}
      >
        <DownloadDataButtonsSection
          isLoading={isDataLoading}
          nutrientButtonText={downloadTexts.nutrients}
          sensorButtonText={downloadTexts.sensor}
          readMeSrc={downloadTexts.readMeUrl}
        />
      </Grid2>
      {/* Download section end */}
    </Grid2>
  );
};

export default ParameterControls;
